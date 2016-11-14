// Checks if specified selector occurs as many time as specified in count param,
// using locationStrategy "class name", "css selector", "id", "name",
// "link text", "partial link text", "tag name" or "xpath"
// Optional: message => string to displayed for assertion
exports.command = function assertSelectedCount(locationStrategy, selector, count, message = null) {
  return this.elements(locationStrategy, selector, (result) => {
    this.assert.equal(result.value.length, count, message);
  });
};
