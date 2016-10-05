var paths      = require('./_common')().paths,
    gulp       = require('gulp'),
    revReplace = require('gulp-rev-replace');

function replaceJsIfMap(filename) {
  if (filename.indexOf('.map') > -1) {
      return filename.replace('js/', '');
  }
  return filename;
}

module.exports = function() {
  return gulp.src('./dist/**/*')
    .pipe(revReplace({
      manifest: gulp.src(paths.dist + '/rev-manifest.json'),
      modifyUnreved: replaceJsIfMap,
      modifyReved: replaceJsIfMap
    }))
    .pipe(gulp.dest(paths.dist));
};

module.exports.dependencies = ['clean', 'webpack-build', 'clean-unrevisioned', 'revision'];
