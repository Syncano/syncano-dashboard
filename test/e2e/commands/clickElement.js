// Command that will wait for a given element to be visible, then
// will move to it, click and pause for 1sec. Mostly used for buttons or any
// other clickable parts of UI.
exports.command = function clickElement(element) {
  return this
    .waitForElementPresent(element)
    .moveToElement(element, 0, 0)
    .click(element);
};
