exports.command = function changeWindow(windowNumber, expectedWindowCount) {
  return this.windowHandles((result) => {
    const handle = result.value[windowNumber];
    const message = `There should be ${expectedWindowCount} windows open.`;

    this.assert.equal(result.value.length, expectedWindowCount, message);
    this.switchWindow(handle);
  });
};
