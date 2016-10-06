import React from 'react';
import { withRouter } from 'react-router';

import Actions from './CustomSocketsRegistryActions';

import { FlatButton } from 'material-ui';
import { ColumnList, Color } from '../../common/';

const Column = ColumnList.Column;

const CustomSocketsRegistryListItem = React.createClass({

  propTypes: {
    onIconClick: React.PropTypes.func.isRequired,
    showDeleteDialog: React.PropTypes.func.isRequired
  },

  getStyles() {
    return {
      button: {
        position: 'relative',
        right: 30,
        justifyContent: 'center'
      },
      item: {
        fontSize: '1.3em'
      }
    };
  },

  showDialog(item) {
    Actions.showDialog(item);
  },

  render() {
    const { item, onIconClick } = this.props;
    const { metadata } = item;
    const metaIcon = metadata && metadata.icon ? metadata.icon : 'socket-custom-socket';
    const metaDefaultColor = Color.getColorByName('purple', 'light');
    const metaColor = metadata && metadata.color ? metadata.color : metaDefaultColor;
    const styles = this.getStyles();

    return (
      <ColumnList.Item
        checked={item.checked}
        key={item.name}
      >
        <Column.CheckIcon.Socket
          className="col-xs-10"
          id={item.name}
          iconClassName={metaIcon}
          iconColor={metaColor}
          checked={item.checked}
          keyName="name"
          handleIconClick={onIconClick}
          primaryText={item.name}
          primaryTextTooltip={item.description}
        />
        <Column.Desc
          className="col-xs-5"
        >
          {item.author}
        </Column.Desc>
        <Column.Desc
          className="col-flex-2"
        >
          {item.description}
        </Column.Desc>
        <Column.Desc
          className="col-sm-5"
        >
          <FlatButton
            style={styles.button}
            label="SEE DETAILS"
            href="#/custom-sockets-registry/custom-socket"
          />
        </Column.Desc>
      </ColumnList.Item>
    );
  }
});

export default withRouter(CustomSocketsRegistryListItem);
