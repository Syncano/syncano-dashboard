import React from 'react';
import AceEditor from 'react-ace';

import 'brace/mode/python';
import 'brace/mode/javascript';
import 'brace/mode/ruby';
import 'brace/mode/golang';
import 'brace/mode/swift';
import 'brace/mode/php';
import 'brace/mode/json';
import 'brace/mode/html';
import 'brace/mode/django';
import 'brace/theme/tomorrow';

class Editor extends React.Component {
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
    const { style, ...other } = this.props;

    return (
      <AceEditor
        id={name}
        ref="editor"
        style={{ ...styles.root, ...style }}
        {...other}
      />
    );
  }
}

export default Editor;
