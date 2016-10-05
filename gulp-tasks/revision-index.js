var paths = require('./_common')().paths,
    gulp  = require('gulp'),
    rev   = require('gulp-rev');

module.exports = function(cb) {
  return gulp.src('./dist/index.html')
    .pipe(rev())
    .pipe(gulp.dest(paths.dist))
    .pipe(rev.manifest())
    .pipe(gulp.dest(paths.dist));
};

module.exports.dependencies = ['clean', 'clean-unrevisioned', 'revreplace'];
