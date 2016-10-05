// Command that will clear value of given element
// and then fill with target string.
exports.command = function fillInput(element, string) {
  return this
    .waitForElementVisible(element)
    .clearValue(element)
    .pause(300)
    .setValue(element, string)
    .pause(1000);
};
