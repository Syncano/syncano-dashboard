import React from 'react';
import Reflux from 'reflux';
import Helmet from 'react-helmet';

// Utils
import { DialogsMixin } from '../../mixins';

// Stores and Actions
import Actions from './ClassesActions';
import Store from './ClassesStore';

// Components
import { Container, Loading, InnerToolbar } from '../../common/';

// Local components
import ClassDialog from './ClassDialog';
import ClassesList from './ClassesList';

export default React.createClass({
  displayName: 'Classes',

  contextTypes: {
    params: React.PropTypes.object
  },

  mixins: [
    Reflux.connect(Store),
    DialogsMixin
  ],

  componentDidMount() {
    console.info('Classes::componentDidMount');
    Actions.fetch();
  },

  componentDidUpdate() {
    const { action, className } = this.context.params;
    const classObject = Store.getClassByName(className);

    if (action === 'edit' && classObject) {
      Actions.showDialog(classObject);
    }
  },

  render() {
    const { items, triggers, hideDialogs, isLoading } = this.state;
    const title = 'Data Classes';

    return (
      <div>
        <Helmet title={title} />
        <ClassDialog />

        <InnerToolbar title={title} />

        <Container>
          <Loading show={isLoading}>
            <ClassesList
              items={items}
              triggers={triggers}
              hideDialogs={hideDialogs}
            />
          </Loading>
        </Container>
      </div>
    );
  }
});
