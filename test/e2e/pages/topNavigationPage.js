export default {
  url: 'https://localhost:8080/#/instances',
  elements: {
    syncanoLogo: {
      selector: '.logo-white'
    },
    menuAccount: {
      selector: 'div[data-e2e="account-icon-top-nav"]'
    },
    logoutDropdown: {
      selector: 'span[data-e2e="account-logout-top-nav-item"]'
    },
    instances: {
      selector: 'li[@id="menu-instances"]'
    },
    docs: {
      selector: 'li[@id="menu-documentation"]'
    },
    gettingStarted: {
      selector: 'li[@id="fa-rocket"]'
    },
    menuNotifications: {
      selector: 'button[data-e2e="notification-top-nav-button"]'
    },
    notificationsDropdown: {
      selector: 'div[data-e2e="notification-top-nav-list"]'
    }
  }
};
