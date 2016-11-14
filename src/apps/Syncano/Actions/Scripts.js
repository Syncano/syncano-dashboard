import _ from 'lodash';
import { getBaseScript } from '../../Scripts/BaseScripts';

export default {
  get(id) {
    this.NewLibConnection
      .Script
      .please()
      .get({ id })
      .then(this.completed)
      .catch(this.failure);
  },

  update(id, params) {
    this.NewLibConnection
      .Script
      .please()
      .update({ id }, params)
      .then(this.completed)
      .catch(this.failure);
  },

  run(updateParams, runParams) {
    const { id, payload } = runParams;

    this.NewLibConnection
      .Script
      .please()
      .update({ id }, updateParams)
      .then(() => (
        this.NewLibConnection
          .Script
          .please()
          .run({ id }, { payload })
          .then(this.completed)
          .catch(this.failure)
      ))
      .catch(this.failure);
  },

  list() {
    const itemsObject = {};

    this.NewLibConnection
      .Script
      .please()
      .list()
      .ordering('desc')
      .then((scripts) => {
        itemsObject.scripts = scripts;

        return this.NewLibConnection.Trigger.please().list();
      })
      .then((triggers) => {
        itemsObject.triggers = triggers;

        return this.NewLibConnection.Schedule.please().list();
      })
      .then((schedules) => {
        itemsObject.schedules = schedules;

        this.completed(itemsObject);
      })
      .catch(this.failure);
  },

  create(payload) {
    const { runtime_name, label, description } = payload;
    const source = {
      python3: getBaseScript('base_python'),
      'python_library_v4.2': getBaseScript('base_python'),
      'python_library_v5.0': getBaseScript('base_python'),
      'nodejs_library_v0.4': '// Start coding!',
      'nodejs_library_v1.0': getBaseScript('base_nodejs'),
      ruby: '# Start coding!',
      golang: '// Start coding!',
      swift: '// Start coding!',
      php: getBaseScript('base_php')
    }[runtime_name];

    this.NewLibConnection
      .Script
      .please()
      .create({ runtime_name, label, description, source })
      .then(this.completed)
      .catch(this.failure);
  },

  remove(scripts) {
    const promises = _.map(scripts, (script) => this.NewLibConnection.Script.please().delete({ id: script.id }));

    this.Promise.all(promises)
      .then(this.completed)
      .catch(this.failure);
  },

  getTrace(scriptId, id) {
    this.NewLibConnection
      .ScriptTrace
      .please()
      .get({ scriptId, id })
      .then(this.completed)
      .catch(this.failure);
  },

  listTraces(scriptId) {
    this.NewLibConnection
      .ScriptTrace
      .please()
      .ordering('desc')
      .list({ scriptId })
      .then(this.completed)
      .catch(this.failure);
  },

  listRuntimes() {
    this.NewLibConnection
      .Script
      .please()
      .getRuntimes()
      .then(this.completed)
      .catch(this.failure);
  }
};
