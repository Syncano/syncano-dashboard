import React from 'react';
import Radium from 'radium';
import { FontIcon, Card, CardTitle, Avatar, CardText, FlatButton, IconButton } from 'material-ui';
import { colors as Colors } from 'material-ui/styles/';
import SolutionStar from './Star';

export default Radium(React.createClass({
  displayName: 'SolutionsListItem',

  getStyles() {
    return {
      cardTitleContainer: {
        display: 'flex',
        position: 'relative'
      },
      cardTitleRoot: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        maxWidth: 'calc(100% - 87px)'
      },
      cardTitle: {
        color: '#4a4a4a',
        fontSize: 18,
        lineHeight: '24px',
        height: 48,
        overflow: 'hidden',
        display: 'block'
      },
      cardSubtitle: {
        color: 'rgba(74, 74, 74, 0.64)',
        fontSize: 14,
        fontWeight: 400,
        lineHeight: '20px',
        height: 80,
        overflow: 'hidden',
        display: 'block',
        padding: '0 16px'
      },
      cardTextList: {
        color: '#9b9b9b',
        display: 'flex',
        alignItems: 'center',
        fontSize: 12,
        padding: '4px 0'
      },
      cardTextListIcon: {
        fontSize: 15,
        marginRight: 8
      },
      cardFooter: {
        borderTop: '1px solid #ddd',
        padding: 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      },
      cardAvatarContainer: {
        padding: 16
      },
      installIcon: {
        color: Colors.blue500
      },
      seeDetailsButton: {
        color: Colors.blue500,
        letterSpacing: 0.5
      },
      tag: {
        color: '#9b9b9b',
        paddingRight: 3
      }
    };
  },

  isNoVersions() {
    const item = this.props.data;

    return (item && !item.versions.devel && !item.versions.stable);
  },

  handleSeeMoreClick() {
    this.props.onSeeMore(this.props.data.id);
  },

  handleInstallClick() {
    this.props.onInstall(this.props.data.id);
  },

  renderVersion() {
    const styles = this.getStyles();
    const item = this.props.data;
    let name = null;
    let color = null;

    if (item.versions.stable) {
      name = `stable (${item.versions.stable})`;
      color = '#7ED321';
    } else {
      name = `development (${item.versions.devel || 'no versions'})`;
      color = '#f5a623';
    }

    return (
      <div style={styles.cardTextList}>
        <FontIcon
          style={styles.cardTextListIcon}
          className="synicon-information-outline"
          color={color}
        />
        {name}
      </div>
    );
  },

  renderItemTags() {
    const styles = this.getStyles();

    if (this.props.data.tags && this.props.data.tags.length === 0) {
      return <div style={styles.tag}>no tags</div>;
    }

    return this.props.data.tags.map((tag) => (
      <a
        key={tag}
        style={styles.tag}
        onClick={() => this.props.onTagClick(tag)}
      >
        {tag}
      </a>
    ));
  },

  render() {
    const styles = this.getStyles();
    const item = this.props.data;

    return (
      <Card>
        <div style={styles.cardTitleContainer}>
          <CardTitle
            style={styles.cardTitleRoot}
            title={item.label}
            titleStyle={styles.cardTitle}
          />

          <div style={styles.cardAvatarContainer}>
            <Avatar
              size={55}
              src={item.author ? item.author.avatar_url : null}
            />
          </div>
        </div>

        <CardText style={styles.cardSubtitle}>
          {item.description}
        </CardText>

        <CardText>
          <div style={styles.cardTextList}>
            <FontIcon
              style={styles.cardTextListIcon}
              className="synicon-tag"
              color="rgba(222, 222, 222, 0.54)"
            />
            {this.renderItemTags()}
          </div>
          {this.renderVersion()}
        </CardText>

        <div style={styles.cardFooter}>
          <SolutionStar
            solution={item}
            onUnstar={this.props.onUnstar}
            onStar={this.props.onStar}
          />
          <FlatButton
            label="SEE DETAILS"
            labelStyle={styles.seeDetailsButton}
            onClick={this.handleSeeMoreClick}
          />
          <IconButton
            iconClassName="synicon-download"
            disabled={this.isNoVersions()}
            iconStyle={this.isNoVersions() ? {} : styles.installIcon}
            onClick={this.handleInstallClick}
            touch={true}
          />
        </div>
      </Card>
    );
  }
}));
