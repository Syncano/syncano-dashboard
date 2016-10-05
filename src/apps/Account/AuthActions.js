import CreateActions from '../../utils/ActionsConstructor.js';

export default CreateActions({
  resendActivationEmail: {
    asyncResult: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Account.resendActivationEmail'
  },
  activate: {
    asyncResult: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Account.activate'
  },
  passwordSignIn: {
    asyncResult: true,
    asyncForm: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Account.passwordSignIn'
  },
  passwordSignUp: {
    asyncResult: true,
    asyncForm: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Account.passwordSignUp'
  },
  passwordReset: {
    asyncResult: true,
    asyncForm: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Account.passwordReset'
  },
  passwordResetConfirm: {
    asyncResult: true,
    asyncForm: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Account.passwordResetConfirm'
  },
  socialLogin: {
    asyncResult: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Account.socialLogin'
  }
});
