import CreateActions from '../../utils/ActionsConstructor';

export default CreateActions(
  {
    setClasses: {},
    setClickedClass: {},
    setStepIndex: {},
    fetch: {},
    getClassByName: {},
    fetchClasses: {
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Classes.list'
    }
  }
);
