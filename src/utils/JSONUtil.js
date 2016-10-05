import _ from 'lodash';

const JSONUtil = {
  isValidJSONInput: (value) => {
    if (typeof value === 'object' || value === '') {
      return true;
    }

    try {
      const parsedValue = JSON.parse(value);

      if (_.isPlainObject(parsedValue)) {
        return true;
      }

      return false;
    } catch (e) {
      return false;
    }
  }
};

export default JSONUtil;
