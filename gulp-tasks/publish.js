var path       = require('path'),
    ENV        = require('./_common')().ENV,
    gulp       = require('gulp'),
    awspublish = require('gulp-awspublish'),
    cloudfront = require('gulp-cloudfront'),
    through    = require('through2');

module.exports = function() {

  var aws = {
    region: 'us-west-2',
    distributionId: process.env.STAGING_AWS_DISTRIBUTION_ID,
    params: {Bucket: process.env.STAGING_AWS_BUCKET_NAME},
    patternIndex: /^\/index-[a-f0-9]{10}\.html(\.gz)*$/gi
  };

  if (ENV === 'production') {
    aws.params.Bucket  = process.env.PRODUCTION_AWS_BUCKET_NAME;
    aws.distributionId = process.env.PRODUCTION_AWS_DISTRIBUTION_ID;
  }

  if (ENV === 'beta') {
    aws.params.Bucket = process.env.BETA_AWS_BUCKET_NAME;
    aws.region = 'us-east-1';
    delete aws.distributionId;
  }

  var src       = ['./dist/**/*', '!./dist/rev-manifest.json'],
      publisher = awspublish.create(aws);

  return gulp.src(src)
    .pipe(awspublish.gzip())
    .pipe(through.obj(function(file, enc, cb) {
      // Do nothing if no contents
      if (file.isNull()) return cb();

      // streams not supported
      if (file.isStream()) {
        this.emit('error',
          new gutil.PluginError('publish', 'Stream content is not supported'));
        return cb();
      }

      // check if file.contents is a `Buffer`
      if (file.isBuffer()) {
        file.s3.headers['Cache-Control'] = 'max-age=315360000, no-transform, public';

        if (path.basename(file.path).indexOf('index-') === 0) {
          file.s3.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
        }
        cb(null, file);
      }
    }))
    .pipe(publisher.publish())
    .pipe(awspublish.reporter())
    .pipe(cloudfront(aws));
};

module.exports.dependencies = ['clean', 'build', 'revision-index'];