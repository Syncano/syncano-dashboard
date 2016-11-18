var stripDebug = require('gulp-strip-debug'),
    gulp       = require('gulp');

module.exports = function() {
  gulp.src('./dist/js/app.js')
    .pipe(stripDebug())
    .pipe(gulp.dest('./dist/js'));
};

module.exports.dependencies = ['clean', 'webpack-build'];
