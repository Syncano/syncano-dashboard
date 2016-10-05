import _ from 'lodash';

export default {
  handleChangeTextField(key, value) {
    const { scriptData } = this.state;

    _.set(scriptData, key, value);

    this.setState({ scriptData });
  },
  handleChangeAutoComplete(value) {
    const { scriptData } = this.state;

    _.set(scriptData, 'runtime_name', value);

    this.setState({ scriptData });
  }
};
