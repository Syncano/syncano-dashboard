import React from 'react';
import Reflux from 'reflux';
import Helmet from 'react-helmet';

// Actions & Stores
import Actions from './InstancesActions';
import Store from './InstancesStore';
import SessionStore from '../Session/SessionStore';
import SessionActions from '../Session/SessionActions';

// Utils
import { DialogsMixin } from '../../mixins';

// Components
import { IconButton, RaisedButton, TextField } from 'material-ui';
import { Container, Loading, InnerToolbar, Dialog } from '../../common/';

export default React.createClass({
  displayName: 'InstanceEdit',

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  mixins: [
    Reflux.connect(SessionStore),
    Reflux.connect(Store),
    DialogsMixin
  ],

  validatorConstraints: {
    description: {
      length: {
        minimum: 256
      }
    }
  },

  componentWillMount() {
    const { instanceName } = this.props.params;

    if (instanceName) {
      SessionActions.fetchInstance(instanceName);
      Actions.fetch();
    }
  },

  getStyles() {
    return {
      title: {
        fontSize: '20px',
        fontWeight: 500,
        color: 'rgba(0,0,0,.54)',
        font: '"Avenir", sans-serif',
        marginBottom: '20px'
      },
      tooltip: {
        top: 0,
        left: 50
      },
      customizeSection: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 48
      },
      textField: {
        marginBottom: 16
      },
      instanceIconButton: {
        minWidth: 48,
        height: 48,
        fontSize: 18,
        lineHeight: '20px',
        display: 'inline-flex',
        borderRadius: '50%',
        color: '#FFF',
        marginBottom: 16
      },
      instanceIcon: {
        color: '#FFF'
      },
      buttonsSection: {
        display: 'flex',
        justifyContent: 'space-between'
      },
      deleteButton: {
        backgroundColor: this.context.muiTheme.rawTheme.palette.accent2Color,
        color: '#FFF',
        ':hover': {
          opacity: 0.4
        }
      }
    };
  },

  handleUpdate() {
    const instance = this.state.instance;
    const params = {
      description: this.refs.description.getValue(),
      metadata: {
        icon: instance.metadata.icon,
        color: instance.metadata.color
      }
    };

    Actions.updateInstance(instance.name, params);
  },

  handleDelete() {
    const instance = this.state.instance;
    const remove = {
      user: Actions.removeInstances.bind(this, [instance]),
      shared: Actions.removeSharedInstance.bind(this, [instance], SessionStore.getUser().id)
    };
    const ownage = Store.amIOwner(instance) ? 'user' : 'shared';

    remove[ownage]();
  },

  initDialogs() {
    const instance = this.state.instance;
    const deleteText = Store.amIOwner(instance) ? ['Delete', 'Deleting'] : ['Leave', 'Leaving'];

    return [
      {
        dialog: Dialog.Delete,
        params: {
          key: 'deleteInstanceDialog',
          ref: 'deleteInstanceDialog',
          title: `${deleteText[0]} an Instance`,
          handleConfirm: this.handleDelete,
          isLoading: this.props.isLoading,
          items: Store.getCheckedItems(),
          groupName: 'Channel',
          children: (
            <div>
              {`${deleteText[1]} this Instance can cause problems with your applications that are connected to it.
              Do you really want to ${deleteText[0].toLowerCase()} this Instance?`}
              {this.getDialogList([instance])}
              <Loading
                type="linear"
                position="bottom"
                show={this.state.isLoading}
              />
            </div>
          )
        }
      }
    ];
  },

  render() {
    const styles = this.getStyles();
    const { instance } = this.state;
    const deleteButtonText = Store.amIOwner(instance) ? 'Delete' : 'Leave';
    const title = 'General Settings';

    if (!instance) {
      return null;
    }

    return (
      <div>
        <Helmet title={title} />
        {this.getDialogs()}

        <InnerToolbar title={title}>
          <IconButton
            style={{ fontSize: 25, marginTop: 5 }}
            iconClassName="synicon-delete"
            tooltip={`${deleteButtonText} an Instance`}
            tooltipPosition="bottom-left"
            onTouchTap={() => this.showDialog('deleteInstanceDialog')}
          />
        </InnerToolbar>

        <Container>
          <div style={{ width: '50%' }}>
            <div className="col-flex-1">
              <div>
                <div style={styles.customizeSection}>
                  <TextField
                    className="instance-name-field"
                    ref="name"
                    floatingLabelText="Instance name"
                    disabled={true}
                    fullWidth={true}
                    defaultValue={instance.name}
                    style={styles.textField}
                  />
                  <TextField
                    ref="description"
                    floatingLabelText="Instance description"
                    defaultValue={instance.description}
                    multiLine={true}
                    fullWidth={true}
                    style={styles.textField}
                  />
                </div>
                <div style={styles.buttonsSection}>
                  <RaisedButton
                    onTouchTap={this.handleUpdate}
                    type="submit"
                    label="Update"
                    secondary={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }
});
