var ENV    = process.env.NODE_ENV || 'development',
    config = require('./' + ENV);

module.exports = config;
