// 'element' is the element to click in order to open the dropdown
// 'dropdoownChoice' can be part of the name of the dropdown option like "Edit" or "Delete"

exports.command = function clickListItemDropdown(listItem, dropdownChoice) {
  // if xpath pass, else construct xpath
  const isSelector = ['/', '('];
  const listItemDropdown = isSelector.indexOf(listItem[0]) !== -1 ? listItem
  : `//div[text()="${listItem}"]/../../../following-sibling::div//span[@class="synicon-dots-vertical"]`;
  const choice = `//div[contains(text(), "${dropdownChoice}")]`;

  return this
    .useXpath()
    .waitForElementVisible(listItemDropdown)
    .click(listItemDropdown)
    // Waiting for the dropdown click animation to finish
    .waitForElementNotPresent('//span[@class="synicon-dots-vertical"]/preceding-sibling::span/div')
    .click(choice)
    // Waiting for dropdown to be removed from DOM
    .waitForElementNotPresent('//iframe/following-sibling::div[@style]/div')
    .pause(1000);
};
