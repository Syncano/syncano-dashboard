import React, { Component } from 'react';
import AceEditor from 'react-ace';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    Promise.all([System.import(`brace/mode/${props.mode}`), System.import(`brace/theme/tomorrow`)]).then(() => {
      this.setState({ loaded: true });
    });
  }

  getStyles() {
    const { width, height } = this.props;

    return {
      root: {
        width,
        height
      }
    };
  }

  render() {
    const styles = this.getStyles();
    const { loaded } = this.state;
    const { style, editorName, ...other } = this.props;

    if (!loaded) {
      return null;
    }

    return (
      <div data-e2e={other['data-e2e']}>
        <AceEditor
          id={editorName}
          name={editorName}
          ref={`editor-${editorName}`}
          showPrintMargin={false}
          theme="tomorrow"
          editorProps={{ $blockScrolling: 'Infinity' }}
          style={{ ...styles.root, ...style }}
          {...other}
        />
      </div>
    );
  }
}

export default Editor;
