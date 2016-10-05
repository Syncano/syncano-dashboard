import React, { Component } from 'react';
import localStorage from 'local-storage-fallback';

export default (ComposedComponent, pageIntroName) => (
  class PageIntroHOC extends Component {
    constructor(props) {
      super(props);

      this.state = {
        isPageIntroVisible: localStorage.getItem(pageIntroName)
      };
    }

    hidePageIntro = () => {
      localStorage.setItem(pageIntroName, 'false');
      this.setState({ isPageIntroVisible: 'false' });
    }

    render() {
      return (
        <ComposedComponent
          {...this.props}
          {...this.state}
          hidePageIntro={this.hidePageIntro}
        />
      );
    }
  }
);
