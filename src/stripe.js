var Stripe = require('stripejs');

if (APP_CONFIG.STRIPE_PUBLISHABLE_KEY) {
  Stripe.setPublishableKey(APP_CONFIG.STRIPE_PUBLISHABLE_KEY);
}

module.exports = Stripe;
