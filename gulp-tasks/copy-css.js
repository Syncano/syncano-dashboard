var paths = require('./_common')().paths,
    gulp  = require('gulp');

module.exports = function() {
  return gulp.src(paths.css)
  .pipe(gulp.dest('dist/css'));
};

module.exports.dependencies = ['clean'];
