import Reflux from 'reflux';
import _ from 'lodash';

// Utils & Mixins
import { DialogStoreMixin, StoreFormMixin } from '../../mixins';

// Stores & Actions
import TriggersActions from './TriggersActions';
import ScriptsActions from '../Scripts/ScriptsActions';
import ClassesActions from '../Classes/ClassesActions';
import ScriptsStore from '../Scripts/ScriptsStore';
import ClassesStore from '../Classes/ClassesStore';
import SampleScripts from '../Scripts/SampleScripts';

export default Reflux.createStore({
  listenables: TriggersActions,

  mixins: [
    DialogStoreMixin,
    StoreFormMixin
  ],

  signalMenuItems: [
    {
      payload: 'post_create',
      text: 'create',
      desc: 'Run Script when a Data Object is created'
    },
    {
      payload: 'post_update',
      text: 'update',
      desc: 'Run Script when a Data Object is updated'
    },
    {
      payload: 'post_delete',
      text: 'delete',
      desc: 'Run Script when a Data Object is removed'
    }
  ],

  sendTriggerAnalytics(type, payload) {
    window.analytics.track('Used Dashboard Sockets API', {
      type,
      instance: payload.instanceName,
      socketId: payload.id,
      socket: 'trigger',
      script: payload.script
    });
  },

  getInitialState() {
    return {
      createdTrigger: null,
      stepIndex: 0,
      label: null,
      signal: '',
      class: '',
      scriptData: {},
      isLoading: false,
      classes: [
        { payload: '', text: 'Loading...' }
      ],
      scripts: [
        { payload: '', text: 'Loading...' }
      ]
    };
  },

  init() {
    this.listenToForms();
    this.joinTrailing(
      ScriptsActions.setScripts,
      ClassesActions.setClasses,
      this.getDropdowns
    );
  },

  changeStep(step) {
    this.trigger({ stepIndex: step, isFinished: step >= 2 });
  },

  getSignalsDropdown() {
    return this.signalMenuItems;
  },

  getDropdowns() {
    console.debug('TriggerDialogStore::getDropdowns');
    const sampleScripts = _.map(SampleScripts, (value, key) => ({
      text: key,
      description: value.description,
      runtime_name: value.runtime_name
    }));
    const userScripts = ScriptsStore.getScriptsDropdown();
    const dropdowns = {
      scripts: { userScripts, sampleScripts },
      classes: ClassesStore.getClassesDropdown()
    };

    if (dropdowns.scripts.userScripts.length === 0) {
      dropdowns.scripts = [{ payload: '', text: 'No Scripts, add one first' }];
    }

    if (dropdowns.classes.length === 0) {
      dropdowns.classes = [{ payload: '', text: 'No classes, add one first' }];
    }

    this.trigger(dropdowns);
  },

  onCreateTrigger() {
    this.trigger({ isLoading: true });
  },

  onCreateTriggerCompleted(createdTrigger) {
    console.debug('TriggerDialogStore::onCreateTriggerCompleted');
    this.trigger({ createdTrigger, isLoading: false });
    TriggersActions.fetchTriggers();
    TriggersActions.changeStep(2);
    this.sendTriggerAnalytics('add', createdTrigger);
  },

  onCreateTriggerFailure() {
    this.trigger({ isLoading: false });
  },

  onUpdateTriggerCompleted(createdTrigger) {
    console.debug('TriggerDialogStore::onUpdateTriggerCompleted');
    this.trigger({ createdTrigger, isLoading: false });
    TriggersActions.fetchTriggers();
    TriggersActions.changeStep(2);
    this.sendTriggerAnalytics('edit', createdTrigger);
  },

  onUpdateTrigger() {
    this.trigger({ isLoading: true });
  },

  onUpdateTriggerFailure() {
    this.trigger({ isLoading: false });
  },

  onCreateTriggerWithScript() {
    this.trigger({ isLoading: true });
  },

  onCreateTriggerWithScriptCompleted(createdTrigger) {
    console.debug('TriggerDialogStore::onCreateTriggerWithScriptCompleted');
    this.trigger({ createdTrigger, isLoading: false });
    TriggersActions.fetchTriggers();
    ScriptsActions.fetchScripts();
    TriggersActions.changeStep(2);
    this.sendTriggerAnalytics('add', createdTrigger);
  },

  onCreateTriggerWithScriptFailure() {
    console.debug('TriggerDialogStore::onCreateTriggerWithScriptFailure');
    this.trigger({ isLoading: false });
  },

  onUpdateTriggerWithScript() {
    this.trigger({ isLoading: true });
  },

  onUpdateTriggerWithScriptCompleted(createdTrigger) {
    console.debug('TriggerDialogStore::onUpdateTriggerWithScriptCompleted');
    this.trigger({ createdTrigger, isLoading: false });
    TriggersActions.changeStep(2);
    TriggersActions.fetchTriggers();
    ScriptsActions.fetchScripts();
    this.sendTriggerAnalytics('edit', createdTrigger);
  },

  onUpdateTriggerWithScriptFailure() {
    console.debug('TriggerDialogStore::onUpdateTriggerWithScriptFailure');
    this.trigger({ isLoading: false });
  }

});
