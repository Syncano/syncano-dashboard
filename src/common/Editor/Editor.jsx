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
    const { style, editorName, ...other } = this.props;

    return (
      <div data-e2e={other['data-e2e']}>
        <AceEditor
          id={editorName}
          name={editorName}
          ref={`editor-${editorName}`}
          editorProps={{ $blockScrolling: 'Infinity' }}
          style={{ ...styles.root, ...style }}
          {...other}
        />
      </div>
    );
  }
}

export default Editor;
