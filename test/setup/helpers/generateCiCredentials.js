const generateCiCredentials = () => {
  const ciBaseEmail = process.env.CI_BASE_EMAIL;
  const ciPassword = Date.now();
  const splittedEmail = {};

  [splittedEmail.emailName, splittedEmail.emailDomain] = ciBaseEmail.split('@');

  const credentials = {
    email: `${splittedEmail.emailName}+${ciPassword}@${splittedEmail.emailDomain}`,
    password: ciPassword
  };

  return credentials;
};

export default generateCiCredentials;
