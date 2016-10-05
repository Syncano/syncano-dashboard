const loginCommands = {
  login(email, pass) {
    return this
      .waitForElementVisible('@emailInput')
      .setValue('@emailInput', email)
      .setValue('@passInput', pass)
      .waitForElementVisible('@loginButton')
      .click('@loginButton')
      .waitForElementVisible('@instancesHeaderTitle');
  }
};

export default {
  url: 'https://localhost:8080/#/login',
  commands: [loginCommands],
  elements: {
    emailInput: {
      selector: 'input[type=text]'
    },
    passInput: {
      selector: 'input[name=password]'
    },
    loginButton: {
      selector: 'button[type=submit]'
    },
    loginButtonFacebook: {
      selector: 'span.synicon-facebook'
    },
    emailInputFacebook: {
      selector: 'input[name=email]'
    },
    passInputFacebook: {
      selector: 'input[name=pass]'
    },
    signInButtonFacebook: {
      selector: 'input[name=login]'
    },
    loginButtonGoogle: {
      selector: 'span.synicon-google'
    },
    emailInputGoogle: {
      selector: 'input#Email'
    },
    passInputGoogle: {
      selector: 'input#Passwd'
    },
    nextButtonGoogle: {
      selector: 'input#next'
    },
    signInButtonGoogle: {
      selector: 'input#signIn'
    },
    approveAccessButtonGoogle: {
      selector: 'button#submit_approve_access'
    },
    loginButtonGithub: {
      selector: 'span.synicon-github'
    },
    emailInputGithub: {
      selector: 'input#login_field'
    },
    passInputGithub: {
      selector: 'input#password'
    },
    signInButtonGithub: {
      selector: 'input[name=commit]'
    },
    mainDiv: {
      selector: 'div[id=app]'
    },
    instancesDiv: {
      selector: 'div[id=instances]'
    },
    instancesHeaderTitle: {
      selector: '//span[text()="Instances"]',
      locateStrategy: 'xpath'
    },
    socketsHeaderTitle: {
      selector: '//span[text()="Sockets"]',
      locateStrategy: 'xpath'
    }
  }
};
