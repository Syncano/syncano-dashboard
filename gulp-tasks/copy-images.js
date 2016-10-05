var paths = require('./_common')().paths,
    gulp = require('gulp');

module.exports = function() {
  return gulp.src(paths.images)
  .pipe(gulp.dest('dist/img'));
};

module.exports.dependencies = ['clean'];
