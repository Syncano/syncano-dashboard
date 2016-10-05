import React from 'react';
import { withRouter } from 'react-router';
import Reflux from 'reflux';
import Radium from 'radium';

// Utils
import { FormMixin } from '../../mixins';

// Stores and Actions
import Store from './AddVersionViewStore';
import Actions from './AddVersionViewActions';

// Components
import { Checkbox, FlatButton, RaisedButton } from 'material-ui';
import { Container, Loading, SelectFieldWrapper, InnerToolbar } from '../../common/';

const AddVersionView = Radium(React.createClass({
  displayName: 'AddVersionView',

  mixins: [
    FormMixin,
    Reflux.connect(Store)
  ],

  validatorConstraints: {
    instance: {
      presence: true
    }
  },

  componentWillMount() {
    Actions.fetchInstances();
    Actions.fetch();
  },

  getStyles() {
    return {
      sectionStyle: {
        paddingTop: 10,
        paddingBottom: 20,
        margin: 1,
        background: '#F4F4F4'
      },
      sectionTitleStyle: {
        fontSize: '1.2rem',
        marginTop: 15,
        marginBottom: 10
      },
      info: {
        color: '#B8B8B8',
        width: 300,
        height: 27,
        lineHeight: '27px',
        fontSize: '1rem',
        verticalAlign: 'middle',
        textAlign: 'center'
      },
      instanceDropdowInputLabel: {
        overflow: 'hidden',
        maxHeight: '100%',
        paddingRight: 30,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      },
      instancesDropdownItem: {
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    };
  },

  handleBackClick() {
    const { router, params } = this.props;

    router.push(`/solutions/${params.solutionId}/edit/`);
  },

  handleEditSubmit() {
    Actions.updateSolution({
      description: this.state.description
    });
  },

  handleInstanceChange(event, index, instanceName) {
    Actions.setInstance(instanceName);
    Actions.clearExportSpec();
  },

  handleTypeChange(event, index, type) {
    Actions.setType(type);
  },

  handleSubmit(type) {
    this.setState({ type });
    this.handleFormValidation();
  },

  handleSuccessfullValidation() {
    const { solutionId } = this.props.params;

    Actions.createVersion(solutionId, this.prepareVersionData());
  },

  handleOnCheck(name, type, status) {
    const exportSpec = this.state.exportSpec;

    exportSpec[type][name] = status;
    this.setState({ exportSpec });
  },

  headerMenuItems() {
    return [
      {
        label: 'Instances',
        route: 'instances'
      },
      {
        label: 'Solutions',
        route: 'solutions'
      }
    ];
  },

  pkMap(section) {
    const map = {
      dataEndpoints: 'name',
      classes: 'name',
      scriptEndpoints: 'name',
      channels: 'name',
      scripts: 'id',
      triggers: 'id',
      schedules: 'id'
    };

    return map[section];
  },

  prepareExportSpec() {
    const spec = this.state.exportSpec;
    const formatedSpec = {};

    Object.keys(spec).map((section) => {
      const pkName = this.pkMap(section);

      formatedSpec[section] = [];
      Object.keys(spec[section]).map((item) => {
        if (spec[section][item] === true) {
          const obj = {};

          obj[pkName] = (pkName === 'id') ? parseInt(item, 10) : item;
          formatedSpec[section].push(obj);
        }
      });
    });

    return formatedSpec;
  },

  prepareVersionData() {
    return {
      type: this.state.type,
      data: JSON.stringify(this.prepareExportSpec()),
      instance: this.state.instance
    };
  },

  renderCheckboxes(label, data, pk, labelPk, type) {
    const styles = this.getStyles();

    if (data.length === 0) {
      return null;
    }

    const checkboxes = data.map((item) => (
      <div
        key={`checkbox-${type}-${item[pk]}`}
        className="col-xs-35 col-md-17"
        style={{ paddingRight: 10 }}
      >
        <Checkbox
          ref={`checkbox-${type}-${item[pk]}`}
          iconStyle={{ fill: '#4D4D4D' }}
          labelStyle={{ color: '#4D4D4D' }}
          name={item[pk]}
          checked={this.state.exportSpec[type][item[pk]]}
          label={item[labelPk].substring(0, 25)}
          onCheck={(event, status) => this.handleOnCheck(item[pk], type, status)}
        />
      </div>
    ));

    return (
      <div className="col-xs-35">
        <div style={styles.sectionTitleStyle}>{label}</div>
        <div style={styles.sectionStyle}>
          <div className="row">
            {checkboxes}
          </div>
        </div>
      </div>
    );
  },

  renderInfo() {
    const styles = this.getStyles();

    if (this.state.dataReady === true) {
      return true;
    } else if (this.state.dataReady === 'loading') {
      return (
        <Loading key="loading" style={{ marginTop: 30 }} show={true} />
      );
    }
    return (
      <div key="info" style={{ padding: 100, margin: '0 auto' }}>
        <div style={styles.info}>
          Choose the Instance which you want to use to export new solution version.
        </div>
      </div>
    );
  },

  render() {
    const { solutionId } = this.props.params;
    const styles = this.getStyles();
    const {
      classes,
      dataEndpoints,
      scripts,
      scriptEndpoints,
      triggers,
      schedules,
      channels
    } = this.state.instanceData;

    return (
      <form
        onSubmit={this.handleFormValidation}
        acceptCharset="UTF-8"
        method="post"
      >

        <InnerToolbar
          title={`Solution: ${solutionId}`}
          backFallback={this.handleBackClick}
        />

        <Container style={{ width: '80%', margin: '65px auto', maxWidth: 800 }}>
          <div style={{ fontSize: '2rem', lineHeight: '2rem' }}>Add Version</div>
          <div style={{ marginTop: 40 }}>
            {this.renderFormNotifications()}
            <div className="row">
              <div className="col-lg-8">
                <SelectFieldWrapper
                  name="type"
                  options={Store.getTypes()}
                  value={this.state.type}
                  onChange={this.handleTypeChange}
                  errorText={this.getValidationMessages('type').join(' ')}
                />
              </div>
              <div className="col-flex-1">
                <SelectFieldWrapper
                  name="instance"
                  options={Store.getInstancesDropdown()}
                  value={this.state.instance}
                  floatingLabelText="Instances"
                  labelStyle={styles.instanceDropdowInputLabel}
                  menuItemStyle={styles.instancesDropdownItem}
                  onChange={this.handleInstanceChange}
                  errorText={this.getValidationMessages('instance').join(' ')}
                />
              </div>
            </div>
          </div>
          <div className="row">
            {this.renderInfo()}
          </div>
          <div className="row" style={{ marginTop: 30 }}>
            {this.renderCheckboxes('Classes', classes, 'name', 'name', 'classes')}
            {this.renderCheckboxes('Data Endpoints', dataEndpoints, 'name', 'name', 'dataEndpoints')}
            {this.renderCheckboxes('Scripts', scripts, 'id', 'label', 'scripts')}
            {this.renderCheckboxes('Script Endpoints', scriptEndpoints, 'name', 'name', 'scriptEndpoints')}
            {this.renderCheckboxes('Triggers', triggers, 'id', 'label', 'triggers')}
            {this.renderCheckboxes('Schedules', schedules, 'id', 'label', 'schedules')}
            {this.renderCheckboxes('Channels', channels, 'name', 'name', 'channels')}
          </div>
          <div className="row" style={{ paddingTop: 30 }}>
            <div className="col-flex-1" style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <FlatButton
                style={{ marginRight: 10 }}
                ref="cancel"
                key="cancel"
                label="Cancel"
                onTouchTap={this.handleBackClick}
              />
              <RaisedButton
                ref="submit"
                key="confirm"
                label="Confirm"
                type="submit"
                disable={this.state.instance === null}
                primary={true}
              />
            </div>
          </div>
        </Container>
      </form>
    );
  }
}));

export default withRouter(AddVersionView);
