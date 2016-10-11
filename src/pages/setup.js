import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Syncano from 'syncano';

import SessionStore from '../apps/Session/SessionStore';
import InstanceDialogStore from '../apps/Instances/InstanceDialogStore';
import { Dialog, Loading } from '../common/';

class SetupPage extends Component {
  componentDidMount() {
    const { router } = this.props;

    if (SessionStore.getSignUpMode()) {
      this.createFirstInstance();
    } else {
      router.push('/instances/');
    }
  }

  getStyles = () => ({
    content: {
      textAlign: 'center'
    }
  });

  createFirstInstance() {
    const { router } = this.props;
    const connection = new Syncano({ baseUrl: SYNCANO_BASE_URL, accountKey: SessionStore.getToken() });
    const name = InstanceDialogStore.genUniqueName();

    connection.Instance.please().create({ name })
      .then(instance => {
        router.push(`/instances/${instance.name}/sockets/`);
      })
      .catch(() => {
        router.push('/instances/');
      });

    SessionStore.removeSignUpMode();
  }

  render() {
    const styles = this.getStyles();

    return (
      <Dialog.FullPage
        open={true}
        contentSize="small"
        showCloseButton={false}
      >
        <div
          className="vm-3-b"
          style={styles.content}
          data-e2e="setup-page-content"
        >
          {'We\'re preparing your account, please wait...'}
        </div>
        <Loading show={true} />
      </Dialog.FullPage>
    );
  }
}

export default withRouter(SetupPage);
