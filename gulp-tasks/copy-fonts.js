var paths = require('./_common')().paths,
    gulp = require('gulp');

module.exports = function() {
  return gulp.src(paths.fonts)
  .pipe(gulp.dest('dist/fonts'));
};

module.exports.dependencies = ['clean'];
