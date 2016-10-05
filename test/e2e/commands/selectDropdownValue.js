// Command that selects given dropdownValue from targeted element.
exports.command = function selectDropdownValue(element, dropdownValue) {
  const value = `//iframe//following-sibling::div//div[text()="${dropdownValue}"]`;

  return this
    .waitForElementVisible(element)
    .moveToElement(element, 0, 0)
    .pause(500)
    .mouseButtonClick()
    .pause(500)
    .waitForElementVisible(value)
    .pause(500)
    .click(value)
    .pause(500);
};
