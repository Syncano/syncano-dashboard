import React from 'react';
import ace from 'brace';

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

export default React.createClass({
  getDefaultProps() {
    return {
      name: 'brace-editor',
      mode: '',
      theme: 'tomorrow',
      height: '500px',
      width: '100%',
      value: '',
      fontSize: 12,
      showGutter: true,
      onChange: null,
      onLoad: null,
      maxLines: null,
      readOnly: false,
      highlightActiveLine: true,
      showPrintMargin: true,
      style: {}
    };
  },

  componentDidMount() {
    const {
      name,
      mode,
      theme,
      fontSize,
      value,
      showGutter,
      minLines,
      maxLines,
      readOnly,
      highlightActiveLine,
      setShowPrintMargin,
      onLoad
    } = this.props;

    this.editor = ace.edit(name);
    this.editor.$blockScrolling = Infinity;
    this.editor.getSession().setMode(`ace/mode/${mode}`);
    this.editor.setTheme(`ace/theme/${theme}`);
    this.editor.setFontSize(fontSize);
    this.editor.on('change', this.onChange);
    this.editor.setValue(value);
    this.editor.renderer.setShowGutter(showGutter);
    this.editor.setOption('minLines', minLines);
    this.editor.setOption('maxLines', maxLines);
    this.editor.setOption('readOnly', readOnly);
    this.editor.setOption('highlightActiveLine', highlightActiveLine);
    this.editor.setShowPrintMargin(setShowPrintMargin);

    this.editor.clearSelection();

    const textArea = document.getElementsByClassName('ace_text-input')[0];

    if (textArea.className.indexOf('mousetrap') === -1) {
      textArea.className += ' mousetrap';
    }

    if (onLoad) {
      onLoad(this.editor);
    }
  },

  componentDidUpdate(prevProps) {
    const { isEditorErrorVisible } = this.props;

    if (isEditorErrorVisible !== null && isEditorErrorVisible !== prevProps.isEditorErrorVisible) {
      this.editor.resize();
    }
  },

  getStyles() {
    const { width, height } = this.props;

    return {
      root: {
        width,
        height
      }
    };
  },

  onChange() {
    const value = this.editor.getValue();
    const { onChange } = this.props;

    if (onChange) {
      onChange(value);
    }
  },

  render() {
    const styles = this.getStyles();
    const { name, style, onFocus, onBlur } = this.props;

    return (
      <div
        id={name}
        style={{ ...styles.root, ...style }}
        onChange={this.onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        data-e2e={this.props['data-e2e']}
      />
    );
  }
});
