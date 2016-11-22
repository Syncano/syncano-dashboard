import React from 'react';
import Reflux from 'reflux';
import Helmet from 'react-helmet';

import ProfileBillingInvoicesStore from './ProfileBillingInvoicesStore';
import ProfileActions from './ProfileActions';
import SessionStore from '../Session/SessionStore';

import { RaisedButton } from 'material-ui';
import { ColumnList, Container, Loading, Show, InnerToolbar, Lists } from '../../common/';

const Column = ColumnList.Column;

const ProfileBillingInvoices = React.createClass({
  mixins: [
    Reflux.connect(ProfileBillingInvoicesStore)
  ],

  componentDidMount() {
    ProfileActions.fetchInvoices();
  },

  handlePDFClick(invoice) {
    let pdfUrl = APP_CONFIG.SYNCANO_BASE_URL + invoice.links.pdf;

    pdfUrl += `?api_key=${SessionStore.getToken('')}`;
    location.href = pdfUrl;
  },

  handleRetryPaymentClick(invoice) {
    ProfileActions.retryPayment(invoice);
  },

  renderActionButton(invoice) {
    if (invoice.status === 'payment failed') {
      return (
        <RaisedButton
          label="Retry Payment"
          secondary={true}
          disabled={invoice.actionDisabled}
          onClick={() => this.handleRetryPaymentClick(invoice)}
        />
      );
    }

    return (
      <RaisedButton
        label="Download"
        primary={true}
        onClick={() => this.handlePDFClick(invoice)}
      />
    );
  },

  render() {
    const { isLoading, invoices } = this.state;
    const title = 'Invoices';

    return (
      <Loading show={isLoading}>
        <Helmet title={title} />
        <InnerToolbar title={title} />

        <Show if={!invoices.length}>
          <Container.Empty
            icon="synicon-file-outline"
            text="You have no invoices"
          />
        </Show>

        <Show if={invoices.length}>
          <Container>
            <Lists.Container className="invoices-list">
              <ColumnList.Header>
                <Column.ColumnHeader columnName="DESC">Period</Column.ColumnHeader>
                <Column.ColumnHeader columnName="DESC">Invoice ID</Column.ColumnHeader>
                <Column.ColumnHeader columnName="DESC">Amount</Column.ColumnHeader>
                <Column.ColumnHeader columnName="DESC">Status</Column.ColumnHeader>
                <Column.ColumnHeader columnName="DESC">Action</Column.ColumnHeader>
              </ColumnList.Header>
              <Lists.List key="invoices-list">
                {invoices.map((invoice) => (
                  <ColumnList.Item key={invoice.id}>
                    <Column.Desc>{invoice.period}</Column.Desc>
                    <Column.Desc>{invoice.id}</Column.Desc>
                    <Column.Desc>{invoice.amount}</Column.Desc>
                    <Column.Desc>{invoice.status}</Column.Desc>
                    <Column.Desc>
                      {this.renderActionButton(invoice)}
                    </Column.Desc>
                  </ColumnList.Item>
                ))}
              </Lists.List>
            </Lists.Container>
          </Container>
        </Show>
      </Loading>
    );
  }
});

export default ProfileBillingInvoices;
