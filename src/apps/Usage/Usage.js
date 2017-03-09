import React from 'react';
import Reflux from 'reflux';
import Helmet from 'react-helmet';
import _ from 'lodash';

import Store from '../Profile/ProfileBillingPlanStore';
import ChartStore from '../Profile/ProfileBillingChartStore';
import ChartActions from '../Profile/ProfileBillingChartActions';
import InstancesActions from '../../apps/Instances/InstancesActions';
import InstancesStore from '../../apps/Instances/InstancesStore';

import { SelectField, MenuItem } from 'material-ui';
import { Container, InnerToolbar, Billing, Loading } from '../../common/';
import UsageChart from './UsageChart';

export default React.createClass({
  displayName: 'ProfileBillingPlan',

  mixins: [
    Reflux.connect(Store),
    Reflux.connect(ChartStore, 'chart'),
    Reflux.connect(InstancesStore, 'instances')
  ],

  getInitialState() {
    return { selectedInstance: 'all' };
  },

  componentDidMount() {
    console.debug('Instance::componentWillMount');

    ChartActions.fetchBillingProfile();
    ChartActions.fetchTotalDailyUsage();
    InstancesActions.fetchInstances();
  },

  handleOnChangeDropdown(event, index, value) {
    this.setState({
      selectedInstance: value
    }, () => {
      ChartActions.fetchBillingProfile();
      ChartActions.fetchTotalDailyUsage(this.state.selectedInstance);
    });
  },

  renderInstancesDropdown() {
    const { myInstances } = this.state.instances;
    const emptyItem = (<MenuItem value="all" primaryText="All" />);
    const instances = _.map(myInstances, (item) => (
      <MenuItem
        value={item.name}
        primaryText={item.name}
        style={{ cursor: 'pointer' }}
      />
    ));

    instances.unshift(emptyItem);

    return instances;
  },

  render() {
    const headingStyle = { fontSize: '1.3em' };
    const { selectedInstance, chart } = this.state;

    return (
      <div>
        <Helmet title="Usage" />
        <InnerToolbar title="Usage" />
        <Container>

          <SelectField
            style={{ width: 240, marginBottom: 20 }}
            floatingLabelText="Usage for Instance"
            value={selectedInstance}
            onChange={this.handleOnChangeDropdown}
          >
            {this.renderInstancesDropdown()}
          </SelectField>
          <Loading show={chart.isLoading}>
            <div className="row vp-2-b">
              <div
                className="col-flex-1 vp-1-b"
                style={headingStyle}
              >
                Usage with your <strong>current plan</strong>:
              </div>
            </div>

            <div className="row vp-3-b">
              <div className="col-flex-1">
                <Billing.ChartLegend {...chart.chartLegend} />
              </div>
              <div className="col-flex-1" />
            </div>
            <UsageChart charts={chart.charts} />
          </Loading>
        </Container>
      </div>
    );
  }
});
