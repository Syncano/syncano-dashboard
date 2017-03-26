import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';

import { Dialog, Loading } from '../common/';

class SetupPage extends Component {
  static contextTypes = {
    location: PropTypes.object
  }

  componentDidMount() {
    const { router } = this.props;

    router.push('/instances/');
  }

  getStyles = () => ({
    content: {
      textAlign: 'center'
    }
  });

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
