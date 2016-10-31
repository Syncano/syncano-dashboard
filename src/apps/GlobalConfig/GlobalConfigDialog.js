import React, { PropTypes } from 'react';
import Reflux from 'reflux';

import { DialogMixin, FormMixin } from '../../mixins';

import Actions from './GlobalConfigDialogActions';
import Store from './GlobalConfigDialogStore';

import { Dialog, Editor, Loading, Show, Notification } from '../../common';
import { DialogBindShortcutsHOC } from '../../common/Dialog';

const GlobalConfigDialog = React.createClass({
  mixins: [
    Reflux.connect(Store),
    DialogMixin,
    FormMixin
  ],

  validatorConstraints: {
    globalConfig: (value) => {
      try {
        JSON.parse(value);
      } catch (e) {
        return {
          inclusion: {
            within: [],
            message: 'is not a valid JSON'
          }
        };
      }
      return null;
    }
  },

  componentWillUpdate(nextProps, nextState) {
    if (!this.state._dialogVisible && nextState._dialogVisible) {
      Actions.fetch();
    }
  },

  handleAddSubmit() {
    const { globalConfig } = this.state;

    Actions.updateGlobalConfig(JSON.parse(globalConfig));
  },

  handleConfigChange(value) {
    this.setState({ globalConfig: value });
  },

  render() {
    const { hasBindShortcutsEnabled, enableBindShortcuts, disableBindShortcuts } = this.context;
    const { open, isLoading, isConfigLoading, globalConfig } = this.state;

    return (
      <Dialog.FullPage
        key="dialog"
        ref="dialog"
        title="Global Config"
        onRequestClose={this.handleCancel}
        open={open}
        isLoading={isLoading}
        bindShortcuts={hasBindShortcutsEnabled}
        onConfirm={this.handleFormValidation}
        actions={
          <Dialog.StandardButtons
            data-e2e-submit="global-config-submit"
            data-e2e-cancel="global-config-cancel"
            disabled={isLoading}
            handleCancel={this.handleCancel}
            handleConfirm={this.handleFormValidation}
          />
        }
        sidebar={
          <Dialog.SidebarBox key="sidebarbox">
            <Dialog.SidebarSection>
              Global Config allows you to store data. It could be tokens, api keys, passwords, etc. This data can be
              accessed in all of your Scripts.
            </Dialog.SidebarSection>
            <Dialog.SidebarSection title="Global Config">
              Global Config is a JSON object and will not overwrite your Script Config. It will be merged with it
              instead. If both Configs contain the same key, the Script Config value will be used.
            </Dialog.SidebarSection>
            <Dialog.SidebarSection last={true}>
              <Dialog.SidebarLink to="http://docs.syncano.io/docs/snippets-scripts#section-global-config-dictionary">
                Learn more
              </Dialog.SidebarLink>
            </Dialog.SidebarSection>
          </Dialog.SidebarBox>
        }
      >
        <div className="vm-2-t">
          <Loading show={isConfigLoading}>
            <Editor
              name="globalConfigEditor"
              ref="globalConfigEditor"
              mode="json"
              height="400px"
              onChange={this.handleConfigChange}
              onFocus={disableBindShortcuts}
              onBlur={enableBindShortcuts}
              value={globalConfig || [
                '{',
                '    "name": "John",',
                '    "lastName": "Doe"',
                '}'
              ].join('\n')}
              data-e2e="global-config-editor"
            />
          </Loading>
        </div>
        <Show if={this.getValidationMessages('globalConfig').length}>
          <Notification
            type="error"
            className="vm-2-t"
          >
            {this.getValidationMessages('globalConfig')}
          </Notification>
        </Show>
        {this.renderFormNotifications() && <div className="vm-2-t">
          {this.renderFormNotifications()}
        </div>}
      </Dialog.FullPage>
    );
  }
});

GlobalConfigDialog.contextTypes = {
  hasBindShortcutsEnabled: PropTypes.bool,
  enableBindShortcuts: PropTypes.func,
  disableBindShortcuts: PropTypes.func
};

export default DialogBindShortcutsHOC(GlobalConfigDialog);
