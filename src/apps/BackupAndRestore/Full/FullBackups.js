import React from 'react';
import Reflux from 'reflux';

import Actions from './FullBackupsActions';
import Store from './FullBackupsStore';

import FullBackupsList from './FullBackupsList';
import { Container } from '../../../common';

export default React.createClass({
  displayName: 'FullBackups',

  mixins: [
    Reflux.connect(Store)
  ],

  componentDidMount() {
    Actions.fetch();
  },

  render() {
    const { isLoading, items } = this.state;

    return (
      <Container>
        <FullBackupsList
          isLoading={isLoading}
          items={items}
        />
      </Container>
    );
  }
});
