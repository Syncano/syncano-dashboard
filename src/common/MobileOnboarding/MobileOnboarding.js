import React, { Component } from 'react';

import Logo from '../Logo';

class MobileOnboarding extends Component {
  constructor() {
    super();

    this.state = {
      currentSlideIndex: 0
    };
  }

  getStyles = () => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh'
    },
    header: {
      flex: '0 0 50px',
      background: '#244273',
      display: 'flex',
      alignItems: 'center',
      padding: '0 24px'
    },
    headerLogo: {
      height: 20
    },
    content: {
      flex: 1
    },
    footer: {
      flex: '0 0 42px',
      background: '#244273',
      display: 'flex',
      padding: '0 15px'
    },
    footerArrowLeft: {
      flex: 2,
      color: '#fff',
      display: 'flex',
      alignItems: 'center'
    },
    footerCounter: {
      flex: 1,
      color: '#fff',
      fontSize: 18,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    footerArrowRight: {
      flex: 2,
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end'
    },
    footerIcon: {
      fontSize: 26
    }
  })

  showNextSlide = () => {
    const { children } = this.props;
    const { currentSlideIndex } = this.state;

    if (currentSlideIndex + 1 < children.length) {
      this.setState((prevState) => ({
        currentSlideIndex: prevState.currentSlideIndex + 1
      }));
    }
  }

  showPrevSlide = () => {
    const { currentSlideIndex } = this.state;

    if (currentSlideIndex > 0) {
      this.setState((prevState) => ({
        currentSlideIndex: prevState.currentSlideIndex - 1
      }));
    }
  }

  renderHeader() {
    const styles = this.getStyles();

    return (
      <div style={styles.header}>
        <Logo
          className="logo-white"
          style={styles.headerLogo}
        />
      </div>
    );
  }

  renderContent() {
    const styles = this.getStyles();
    const { children } = this.props;
    const { currentSlideIndex } = this.state;

    return (
      <div style={styles.content}>
        {children[currentSlideIndex]}
      </div>
    );
  }

  renderFooterArrowLeft() {
    const styles = this.getStyles();
    const { currentSlideIndex } = this.state;

    if (currentSlideIndex < 1) {
      return null;
    }

    return (
      <span
        className="synicon-arrow-left"
        style={styles.footerIcon}
        onClick={this.showPrevSlide}
      />
    );
  }

  renderFooterArrowRight() {
    const styles = this.getStyles();
    const { children } = this.props;
    const { currentSlideIndex } = this.state;

    if (currentSlideIndex + 1 >= children.length) {
      return null;
    }

    return (
      <span
        className="synicon-arrow-right"
        style={styles.footerIcon}
        onClick={this.showNextSlide}
      />
    );
  }

  renderFooter() {
    const styles = this.getStyles();
    const { children } = this.props;
    const { currentSlideIndex } = this.state;
    const currentPage = currentSlideIndex + 1;

    return (
      <div style={styles.footer}>
        <div style={styles.footerArrowLeft}>
          {this.renderFooterArrowLeft()}
        </div>
        <div style={styles.footerCounter}>
          {currentPage}/{children.length}
        </div>
        <div style={styles.footerArrowRight}>
          {this.renderFooterArrowRight()}
        </div>
      </div>
    );
  }

  render() {
    const styles = this.getStyles();

    return (
      <div style={styles.root}>
        {this.renderHeader()}
        {this.renderContent()}
        {this.renderFooter()}
      </div>
    );
  }
}

export default MobileOnboarding;
