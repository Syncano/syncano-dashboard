require('gulp-task-loader')();

var gulp         = require('gulp'),
    gulpSequence = require('gulp-sequence');

gulp.task('copy', ['copy-index', 'copy-images', 'copy-css', 'copy-fonts', 'copy-js']);
gulp.task('serve', ['webpack-dev-server']);
gulp.task('build', ['webpack-build', 'revreplace']);
gulp.task('default', ['webpack-dev-server']);
gulp.task('deployment-master', gulpSequence('publish', 'clean'));
gulp.task('deployment-beta', gulpSequence('publish', 'clean'));
gulp.task('deployment-devel', gulpSequence('publish', 'clean'));
gulp.task('deployment-branch', gulpSequence('publish-branch', 'clean'));
