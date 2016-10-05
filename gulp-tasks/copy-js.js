var paths = require('./_common')().paths,
    gulp = require('gulp');

module.exports = function() {
  return gulp.src(paths.js)
  .pipe(gulp.dest('dist/js'));
};

module.exports.dependencies = ['clean'];
