// Custom commands that extracts chrome console logs and their level
// In future could save this to file, fail tests or build.
// Using log.message you could get whole message, but for now I will disable it
// as without proper formating it won't be readable.
exports.command = function getChromeLogs() {
  return this.getLog('browser', (logEntriesArray) => {
    logEntriesArray.forEach((log) => {
      console.log(`[${log.level}] Timestamp: ${log.timestamp}\n`);
    });
  });
};
