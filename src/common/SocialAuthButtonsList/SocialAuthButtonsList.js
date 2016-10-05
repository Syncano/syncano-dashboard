import React from 'react';
import ListItem from './SocialAuthButtonsListItem';
import ListItemDivider from './SocialAuthButtonsListItemDivider';
import { List } from 'material-ui';
import { colors as Colors } from 'material-ui/styles/';

export default React.createClass({
  displayName: 'SocialAuthButtonsList',

  getDefaultProps() {
    return {
      mode: 'login'
    };
  },

  getStyles() {
    return {
      paddingTop: 0,
      paddingBottom: 0,
      marginBottom: 24,
      border: `1px solid ${Colors.blue700}`
    };
  },

  renderSocialButtons() {
    const { networks, mode, onSocialLogin } = this.props;
    const lastListItemIndex = networks.length - 1;
    const buttons = [];

    networks.map((network, index) => {
      buttons.push(
        <ListItem
          key={`network-${network}`}
          network={network}
          mode={mode}
          onTouchTap={() => onSocialLogin(network)}
        />
      );
      if (index < lastListItemIndex) {
        buttons.push(<ListItemDivider key={`divider-${index}`} />);
      }
    });

    return buttons;
  },

  render() {
    const styles = this.getStyles();

    return (
      <List style={styles}>{this.renderSocialButtons()}</List>
    );
  }
});
