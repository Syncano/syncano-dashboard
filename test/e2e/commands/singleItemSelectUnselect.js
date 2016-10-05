// Command for making action of selection and unselection of single row item
// iconClassName: icon name hidden in span class value
//      example: "synicon-android"
// optionsMenu: selector for options for particular row
//      example: const optionsMenu = listsPage.elements.firstItemOptionsMenu.selector;
// selectedItem: selector for highlitghted button when selected
//       example: const selectedItem = listsPage.elements.selectedItem.selector;

exports.command = function singleItemSelectUnselect(iconClassName, optionsMenuSelector, selectedItemSelector) {
  const button = `(//span[contains(@class, "${iconClassName}")]/../../../button[@type="button"])[1]`;

  return this
    .useXpath()
    .waitForElementVisible(button)
    .moveToElement(button, 0, 0)
    .clickElement(button)
    .clickElement(selectedItemSelector)
    .moveToElement(optionsMenuSelector, 0, 0)
    .waitForElementPresent(button);
};
