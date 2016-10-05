var paths        = require('./_common')().paths,
    gulp         = require('gulp'),
    rev          = require('gulp-rev'),
    revOverride  = require('gulp-rev-css-url');

module.exports = function() {
  return gulp.src([
      './dist/**/*',
      '!./dist/index.html'
    ])
    .pipe(rev())
    .pipe(revOverride())
    .pipe(gulp.dest(paths.dist))
    .pipe(rev.manifest())
    .pipe(gulp.dest(paths.dist));
};

module.exports.dependencies = ['clean', 'webpack-build', 'strip-debug'];
