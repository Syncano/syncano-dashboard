import React from 'react';
import Reflux from 'reflux';
import Helmet from 'react-helmet';

import { FormMixin } from '../../mixins';

import ProfileActions from './ProfileActions';
import ProfileBillingAddressStore from './ProfileBillingAddressStore';

import { TextField, RaisedButton } from 'material-ui';
import { Container, InnerToolbar } from '../../common/';

const ProfileBillingAddress = React.createClass({
  mixins: [
    Reflux.connect(ProfileBillingAddressStore),
    FormMixin
  ],

  validatorConstraints: {
    company_name: {
      length: { maximum: 150 }
    },
    first_name: {
      length: { maximum: 35 }
    },
    last_name: {
      length: { maximum: 35 }
    },
    address_line1: {
      length: {
        maximum: 150,
        message: '^Address is too long (maximum is 150 characters)'
      }
    },
    address_line2: {
      length: {
        maximum: 150,
        message: '^Address is too long (maximum is 150 characters)'
      }
    },
    address_city: {
      length: {
        maximum: 100,
        message: '^City is too long (maximum is 100 characters)'
      }
    },
    address_state: {
      length: {
        maximum: 100,
        message: '^State  is too long (maximum is 100 characters)'
      }
    },
    address_zip: {
      length: {
        maximum: 10,
        message: '^Zip code is too long (maximum is 10 characters)'
      }
    },
    address_country: {
      length: {
        maximum: 35,
        message: '^Country is too long (maximum is 35 characters)'
      }
    },
    tax_number: {
      length: { maximum: 50 }
    }
  },

  componentDidMount() {
    ProfileActions.fetchBillingProfile();
  },

  handleSuccessfullValidation() {
    const {
      company_name,
      first_name,
      last_name,
      tax_number,
      address_line1,
      address_line2,
      address_country,
      address_state,
      address_zip,
      address_city,
      canSubmit
    } = this.state;

    ProfileActions.updateBillingProfile({
      company_name,
      first_name,
      last_name,
      tax_number,
      address_line1,
      address_line2,
      address_country,
      address_state,
      address_zip,
      address_city,
      canSubmit
    });
  },

  render() {
    const {
      company_name,
      first_name,
      last_name,
      tax_number,
      address_line1,
      address_line2,
      address_country,
      address_state,
      address_zip,
      address_city,
      canSubmit
    } = this.state;
    const title = 'Billing address';

    return (
      <div>
        <Helmet title={title} />
        <InnerToolbar title={title} />

        <Container>
          {this.renderFormNotifications()}
          <form
            onSubmit={this.handleFormValidation}
            acceptCharset="UTF-8"
            method="post"
          >
            <div className="row vm-6-b">
              <div className="col-lg-16">
                <TextField
                  name="company_name"
                  fullWidth={true}
                  value={this.state.company_name}
                  onChange={(event, value) => this.setState({ company_name: value })}
                  defaultValue={company_name}
                  errorText={this.getValidationMessages('company_name').join(' ')}
                  hintText="Company name"
                  floatingLabelText="Company name"
                />
                <TextField
                  value={this.state.first_name}
                  onChange={(event, value) => this.setState({ first_name: value })}
                  defaultValue={first_name}
                  errorText={this.getValidationMessages('first_name').join(' ')}
                  name="first_name"
                  floatingLabelText="First name"
                  hintText="First name"
                  fullWidth={true}
                />
                <TextField
                  value={this.state.last_name}
                  onChange={(event, value) => this.setState({ last_name: value })}
                  defaultValue={last_name}
                  errorText={this.getValidationMessages('last_name').join(' ')}
                  name="last_name"
                  floatingLabelText="Last name"
                  hintText="Last name"
                  fullWidth={true}
                />
                <TextField
                  value={this.state.tax_number}
                  onChange={(event, value) => this.setState({ tax_number: value })}
                  defaultValue={tax_number}
                  errorText={this.getValidationMessages('tax_number').join(' ')}
                  name="tax_number"
                  floatingLabelText="Tax number"
                  hintText="Tax number"
                  fullWidth={true}
                />
                <TextField
                  value={this.state.address_line1}
                  onChange={(event, value) => this.setState({ address_line1: value })}
                  defaultValue={address_line1}
                  errorText={this.getValidationMessages('address_line1').join(' ')}
                  name="address_line1"
                  floatingLabelText="Address"
                  hintText="Address"
                  fullWidth={true}
                />
                <TextField
                  value={this.state.address_line2}
                  onChange={(event, value) => this.setState({ address_line2: value })}
                  defaultValue={address_line2}
                  errorText={this.getValidationMessages('address_line2').join(' ')}
                  name="address_line2"
                  floatingLabelText="Address"
                  hintText="Address"
                  fullWidth={true}
                />
                <TextField
                  value={this.state.address_country}
                  onChange={(event, value) => this.setState({ address_country: value })}
                  defaultValue={address_country}
                  errorText={this.getValidationMessages('address_country').join(' ')}
                  name="address_country"
                  floatingLabelText="Country"
                  hintText="Country"
                  fullWidth={true}
                />
                <TextField
                  value={this.state.address_state}
                  onChange={(event, value) => this.setState({ address_state: value })}
                  defaultValue={address_state}
                  errorText={this.getValidationMessages('address_state').join(' ')}
                  name="address_state"
                  floatingLabelText="State"
                  autoComplete="State"
                  hintText="State"
                  fullWidth={true}
                />

                <div className="row vm-3-b">
                  <div className="col-md-15">
                    <TextField
                      value={this.state.address_zip}
                      onChange={(event, value) => this.setState({ address_zip: value })}
                      defaultValue={address_zip}
                      errorText={this.getValidationMessages('address_zip').join(' ')}
                      name="address_zip"
                      floatingLabelText="Zip code"
                      hintText="Zip code"
                      fullWidth={true}
                    />
                  </div>
                  <div className="col-flex-1">
                    <TextField
                      value={this.state.address_city}
                      onChange={(event, value) => this.setState({ address_city: value })}
                      defaultValue={address_city}
                      errorText={this.getValidationMessages('address_city').join(' ')}
                      name="address_city"
                      floatingLabelText="City"
                      hintText="City"
                      fullWidth={true}
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <div>
                    <RaisedButton
                      type="submit"
                      label="Update"
                      className="raised-button"
                      disabled={!canSubmit}
                      labelStyle={{ textTransform: 'none', color: '#436E1D' }}
                      buttonStyle={{ borderRadius: '4px' }}
                      backgroundColor="#B8E986"
                      data-e2e="billing-address-update-button"
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </Container>
      </div>
    );
  }
});

export default ProfileBillingAddress;
