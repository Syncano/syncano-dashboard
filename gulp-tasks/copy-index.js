var paths = require('./_common')().paths,
    gulp  = require('gulp');

module.exports = function() {
  return gulp.src(paths.index)
  .pipe(gulp.dest(paths.dist));
};

module.exports.dependencies = ['clean'];
