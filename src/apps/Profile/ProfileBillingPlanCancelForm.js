import React from 'react';
import Reflux from 'reflux';
import Radium from 'radium';
import { withRouter } from 'react-router';
import _ from 'lodash';

import Store from './ProfileBillingPlanStore';
import Actions from './ProfileBillingPlanActions';
import SessionStore from '../Session/SessionStore';

import { FormMixin } from '../../mixins';
import Constants from '../../constants/Constants';

import { RadioButton, RadioButtonGroup, TextField, FlatButton, RaisedButton } from 'material-ui';

const ProfileBillingPlanCancelForm = Radium(React.createClass({
  displayName: 'ProfileBillingPlanCancelForm',

  mixins: [
    FormMixin,
    Reflux.connect(Store)
  ],

  validatorConstraints() {
    const { reason } = this.state;

    return {
      reason: {
        presence: true
      },
      competitor: {
        presence: reason === 'Switching to a competitor'
      },
      other: {
        presence: reason === 'Other'
      },
      additionalFeedback: {},
      _gotcha: {},
      _subject: {}
    };
  },

  getStyles() {
    return {
      heading: {
        fontSize: '1.3em',
        lineHeight: '1.5em'
      },
      radioButton: {
        marginBottom: 8
      }
    };
  },

  getInitialState() {
    const user = SessionStore.getUser();

    return {
      reason: null,
      competitor: null,
      other: null,
      additionalFeedback: null,
      textFieldRows: 3,
      _gotcha: null,
      _subject: 'Cancel my Plan Request from Syncano',
      _replyto: user.email
    };
  },

  handleSuccessfullValidation() {
    const { reason, competitor, other, additionalFeedback, _gotcha, _subject, _replyto } = this.state;
    const data = { reason, competitor, other, additionalFeedback, _gotcha, _subject, _replyto };

    Actions.cancelSubscriptionRequest(data);
  },

  handleFailedValidation(errors) {
    // there is max one field invalid at once
    this.setState({ errors: { feedback: errors[Object.keys(errors)[0]] } });
  },

  renderDynamicFields() {
    const { reason } = this.state;

    if (reason === 'Other') {
      return (
        <TextField
          ref="other"
          name="other"
          floatingLabelText="Your reason to cancel"
          fullWidth={true}
          value={this.state.other}
          onChange={(event, value) => this.setState({ other: value })}
        />
      );
    }

    if (reason === 'Switching to a competitor') {
      return (
        <TextField
          ref="competitor"
          name="competitor"
          floatingLabelText="Name of competitor"
          fullWidth={true}
          value={this.state.competitor}
          onChange={(event, value) => this.setState({ competitor: value })}
        />
      );
    }

    return null;
  },

  render() {
    const styles = this.getStyles();
    const { textFieldRows } = this.state;
    const { router } = this.props;
    const reasons = Constants.CANCEL_BILLING_PLAN_REASONS;

    return (
      <div className="row">
        <div className="col-flex-1">
          <form
            onSubmit={this.handleFormValidation}
            method="post"
            acceptCharset="UTF-8"
          >
            {this.renderFormNotifications() &&
              <div className="row vp-3-b">
                <div className="col-flex-1">
                  {this.renderFormNotifications()}
                </div>
              </div>
            }
            <div className="row vp-3-b">
              <div className="col-flex-1">
                <div style={styles.heading}>
                  It wouldn’t be the same without you :(
                  <br />Could you tell us why you want to cancel?
                </div>
              </div>
            </div>
            <div className="row vp-3-b">
              <div className="col-flex-1">
                <input
                  ref="_gotcha"
                  name="_gotcha"
                  value={this.state._gotcha}
                  onChange={(event, value) => this.setState({ _gotcha: value })}
                  style={{ display: 'none' }}
                />
                <RadioButtonGroup
                  ref="reason"
                  name="reason"
                  value={this.state.reason}
                  onChange={(event, value) => this.setState({ reason: value })}
                >
                  {_.map(reasons, (reason) => (
                    <RadioButton
                      key={reason}
                      value={reason}
                      label={reason}
                      style={styles.radioButton}
                    />
                  ))}
                </RadioButtonGroup>
                {this.renderDynamicFields()}
              </div>
            </div>
            <div className="row vp-1-b">
              <div className="col-flex-1">
                <div style={styles.heading}>Additional feedback?</div>
              </div>
            </div>
            <div className="row vp-3-b">
              <div className="col-flex-1">
                <TextField
                  ref="additionalFeedback"
                  name="additionalFeedback"
                  floatingLabelText="Type your feedback here&hellip;"
                  multiLine={true}
                  rows={textFieldRows}
                  fullWidth={true}
                  value={this.state.additionalFeedback}
                  onChange={(event, value) => this.setState({ additionalFeedback: value })}
                  onFocus={() => this.setState({ textFieldRows: 5 })}
                />
              </div>
            </div>
            <div className="row text--right">
              <div className="col-flex-1">
                <FlatButton
                  label="Keep my plan"
                  style={{ marginRight: 10 }}
                  onTouchTap={() => router.push('profile-billing-plan')}
                />
                <RaisedButton
                  type="submit"
                  label="Cancel plan"
                  primary={true}
                  data-e2e="confirm-cancel-plan-button"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}));

export default withRouter(ProfileBillingPlanCancelForm);
