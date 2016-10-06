export default {
  getDropdown(list, payloadArg, textArg) {
    if (!list) {
      return [{ payload: '', text: 'Loading...' }];
    }
    return list.map((item) => ({
      payload: item[payloadArg],
      text: item[textArg]
    }));
  },
  getSelectOptions(list, labelArg, valueArg) {
    if (!list) {
      return [];
    }
    return list.map((item) => ({
      label: item[labelArg],
      value: item[valueArg]
    }));
  },
  getSelectValuesFromList(list) {
    if (!list) {
      return [];
    }
    return list.map((item) => ({
      label: item,
      value: item
    }));
  }
};
