// Custom command that clears specified element by using CTRL+A and then DELETE
// oparation. Created as a workaround for AceEditor clearing.
exports.command = function clearInput(element) {
  const mainKey = process.platform === 'darwin' ? this.Keys.COMMAND : this.Keys.CONTROL;

  return this
    .click(element)
    .pause(100)
    .keys(mainKey)
    .keys('a')
    .keys(this.Keys.NULL)
    .pause(200)
    .keys(this.Keys.DELETE)
    .keys(this.Keys.NULL)
    .pause(100);
};
