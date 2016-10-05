var path       = require('path'),
    gulp       = require('gulp'),
    gutil      = require('gulp-util'),
    awspublish = require('gulp-awspublish'),
    rename     = require('gulp-rename'),
    through    = require('through2');

module.exports = function() {
  var branch = (process.env.CIRCLE_BRANCH || '').toLowerCase();

  if (!branch || branch.length < 3) {
    throw new gutil.PluginError('publish-branch', '"CIRCLE_BRANCH" env variable is required');
  }

  var aws = {
    region: 'us-west-2',
    distributionId: process.env.STAGING_AWS_DISTRIBUTION_ID,
    params: {Bucket: process.env.STAGING_AWS_BUCKET_NAME}
  };

  var src       = ['./dist/**/*', '!./dist/rev-manifest.json'],
      publisher = awspublish.create(aws);

  return gulp.src(src)
    .pipe(rename(function (file) {
      file.dirname = path.join(branch, file.dirname);
    }))
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
    .pipe(awspublish.reporter());
};

module.exports.dependencies = ['clean', 'build', 'revision-index'];