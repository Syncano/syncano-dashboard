var _        = require('lodash'),
    ENV      = require('./_common')().ENV,
    AWS      = require('aws-sdk'),
    moment   = require('moment'),
    gutil    = require('gulp-util'),
    listKeys = require('../s3ListKeys');

module.exports = function(cb) {
  var s3Client = new AWS.S3();
  var params = {bucket: process.env.STAGING_AWS_BUCKET_NAME};
  var pattern = /(.*)-[a-f0-9]{10}.*(\.[a-z0-9]{2,5})$/gi;

  if (ENV === 'production') {
    params.bucket = process.env.PRODUCTION_AWS_BUCKET_NAME;
  }
  
  if (ENV === 'beta') {
    params.bucket = process.env.BETA_AWS_BUCKET_NAME;
  }

  listKeys(s3Client, params, function (err, keys) {
    if (err) throw err;

    // group keys
    var versionedKeys = _.reduce(keys, function(result, key) {
      var matches = pattern.exec(key.Key);
      if (matches) {
        var prefix = matches[1] + matches[2];
        key.timestamp = moment(key.LastModified).unix();
        result[prefix] = result[prefix] || [];
        result[prefix].push(key);
      }
      return result;
    }, {});

    // filter keys
    var keysToDelete = _.reduce(versionedKeys, function(result, keys, prefix) {
      if (keys.length > 3) {
        var toDelete = _.map(_.sortBy(keys, 'timestamp'), 'Key');
        return result.concat(_.map(toDelete.slice(0, toDelete.length-3), function(key) {
          return {Key: key};
        }));
      }
      return result;
    }, []);

    if (keysToDelete.length === 0) {
      return cb();
    }

    s3Client.deleteObjects({
      Bucket: params.bucket,
      Delete: {Objects: keysToDelete}
    }, function(err, data) {
      if (err) throw err;
      _.forEach(data, function(keys, type) {
        _.forEach(keys, function(key) {
          gutil.log(gutil.colors.red('[' + type + ']'), key.Key);
        });
      });
      cb();
    });
  });

};