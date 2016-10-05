// It's a same command as clickListItemDropdown but it can be used with css selectors

// 'element' is the element to click in order to open the dropdown
// 'dropdoownChoice' can be part of the name of the dropdown option like "Edit" or "Delete"

exports.command = function clickDropdown(element, dropdownChoice) {
  return this
    .waitForElementVisible(element)
    .click(element)
    // Waiting for the dropdown click animation to finish
    .waitForElementVisible(dropdownChoice)
    .click(dropdownChoice)
    // Waiting for dropdown to be removed from DOM
    .waitForElementNotPresent(dropdownChoice)
    .pause(1000);
};
