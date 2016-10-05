import localStorage from 'local-storage-fallback';

module.exports = {
  loggedIn() {
    return Boolean(localStorage.getItem('token'));
  }
};
