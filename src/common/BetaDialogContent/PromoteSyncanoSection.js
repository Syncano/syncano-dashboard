import React, { Component } from 'react';

import { RaisedButton, FlatButton } from 'material-ui';
import { Logo } from '../';

class PromoteSyncanoSection extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  getStyles = () => ({
    ribbonBackground: {
      width: 125,
      height: 30,
      backgroundColor: 'red',
      transform: 'rotate(-45deg)',
      position: 'absolute',
      top: 15,
      left: -30,
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 700,
      letterSpacing: 1
    },
    root: {
      fontSize: 20,
      display: 'flex',
      flexFlow: 'column nowrap',
      justifyContent: 'space-around',
      height: '100%'
    },
    flexColumn: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      width: '100%'
    },
    logo: {
      width: '80%',
      marginTop: 40,
      marginBottom: 20
    },
    ascendTag: {
      letterSpacing: 2,
      fontWeight: 700,
      color: '#000'
    },
    cta: {
      lineHeight: '25px',
      marginTop: 60,
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center'
    },
    ctaText: {
      fontSize: 18,
      color: '#9b9b9b'
    },
    ctaButtons: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      margin: '20px 0'
    },
    buttonContainer: {
      marginBottom: 15,
      borderRadius: 5,
      overflow: 'hidden'
    },
    buttonContent: {
      height: 50
    },
    buttonLabel: {
      fontSize: 20,
      textTransform: 'none'
    },
    buttonOverlay: {
      height: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    formInfo: {
      fontSize: 14,
      color: '#9b9b9b',
      textAlign: 'center',
      marginTop: 10
    },
    form: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: 10
    },
    formInput: {
      borderRadius: 5,
      backgroundColor: '#F5F5F5',
      flex: 2,
      marginRight: 10,
      border: '2px solid #E2E2E2',
      textAlign: 'center',
      fontSize: 18
    },
    formButton: {
      flex: 1,
      marginBottom: 0
    },
    inviteMoreButton: {

    }
  })

  static handleShareButtonClick(socialType) {
    const homeUrl = 'https://syncano.io';
    const message = 'I just signed up to get early access to the next version of Syncano! ' +
      'Check it out on www.syncano.io';
    const url = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${homeUrl}&quote=${message}`,
      twitter: `https://twitter.com/intent/tweet?text=${message}&via=syncano`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${homeUrl}&text=${message}`
    };

    window.open(url[socialType], 'pop', 'width=600, height=400');
    window.analytics.track('Beta referral sent', {
      social: socialType
    });
  }

  renderBetaRibbon() {
    const styles = this.getStyles();

    return (
      <div style={styles.ribbonBackground}>
        Beta
      </div>
    );
  }

  renderSocialButtons() {
    const styles = this.getStyles();

    return (
      <div style={styles.ctaButtons}>
        <RaisedButton
          style={styles.buttonContainer}
          buttonStyle={{ ...styles.buttonContent, backgroundColor: '#EBEEF4' }}
          overlayStyle={styles.buttonOverlay}
          labelStyle={{ ...styles.buttonLabel, color: '#3B5998' }}
          label="Share on Facebook"
          onClick={() => PromoteSyncanoSection.handleShareButtonClick('facebook')}
        />
        <RaisedButton
          style={styles.buttonContainer}
          buttonStyle={{ ...styles.buttonContent, backgroundColor: '#E8F5FD' }}
          overlayStyle={styles.buttonOverlay}
          labelStyle={{ ...styles.buttonLabel, color: '#1DA1F2' }}
          label="Tweet the link"
          onClick={() => PromoteSyncanoSection.handleShareButtonClick('twitter')}
        />
        <RaisedButton
          style={styles.buttonContainer}
          buttonStyle={{ ...styles.buttonContent, backgroundColor: '#E5F1F7' }}
          overlayStyle={styles.buttonOverlay}
          labelStyle={{ ...styles.buttonLabel, color: '#0077B5' }}
          label="Share on LinkedIn"
          onClick={() => PromoteSyncanoSection.handleShareButtonClick('linkedin')}
        />
      </div>
    );
  }

  renderPromoteSection() {
    const styles = this.getStyles();

    return (
      <div>
        <section style={styles.cta}>
          <p style={styles.ctaText}>
            Want to get to the top of the list?
            <br />
            Share Syncano with your friends!
          </p>
          {this.renderSocialButtons()}
        </section>
        <div style={styles.formInfo}>or send invites via email (separate with commas)</div>
        <form
          onSubmit={this.onSubmit}
          style={styles.form}
        >
          <input
            type="email"
            style={styles.formInput}
            placeholder="Enter email addresses"
          />
          <RaisedButton
            style={{ ...styles.buttonContainer, ...styles.formButton }}
            buttonStyle={styles.buttonContent}
            overlayStyle={styles.buttonOverlay}
            labelStyle={styles.buttonLabel}
            label="Send"
            onClick={this.handleButtonClick}
            primary={true}
          />
        </form>
      </div>
    );
  }

  renderThanksSection() {
    const styles = this.getStyles();

    return (
      <div style={styles.flexColumn}>
        <h5>Thank You!</h5>
        <p>{"We'll get back to you very soon!"}</p>
        <FlatButton
          label="Invite more people"
          primary={true}
          style={styles.inviteMoreButton}
          onTouchTap={this.setstate({ renderThanksSection: false })}
        />
      </div>
    );
  }

  render() {
    const styles = this.getStyles();
    const { renderThanksSection } = this.state;

    return (
      <div style={styles.root}>
        {this.renderBetaRibbon()}
        <header style={styles.flexColumn}>
          <div>Get ready for</div>
          <Logo
            className="logo-black"
            style={styles.logo}
          />
          <div style={styles.ascendTag}>
            ASCEND
          </div>
        </header>
        {!renderThanksSection && this.renderPromoteSection()}
        {renderThanksSection && this.renderThanksSection()}
      </div>
    );
  }
}

export default PromoteSyncanoSection;
