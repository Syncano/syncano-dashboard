var Stripe = require('stripejs');

if (STRIPE_PUBLISHABLE_KEY !== undefined && STRIPE_PUBLISHABLE_KEY.length > 0) {
  Stripe.setPublishableKey(STRIPE_PUBLISHABLE_KEY);
}

module.exports = Stripe;
