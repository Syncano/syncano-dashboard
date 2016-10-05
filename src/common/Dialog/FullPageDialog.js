import React from 'react';
import _ from 'lodash';

import { DialogMixin, MousetrapMixin } from '../../mixins/';

import { Dialog } from 'material-ui';
import { CloseButton, Loading, Show } from '../';
import DialogSidebar from './DialogSidebar';

const FullPageDialog = React.createClass({
  mixins: [
    DialogMixin,
    MousetrapMixin
  ],

  getDefaultProps() {
    return {
      actions: [],
      contentSize: 'large',
      showCloseButton: true,
      bindShortcuts: true
    };
  },

  componentDidUpdate(prevProps) {
    const { open, bindShortcuts } = this.props;

    const isOpened = !prevProps.open && open;
    const isClosed = prevProps.open && !open;
    const hasBindShortcutsEnabled = !prevProps.bindShortcuts && bindShortcuts;
    const hasBindShortcutsDisabled = prevProps.bindShortcuts && !bindShortcuts;

    if ((bindShortcuts && isOpened) || hasBindShortcutsEnabled) {
      this.bindShortcuts();
    }

    if ((bindShortcuts && isClosed) || hasBindShortcutsDisabled) {
      this.unbindShortcuts();
    }
  },

  getStyles() {
    const { sidebar } = this.props;

    return {
      cornerButtons: {
        position: 'fixed',
        top: 20,
        right: 20,
        width: 64,
        height: 64
      },
      closeButtonIcon: {
        fontSize: 40
      },
      overlay: {
        background: '#fff',
        zIndex: -1
      },
      content: {
        transform: 'none',
        width: '100%',
        maxWidth: 'none'
      },
      title: {
        paddingTop: 0
      },
      body: {
        paddingTop: 35
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

  getContentConfig(size) {
    const config = {
      small: {
        maxWidth: 500
      },
      medium: {
        maxWidth: 840
      },
      large: {
        maxWidth: 998
      }
    };

    return config[size];
  },

  bindShortcuts() {
    const { onRequestClose, onConfirm, actions } = this.props;
    const handleConfirm = onConfirm || actions.props && actions.props.handleConfirm;

    this.bindShortcut('esc', () => {
      onRequestClose();

      return false;
    });

    if (handleConfirm) {
      this.bindShortcut('enter', () => {
        handleConfirm();

        return false;
      });
    }
  },

  unbindShortcuts() {
    this.unbindShortcut('esc');
    this.unbindShortcut('enter');
  },

  renderCornerButtons() {
    const styles = this.getStyles();
    const { onRequestClose, cornerButtons, showCloseButton } = this.props;

    return (
      <div
        className="row align-middle"
        style={styles.cornerButtons}
      >
        <Show if={showCloseButton}>
          <CloseButton
            iconStyle={styles.closeButtonIcon}
            onTouchTap={onRequestClose}
            data-e2e={this.props['data-e2e-close-button']}
          />
        </Show>
        {cornerButtons}
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
      style,
      titleStyle,
      contentSize,
      contentStyle,
      children,
      open,
      actions,
      isLoading,
      onRequestClose,
      sidebar,
      actionsContainerStyle,
      bodyStyle,
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
        className="full-page-dialog"
        open={_.isBoolean(open) ? open : this.state.open}
        style={style}
        overlayStyle={styles.overlay}
        contentClassName="full-page-dialog__content"
        contentStyle={{ ...styles.content, ...this.getContentConfig(contentSize), ...contentStyle }}
        actions={actions}
        modal={true}
        autoDetectWindowHeight={false}
        titleStyle={{ ...styles.title, ...titleStyle }}
        bodyStyle={{ ...styles.body, ...bodyStyle }}
        actionsContainerStyle={actionsStyles}
        onRequestClose={onRequestClose}
      >
        {this.renderCornerButtons()}

        <div className="row">
          {this.renderDialogSidebar()}

          <div className="col-flex-1">
            {children}
          </div>
        </div>

        <Loading
          show={isLoading}
          type="linear"
          position="top"
          style={styles.loading}
        />
      </Dialog>
    );
  }
});

export default FullPageDialog;
