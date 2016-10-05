import React, { Component } from 'react';
import { FlatButton, Popover, Menu, MenuItem, FontIcon } from 'material-ui';

class HeaderGettingStartedDropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
  }

  getStyles() {
    return {
      flatButtonLabelStyle: {
        paddingLeft: 0,
        color: '#fff',
        fontSize: 15,
        fontWeight: 400,
        textTransform: 'none'
      },
      fontIconColor: {
        color: '#fff'
      }
    };
  }

  handleTouchTap = (event) => {
    // this prevents ghost click
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false
    });
  };

  render() {
    const styles = this.getStyles();

    return (
      <div>
        <FlatButton
          data-e2e="getting-started-top-nav-button"
          label="Getting Started"
          labelPosition="before"
          labelStyle={styles.flatButtonLabelStyle}
          icon={<FontIcon
            className="synicon-menu-down"
            color={styles.fontIconColor.color}
          />}
          hoverColor="none"
          onTouchTap={this.handleTouchTap}
        />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          onRequestClose={this.handleRequestClose}
        >
          <Menu onItemTouchTap={this.handleRequestClose}>
            <a
              href="http://docs.syncano.io/docs/syncano-overview/"
              target="_blank"
            >
              <MenuItem
                data-e2e="syncano-overview-top-nav-item"
                primaryText="Syncano Overview"
              />
            </a>
            <a
              href="http://docs.syncano.io/docs/quick-start-tutorial/"
              target="_blank"
            >
              <MenuItem
                data-e2e="quickstart-guide-top-nav-item"
                primaryText="Quick Start Tutorial"
              />
            </a>
            <a
              href="http://docs.syncano.io/"
              target="_blank"
            >
              <MenuItem
                data-e2e="documentation-top-nav-item"
                primaryText="Documentation"
              />
            </a>
            <a
              href="https://www.syncano.io/blog/tag/tutorials/"
              target="_blank"
            >
              <MenuItem
                data-e2e="tutorials-top-nav-item"
                primaryText="Tutorials"
              />
            </a>
          </Menu>
        </Popover>
      </div>
    );
  }
}

export default HeaderGettingStartedDropdown;
