import React from 'react';
// import _ from 'lodash';

import { DialogMixin, MousetrapMixin } from '../../mixins/';

import { Dialog } from 'material-ui';
import { CloseButton } from '../';
import DialogSidebar from './DialogSidebar';

const FullPageDialog = React.createClass({
  mixins: [
    DialogMixin,
    MousetrapMixin
  ],

  getStyles() {
    const { sidebar } = this.props;

    return {
      cornerButtons: {
        position: 'absolute',
        top: 0,
        right: 5,
        width: 32,
        height: 32
      },
      closeButtonIcon: {
        fontSize: 24
      },
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        zIndex: -1
      },
      content: {
        transform: 'none',
        width: '100%',
        maxWidth: 1200,
        overflow: 'hidden'
      },
      title: {
        paddingTop: 0
      },
      body: {
        padding: 0
      },
      actionsContainer: {
        padding: '0 24px',
        margin: 0
      },
      actionsContainerWhenSidebar: {
        paddingLeft: 238 * React.Children.count(sidebar) + 24
      },
      loading: {
        position: 'fixed'
      }
    };
  },

  renderCornerButtons() {
    const styles = this.getStyles();
    const { onRequestClose } = this.props;

    return (
      <div
        className="row align-middle"
        style={styles.cornerButtons}
      >
        <CloseButton
          iconStyle={styles.closeButtonIcon}
          onTouchTap={onRequestClose}
          data-e2e={this.props['data-e2e-close-button']}
        />
      </div>
    );
  },

  renderDialogSidebar() {
    const { sidebar } = this.props;

    if (sidebar) {
      return <DialogSidebar>{sidebar}</DialogSidebar>;
    }

    return null;
  },

  render() {
    const styles = this.getStyles();
    const {
      titleStyle,
      contentStyle,
      children,
      // open,
      onRequestClose,
      sidebar,
      actionsContainerStyle,
      bodyStyle,
      style,
      ...other
    } = this.props;
    const actionsStyles = {
      ...styles.actionsContainer,
      ...(sidebar && styles.actionsContainerWhenSidebar),
      ...actionsContainerStyle
    };

    return (
      <Dialog
        {...other}
        data-e2e="blur-page-dialog"
        open={true}
        style={style}
        overlayStyle={styles.overlay}
        contentClassName="blur-page-dialog__content"
        contentStyle={{ ...styles.content, ...contentStyle }}
        modal={true}
        autoDetectWindowHeight={false}
        autoScrollBodyContent={true}
        titleStyle={{ ...styles.title, ...titleStyle }}
        bodyStyle={{ ...styles.body, ...bodyStyle }}
        actionsContainerStyle={actionsStyles}
        onRequestClose={onRequestClose}
      >
        {this.renderCornerButtons()}
        {children}
      </Dialog>
    );
  }
});

export default FullPageDialog;
