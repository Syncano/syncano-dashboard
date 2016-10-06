import React from 'react';
import { withRouter, Link } from 'react-router';
import _ from 'lodash';

import { SnackbarNotificationMixin } from '../../mixins';
import { Clipboard, Color, ColumnList, MethodLabel } from '../../common';

const Column = ColumnList.Column;
const styles = {
  icon: {
    cursor: 'default'
  },
  methodColumnDesc: {
    display: 'flex',
    justifyContent: 'center'
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    width: 192,
    height: 56
  },
  methodLabel: {
    fontSize: 12,
    padding: 4,
    margin: 2,
    height: 24
  },
  codeColumnDesc: {
    justifyContent: 'center'
  }
};

const CustomSocketsEndpointsListItem = React.createClass({
  mixins: [SnackbarNotificationMixin],

  handleOpenSnackbar() {
    this.setSnackbarNotification({ message: 'Custom Socket Endpoint url copied!' });
  },

  renderCallMethodsLabel(methods) {
    const callMethods = methods[0] === '*' ? ['get', 'post', 'put', 'patch', 'delete'] : methods;
    const wrapperStyle = callMethods.length > 1 ? styles.wrapper : null;
    const renderMethods = _.map(callMethods, (method) => (
      <MethodLabel
        key={`method-${method}`}
        style={styles.methodLabel}
        method={_.toLower(method)}
      />
    ));

    return (
      <div style={wrapperStyle}>
        {renderMethods}
      </div>
    );
  },

  render() {
    const { item, socketName, params } = this.props;
    const { instanceName } = params;
    const { metadata } = item;
    const metaIconType = metadata && metadata.icon ? metadata.icon : 'custom-socket';
    const metaIconColor = Color.getColorByName(metadata && metadata.color ? metadata.color : 'purple');
    const link = `/v1.1/instances/${instanceName}/endpoints/sockets/${socketName}/${item.endpointName}/`;
    const scriptTraceLink = `/instances/${instanceName}/script-endpoints/${item.name}/traces/`;
    const scriptId = item.scriptEndpoint.script;
    const scriptLink = `/instances/${instanceName}/scripts/${scriptId}/`;

    return (
      <ColumnList.Item>
        <Column.CheckIcon
          className="col-flex-3"
          iconClassName={metaIconType}
          background={metaIconColor}
          checkable={false}
          style={styles.icon}
          primaryText={item.endpointName}
          secondaryText={
            <Clipboard
              text={link}
              copyText={`${SYNCANO_BASE_URL}${link}`}
              onCopy={this.handleOpenSnackbar}
              tooltip="Copy Custom Socket Endpoint url"
              type="link"
            />
          }
        />
        <Column.Desc
          className="col-flex-1"
          style={styles.methodColumnDesc}
        >
          <div>
            {this.renderCallMethodsLabel(item.methods)}
          </div>
        </Column.Desc>
        <Column.Desc className="col-sm-3">
          <Link
            data-e2e={`${item.name}-script-custom-socket-related-script`}
            to={{ pathname: scriptLink }}
          >
            {item.name}
          </Link>
        </Column.Desc>
        <Column.Desc className="col-sm-3">
          <Link to={{ pathname: scriptTraceLink }}>
            Traces
          </Link>
        </Column.Desc>
      </ColumnList.Item>
    );
  }
});

export default withRouter(CustomSocketsEndpointsListItem);
