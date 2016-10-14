import Reflux from 'reflux';
import moment from 'moment';
import d3 from 'd3';
import _ from 'lodash';

import ProfileBillingChartActions from './ProfileBillingChartActions';
import ProfileBillingPlanActions from './ProfileBillingPlanActions';

export default Reflux.createStore({
  listenables: ProfileBillingChartActions,

  format: 'YYYY-MM-DD',

  init() {
    this.joinTrailing(
      ProfileBillingChartActions.fetchBillingProfile.completed,
      ProfileBillingChartActions.fetchTotalDailyUsage.completed,
      this.prepareChartData
    );
  },

  getInitialState() {
    return {
      isLoading: true,
      charts: {
        total: this.getInitialChartState(),
        api: this.getInitialChartState(),
        cbx: this.getInitialChartState()
      },
      profile: {
        subscription: {}
      },
      overage: {
        api: 0,
        cbx: 0,
        amount: 0
      },
      covered: {
        api: 0,
        cbx: 0,
        amount: 0
      }
    };
  },

  getInitialChartState() {
    const today = this.getToday();
    const allDates = this.getAllDates();
    const xColumn = ['x'].concat(allDates);

    return {
      data: {
        x: 'x',
        columns: [xColumn],
        types: {},
        groups: [[]],
        colors: {
          api: '#77D8F6',
          cbx: '#FFD78E',
          total: '#66bb6a'
        }
      },
      point: {
        show: false
      },
      axis: {
        x: {
          label: 'Day of the month',
          type: 'timeseries',
          tick: {
            fit: true,
            format: '%b %d'
          }
        },
        y: {
          label: 'Cost ($)',
          type: 'indexed',
          tick: {
            format: (x) => (
              x / 2 ? x : null
            ),
            fit: true
          },
          show: true
        }
      },
      grid: {
        x: {
          lines: [
            { value: today, text: 'Today', position: 'start' }
          ]
        },
        y: { lines: [] }
      },
      tooltip: {
        format: {
          title: (input) => {
            let title = moment(input).format('MMM DD');
            const date = moment(input).format(this.format);

            if (date > today) {
              title = `Prediction for ${title}`;
            }
            return title;
          },
          name: (name) => ({ api: 'API calls', cbx: 'Script seconds', total: 'Total' }[name]),
          value: (value) => d3.format('$')(_.round(value, 5))
        }
      },
      regions: [{
        start: today,
        end: _.last(allDates),
        class: 'predictions'
      }],
      legend: { show: false }
    };
  },

  prepareChartData(joinProfiles, joinUsages) {
    const profile = _.head(joinProfiles);
    const usage = _.head(joinUsages);
    const state = this.getInitialState();

    state.isLoading = false;
    state.profile = profile;

    const subscription = profile.subscription || {};
    const plan = subscription.plan || null;
    let pricing = subscription.pricing;
    const usageAmount = { api: 0, cbx: 0 };
    const columns = { api: {}, cbx: {}, total: {} };

    if (_.isEmpty(pricing)) {
      // $5.25
      pricing = {
        api: { overage: 0.0000200, included: 200000 },
        cbx: { overage: 0.0002500, included: 5000 }
      };
    }

    // Map array to nested object e.g {source: {date: value}} -> {'api': {'2015-01-01': 0.0000200}}
    _.forEach(usage, (_usage) => {
      if (typeof columns[_usage.source] === 'undefined') {
        return;
      }

      const amount = pricing[_usage.source].overage * _usage.value;

      columns[_usage.source][_usage.date] = amount;
      columns.total[_usage.date] = (columns.total[_usage.date] || 0) + amount;
      usageAmount[_usage.source] += amount;
    });

    this.fillBlanks(columns);
    this.objectToArray(columns);

    state.covered = _.reduce(pricing, (result, value, key) => {
      const amount = value.included * value.overage;

      result.amount += amount;
      result.total.amount += amount;
      result[key] = _.extend({}, value, { amount });
      return result;
    }, { amount: 0, total: { amount: 0 } });

    state.covered.amount = _.round(state.covered.amount, 0);

    state.overage = _.reduce(pricing, (result, value, key) => {
      const covered = state.covered[key];
      const amount = (usageAmount[key] > covered.amount) ? usageAmount[key] - covered.amount : 0;
      const included = _.round(amount / value.overage);

      result.amount += amount;
      result.total.amount += amount;
      result[key] = result[key] = _.extend({}, value, { amount, included });
      return result;
    }, { amount: 0, total: { amount: 0 } });

    _.forEach(columns, (values, name) => {
      state.charts[name].title = { api: 'API calls', cbx: 'Script seconds', total: 'API calls + Script seconds' }[name];
      state.charts[name].data.columns.push([name].concat(values));
      state.charts[name].data.groups[0].push(name);
      state.charts[name].data.types[name] = 'area';
      state.charts[name].axis.y.max = (state.covered[name].amount + state.overage[name].amount) * 1.1;
      state.charts[name].grid.y.lines.push({
        value: state.covered[name].amount,
        text: 'Current plan',
        position: 'middle'
      });
    });

    state.chartLegend = {
      rows: [
        {
          percent: _.round((usageAmount.api / pricing.api.overage) / pricing.api.included * 100, 0),
          amount: _.round(usageAmount.api / pricing.api.overage, 0),
          label: 'API calls',
          styles: { background: '#77D8F6' }
        },
        {
          percent: _.round((usageAmount.cbx / pricing.cbx.overage) / pricing.cbx.included * 100, 0),
          amount: _.round(usageAmount.cbx / pricing.cbx.overage, 0),
          label: 'Script seconds',
          styles: { background: '#FFBC5A' }
        }
      ],
      showPercents: plan === 'paid-commitment'
    };

    ProfileBillingPlanActions.setOverage(state.overage);
    ProfileBillingPlanActions.setChartLegend(state.chartLegend);

    this.trigger(state);
  },

  fillBlanks(columns) {
    // We need to calculate median for predictions
    const today = this.getToday();
    const medians = _.reduce(columns, (result, value, key) => {
      result[key] = d3.median(_.values(value)) || 0;
      return result;
    }, {});

    _.forEach(this.getAllDates(), (date) => {
      _.forEach(columns, (val, source) => {
        if (typeof columns[source][date] === 'undefined') {
          columns[source][date] = 0;
        }

        if (date > today) {
          columns[source][date] += medians[source];
        }
      });
    });
  },

  objectToArray(elements) {
    _.forEach(elements, (val, elementKey) => {
      const keys = _.keys(val).sort();

      elements[elementKey] = _.reduce(keys, (result, key, index) => {
        const prev = (index > 0) ? result[index - 1] : 0;

        result.push(val[key] + prev);
        return result;
      }, []);
    });
  },

  sumAncestors(elements) {
    _.forEach(elements, (val, key) => {
      elements[key] = _.reduce(val, (result, value, index) => {
        value.value += (index > 0) ? result[index - 1].value : 0;
        result.push(value);
        return result;
      }, []);
    });
  },

  getDate() {
    const today = new Date();

    today.year = today.getFullYear();
    today.month = today.getMonth();
    return today;
  },

  getToday() {
    return moment(this.getDate()).format(this.format);
  },

  getAllDates() {
    const { year, month } = this.getDate();
    const days = _.range(1, this.getNumberOfDays() + 1);

    return _.map(days, (day) => moment(new Date(year, month, day)).format(this.format));
  },

  getNumberOfDays() {
    const { year, month } = this.getDate();

    return new Date(year, month + 1, 0).getDate();
  },

  onFetchTotalDailyUsage() {
    this.trigger({ isLoading: true });
  }
});
