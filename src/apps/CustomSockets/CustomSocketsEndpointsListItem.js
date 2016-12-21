import React from 'react';
import { withRouter } from 'react-router';
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
    const { item } = this.props;
    const { metadata } = item;
    const link = item.links.self;
    const endpointName = item.name.split('/')[1];
    const metaIconType = metadata && metadata.icon ? metadata.icon : 'custom-socket';
    const metaIconColor = Color.getColorByName(metadata && metadata.color ? metadata.color : 'purple');

    return (
      <ColumnList.Item>
        <Column.CheckIcon
          className="col-flex-3"
          iconClassName={metaIconType}
          background={metaIconColor}
          checkable={false}
          style={styles.icon}
          primaryText={endpointName}
          secondaryText={
            <Clipboard
              text={item.links.self}
              copyText={`${SYNCANO_BASE_URL}${link}`}
              onCopy={this.handleOpenSnackbar}
              tooltip="Copy Socket Endpoint url"
              type="link"
            />
          }
        />
        <Column.Desc
          className="col-flex-1"
          style={styles.methodColumnDesc}
        >
          <div>
            {this.renderCallMethodsLabel(item.allowed_methods)}
          </div>
        </Column.Desc>
      </ColumnList.Item>
    );
  }
});

export default withRouter(CustomSocketsEndpointsListItem);
