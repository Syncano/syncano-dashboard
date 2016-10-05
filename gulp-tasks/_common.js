var version      = require('../package.json').version,
    versionTypes = version.split('.', 3);

// Small hack for gulp-task-loader
module.exports = function() {
  return {
    ENV: process.env.NODE_ENV || 'development',
    paths: {
      dist: './dist',
      bin: './bin',
      assets: './src/assets',
      index: './src/assets/index.html',
      images: './src/assets/img/**/*',
      css: './src/assets/css/**/*',
      js: './src/assets/js/**/*',
      fonts: './src/assets/fonts/**/*'
    },
    fontName: 'Syncano-Icons',
    version: {
      major: versionTypes[0],
      minor: versionTypes[1],
      patch: versionTypes[2],
      raw: version,
      text: 'v' + version
    }
  }
};
