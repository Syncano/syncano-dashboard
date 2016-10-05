import CreateActions from '../../utils/ActionsConstructor.js';

export default CreateActions(
  {
    fetch: {},
    setSchedules: {},
    changeStep: {},
    fetchSchedules: {
      asyncResult: true,
      loading: true,
      redirectOnFailure: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Schedules.list'
    },
    createSchedule: {
      asyncResult: true,
      asyncForm: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Schedules.create'
    },
    createScheduleWithScript: {
      asyncResult: true,
      asyncForm: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Schedules.createWithScript'
    },
    updateSchedule: {
      asyncResult: true,
      asyncForm: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Schedules.update'
    },
    updateScheduleWithScript: {
      asyncResult: true,
      asyncForm: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Schedules.updateWithScript'
    },
    removeSchedules: {
      loading: true,
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Schedules.remove'
    }
  },
  {
    withCheck: true,
    withDialog: true
  }
);
