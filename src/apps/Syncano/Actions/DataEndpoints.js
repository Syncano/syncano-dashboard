import _ from 'lodash';
import PromiseSeries from 'promise-series';

export default {
  create(payload) {
    this.NewLibConnection
      .DataEndpoint
      .please()
      .create(payload)
      .then(this.completed)
      .catch(this.failure);
  },

  list() {
    this.NewLibConnection
      .DataEndpoint
      .please()
      .list()
      .ordering('desc')
      .then(this.completed)
      .catch(this.failure);
  },

  get(name) {
    this.NewLibConnection
      .DataEndpoint
      .please()
      .get({ name })
      .then(this.completed)
      .catch(this.failure);
  },

  update(name, payload) {
    this.NewLibConnection
      .DataEndpoint
      .please()
      .update({ name }, payload)
      .then(this.completed)
      .catch(this.failure);
  },

  remove(dataEndpoints) {
    const promises = _.map(dataEndpoints, (dataEndpoint) =>
      this.NewLibConnection
        .DataEndpoint
        .please()
        .delete({ name: dataEndpoint.name }));

    this.Promise.all(promises)
      .then(this.completed)
      .catch(this.failure);
  },

  fetchData(dataEndpoint, pageNumber = 1) {
    const series = new PromiseSeries();
    const { baseUrl } = this.NewLibConnection;
    const accountKey = this.NewLibConnection.getAccountKey();

    let allItems = [];

    series.add(() => (
      this.NewLibConnection
        .DataEndpoint
        .please()
        .fetchData({ name: dataEndpoint.name })
        .then((items) => {
          allItems = [...allItems, ...items];

          return items;
        })
    ));

    _.times((pageNumber - 1), () => {
      series.add((nextParams) => (
        this.Promise.get(`${baseUrl}${nextParams.next}&api_key=${accountKey}`).then((response) => {
          allItems = [...allItems, ...response.data.objects];

          return response.data;
        })
      ));
    });

    series.add((rawData) => (rawData));
    series.run()
      .then(this.completed)
      .catch(this.failure);
  },

  fetchNextDataPage(nextLink) {
    const { baseUrl } = this.NewLibConnection;
    const accountKey = this.NewLibConnection.getAccountKey();

    this.Promise.get(`${baseUrl}${nextLink}&api_key=${accountKey}`)
      .then((response) => this.completed(response.data))
      .catch(this.failure);
  }
};
