import React, { Component } from 'react';
import axios from 'axios';
import { RaisedButton } from 'material-ui';
import AlertPageContent from '../common/AlertPageContent';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasSupportFormVisible: false,
      status: {
        page: {
          url: 'http://status.syncano.com/'
        },
        status: {
          description: 'Fetching current status...',
          indicator: 'loading'
        }
      }
    };
  }

  componentWillMount = () => {
    this.fetchCurrentStatus();
  };

  componentDidMount = () => {
    setInterval(() => {
      this.fetchCurrentStatus();
    }, 60000);
  };

  fetchCurrentStatus = () => {
    const url = 'https://6l1kzwgr7t06.statuspage.io/api/v2/status.json';

    axios.get(url).then((response) => this.setState({ status: response.data }));
  };

  render() {
    const { status } = this.state;

    return (
      <AlertPageContent
        imgSrc={require('../assets/img/illustrations/undergoing-maintenance.svg')}
        headline="Our platform is currently undergoing maintenance."
        message={<span>{'We\'ll be back as soon as we update a few things.'}<br />Thank you for your patience!</span>}
        buttonSet={
          <div>
            <a href="https://www.syncano.io/" target="_blank">
              <RaisedButton
                label="Go to our website"
                backgroundColor="#FFCC01"
                labelColor="#1D2228"
                style={{ height: 44, width: 210, boxShadow: 'none', margin: '0 10px' }}
                labelStyle={{ fontWeight: 700 }}
              />
            </a>
            <a href={status.page.url} target="_blank">
              <RaisedButton
                label="Syncano Status Page"
                backgroundColor="#E0E0E0"
                labelColor="#1D2228"
                style={{ height: 44, width: 210, boxShadow: 'none', margin: '0 10px' }}
                labelStyle={{ fontWeight: 700 }}
              />
            </a>
          </div>
        }
        bottomText={
          <span>
            Our <a href={status.page.url} target="_blank">status page</a> is reporting a status of <br />
            <strong>{status.status.description}</strong>
          </span>
        }
      />
    );
  }
}
