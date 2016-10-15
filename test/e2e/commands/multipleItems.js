// Command that wraps clickListItemDropdown and assertSelectedCount
// thus creating command that can for example select x items and assert that
// proper number of them where selected.
exports.command = function multipleItems(action, assertionCount, optionsMenu, selectedItems) {
  return this
    .useXpath()
    .clickListItemDropdown(optionsMenu, action)
    .assertSelectedCount('xpath', selectedItems, assertionCount);
};
