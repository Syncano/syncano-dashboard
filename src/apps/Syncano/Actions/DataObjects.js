import Constants from '../../../constants/Constants';
import _ from 'lodash';
import PromiseSeries from 'promise-series';

export default {
  list(pageNumber = 1, sortingField) {
    const series = new PromiseSeries();
    const allItems = { users: [], dataObjects: [] };

    series.add(() => (
      this.NewLibConnection
        .DataObject
        .please()
        .list()
        .orderBy(sortingField)
        .pageSize(Constants.DATA_OBJECTS_PAGE_SIZE)
        .then((items) => {
          allItems.dataObjects = [...allItems, ...items];

          return items;
        })
    ));

    _.times((pageNumber - 1), () => {
      series.add((nextParams) => (
        nextParams.next().then((items) => {
          allItems.dataObjects = [...allItems, ...items];

          return items;
        })
      ));
    });

    series.add((rawData) => (allItems.rawData = rawData));
    series.run()
      .then(() => this.NewLibConnection.User.please().list().ordering('desc'))
      .then((users) => {
        allItems.users = users;
        return this.completed(allItems);
      })
      .catch(this.failure);
  },

  get(payload) {
    this.NewLibConnection
      .DataObject
      .please()
      .get(payload)
      .then(this.completed)
      .catch(this.failure);
  },

  getCount() {
    this.NewLibConnection
      .DataObject
      .please()
      .list()
      .count()
      .then(this.completed)
      .catch(this.failure);
  },

  create(payload) {
    this.NewLibConnection
      .DataObject
      .please()
      .create(payload)
      .then((createdObject) => {
        const promises = _.map(payload.fileFields, (file) =>
          this.NewLibConnection
            .DataObject
            .please()
            .update({
              className: payload.className,
              id: createdObject.id
            }, { [file.name]: this.NewLibConnection.file(file.file) }));

        this.Promise.all(promises)
          .then(this.completed)
          .catch(this.failure);
      })
      .catch(this.failure);
  },

  update(payload) {
    this.NewLibConnection
      .DataObject
      .please()
      .update({ className: payload.className, id: payload.id }, payload)
      .then((updatedObject) => {
        const promises = _.map(payload.fileFields, (file) =>
          this.NewLibConnection
            .DataObject
            .please()
            .update({
              className: payload.className,
              id: updatedObject.id
            }, { [file.name]: this.NewLibConnection.file(file.file) }));

        this.Promise.all(promises)
          .then(this.completed)
          .catch(this.failure);
      })
      .catch(this.failure);
  },

  remove(className, ids) {
    const promises = _.map(ids, (id) =>
      this.NewLibConnection
        .DataObject
        .please()
        .delete({ className, id }));

    this.Promise.all(promises)
      .then(this.completed)
      .catch(this.failure);
  },

  getClass(name) {
    this.NewLibConnection.defaults.className = name;
    this.NewLibConnection
      .Class
      .please()
      .get({ name })
      .then(this.completed)
      .catch(this.failure);
  }
};
