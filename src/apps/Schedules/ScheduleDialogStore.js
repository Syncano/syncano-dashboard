import Reflux from 'reflux';
import _ from 'lodash';

// Utils & Mixins
import { StoreFormMixin, DialogStoreMixin } from '../../mixins';

// Stores & Actions
import SchedulesActions from './SchedulesActions';
import ScriptsActions from '../Scripts/ScriptsActions';
import ScriptsStore from '../Scripts/ScriptsStore';
import SampleScripts from '../Scripts/SampleScripts';

export default Reflux.createStore({
  listenables: SchedulesActions,
  mixins: [
    StoreFormMixin,
    DialogStoreMixin
  ],

  crontabItems: [
    {
      payload: '*/5 * * * *',
      text: 'Run every 5 minutes'
    },
    {
      payload: '0 * * * *',
      text: 'Run once an hour'
    },
    {
      payload: '0 0 * * *',
      text: 'Run once a day at midnight'
    },
    {
      payload: '0 0 * * 0',
      text: 'Run once a week at midnight'
    },
    {
      payload: '0 0 1 * *',
      text: 'Run once a month at midnight'
    },
    {
      payload: '0 0 1 1 *',
      text: 'Run once a year at midnight'
    }
  ],

  sendScheduleAnalytics(type, payload) {
    window.analytics.track('Used Dashboard Sockets API', {
      type,
      instance: payload.instanceName,
      socketId: payload.id,
      socket: 'schedule',
      script: payload.script
    });
  },

  getInitialState() {
    return {
      stepIndex: 0,
      isFinished: false,
      label: null,
      crontab: null,
      script: null,
      scriptData: {},
      scripts: [
        {
          payload: '',
          text: 'Loading...'
        }
      ]
    };
  },

  init() {
    this.listenToForms();
    this.listenTo(ScriptsActions.setScripts, this.getScriptsDropdown);
  },

  changeStep(step) {
    this.trigger({ stepIndex: step, isFinished: step >= 2 });
  },

  getScriptsDropdown() {
    console.debug('ScheduleDialogStore::getScriptsDropdown');
    const items = ScriptsStore.getScriptsDropdown();
    const sampleScripts = _.map(SampleScripts, (value, key) => ({
      text: key,
      description: value.description,
      runtime_name: value.runtime_name
    }));

    let scripts = { items, sampleScripts };

    if (scripts.length === 0) {
      scripts = [{ payload: '', text: 'No Scripts, add one first' }];
    }

    this.trigger({ scripts });
  },

  getCrontabDropdown() {
    return this.crontabItems;
  },

  onCreateSchedule() {
    this.trigger({ isLoading: true });
  },

  onCreateScheduleCompleted(payload) {
    console.debug('ScheduleDialogStore::onCreateScheduleCompleted');
    this.trigger({ createdSchedule: payload, isLoading: false });
    SchedulesActions.fetchSchedules();
    SchedulesActions.changeStep(2);
    this.sendScheduleAnalytics('add', payload);
  },

  onCreateScheduleFailure() {
    console.debug('ScheduleDialogStore::onCreateScheduleFailure');
    this.trigger({ isLoading: false });
  },

  onUpdateSchedule() {
    this.trigger({ isLoading: true });
  },

  onUpdateScheduleCompleted(payload) {
    console.debug('ScheduleDialogStore::onUpdateScheduleCompleted');
    this.trigger({ createdSchedule: payload, isLoading: false });
    SchedulesActions.fetchSchedules();
    SchedulesActions.changeStep(2);
    this.sendScheduleAnalytics('edit', payload);
  },

  onUpdateScheduleFailure() {
    console.debug('ScheduleDialogStore::onUpdateScheduleFailure');
  },

  onCreateScheduleWithScript() {
    this.trigger({ isLoading: true });
  },

  onCreateScheduleWithScriptCompleted(createdSchedule) {
    console.debug('ScheduleDialogStore::onCreateScheduleWithScriptCompleted');
    this.trigger({ createdSchedule, isLoading: false });
    SchedulesActions.fetchSchedules();
    ScriptsActions.fetchScripts();
    SchedulesActions.changeStep(2);
    this.sendScheduleAnalytics('add', createdSchedule);
  },

  onCreateScheduleWithScriptFailure() {
    console.debug('ScheduleDialogStore::onCreateScheduleWithScriptFailure');
    this.trigger({ isLoading: false });
  },

  onUpdateScheduleWithScript() {
    this.trigger({ isLoading: true });
  },

  onUpdateScheduleWithScriptCompleted(createdSchedule) {
    console.debug('ScheduleDialogStore::onUpdateScheduleWithScriptCompleted');
    this.trigger({ createdSchedule, isLoading: false });
    SchedulesActions.changeStep(2);
    SchedulesActions.fetchSchedules();
    ScriptsActions.fetchScripts();
    this.sendScheduleAnalytics('edit', createdSchedule);
  },

  onUpdateScheduleWithScriptFailure() {
    console.debug('ScheduleDialogStore::onUpdateScheduleWithScriptFailure');
    this.trigger({ isLoading: false });
  }

});
