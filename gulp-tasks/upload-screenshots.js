var async      = require('async'),
    gutil      = require('gulp-util'),
    google     = require('googleapis'),
    googleAuth = require('google-auth-library'),
    version    = 'v' + require('../package.json').version,
    fs         = require('fs'),
    path       = require('path'),
    _          = require('lodash');


function getOrCreateFolder(options, callback) {
  var q = "fullText contains '" + options.title + "' and '" + options.parentId + "' in parents and trashed = false";

  async.waterfall([
    function(cb) {
      // Try to get folder
      options.drive.files.list({q: q}, function(error, response) {
        if (error) {
          cb(error);
        } else if (response.items.length === 0) {
          gutil.log(gutil.colors.blue(options.title), 'Folder does not exist');
          cb(null, null);
        } else {
          gutil.log(gutil.colors.blue(options.title), 'Folder already exist');
          cb(null, response.items[0]);
        }
      });
    },
    function(folder, cb) {
      // Try to create folder
      if (folder !== null) return cb(null, folder);
      options.drive.files.insert({
        resource: {
          title: options.title,
          mimeType: 'application/vnd.google-apps.folder',
          parents: [{id: options.parentId}]
        }
      }, function(error, folder) {
        if (error) return cb(error);
        gutil.log(gutil.colors.blue(options.title), 'Folder created');
        cb(null, folder);
      });
    }
  ], callback);
};


function getOrCreateManyFolders(folders, cb) {
  async.mapSeries(folders, getOrCreateFolder, function(err, result) {
    if (err) return cb(err);
    cb(null, result);
  });
}


function updateOrCreateFile(options, callback) {
  var q = "fullText contains '" + options.title + "' and '" + options.parentId + "' in parents and trashed = false";

  async.waterfall([
    function(cb) {
      // Try to get file
      options.drive.files.list({q: q}, function(err, response) {
        if (err) {
          cb(err);
        } else if (response.items.length === 0) {
          gutil.log(gutil.colors.blue(options.title), 'File does not exist');
          cb(null, options, null);
        } else {
          gutil.log(gutil.colors.blue(options.title), 'File already exist');
          cb(null, options, response.items[0]);
        }
      });
    },
    function(options, file, cb) {
      // File exists nothing to do
      if (file !== null) return cb(null, options, file);

      options.drive.files.insert({
        resource: {
          title: options.title,
          mimeType: 'image/png',
          parents: [{id: options.parentId}]
        },
        media: {
          mimeType: 'image/png',
          body: fs.createReadStream(options.path)
        }
      }, function(err, file) {
        if (err) return cb(err);
        gutil.log(gutil.colors.blue(options.title), 'File created');
        file._created = true;
        cb(null, options, file);
      });
    },
    function(options, file, cb) {
      // File was just created nothing to do
      if (file._created === true) return cb(null, file);

      options.drive.files.update({
        fileId: file.id,
        media: {
          mimeType: 'image/png',
          body: fs.readFileSync(options.path)
        }
      }, function(err, file) {
        if (err) return cb(err);
        gutil.log(gutil.colors.blue(options.title), 'File updated');
        file._created = true;
        cb(null, file);
      });

    }
  ], callback);
};

function updateOrCreateManyFiles(files, cb) {
  async.mapSeries(files, updateOrCreateFile, function(err, result) {
    if (err) return cb(err);
    cb(null, result);
  });
}


module.exports = function(done) {
  var invisionFolder = '0B-nLxpmereQIfkV2X1gxQkNtbXlwbHlCZE1RYlpoMFY1OGlaM1ppUkMybnU5bFllRENVZzg';
  var credentials = {
    clientId: process.env.GD_CLIENT_ID,
    clientSecret: process.env.GD_CLIENT_SECRET,
    access_token: process.env.GD_ACCESS_TOKEN,
    refresh_token: process.env.GD_REFRESH_TOKEN
  };

  if (!credentials.clientId) {
    throw new gutil.PluginError('upload-screenshots', '"GD_CLIENT_ID" env variable is required');
  }

  if (!credentials.clientSecret) {
    throw new gutil.PluginError('upload-screenshots', '"GD_CLIENT_SECRET" env variable is required');
  }

  if (!credentials.access_token) {
    throw new gutil.PluginError('upload-screenshots', '"GD_ACCESS_TOKEN" env variable is required');
  }

  if (!credentials.refresh_token) {
    throw new gutil.PluginError('upload-screenshots', '"GD_REFRESH_TOKEN" env variable is required');
  }

  // New google client
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(credentials.clientId, credentials.clientSecret, "urn:ietf:wg:oauth:2.0:oob");
  oauth2Client.setCredentials({
    access_token: credentials.access_token,
    refresh_token: credentials.refresh_token,
    token_type: 'Bearer',
    expiry_date: 1440513379139
  });
  var drive = google.drive({version: 'v2', auth: oauth2Client});

  // Grab local files
  var screenshots = path.resolve(__dirname, '../reports/screenshots/_navigation/');
  var resolutions = fs.readdirSync(screenshots).filter(function(file) {
    return fs.statSync(path.join(screenshots, file)).isDirectory();
  });
  var localFiles = _.reduce(resolutions, function(result, resolution) {
    var folder = path.join(screenshots, resolution);
    var files = fs.readdirSync(folder).filter(function(file) {
      return fs.statSync(path.join(folder, file)).isFile();
    });

    result[resolution] = _.map(files, function(file) {
      return {
        'title': file,
        'path': path.join(folder, file)
      }
    });
    return result;
  }, {});

  // Get or create main folders (latest, version)
  function getOrCreateMainFolders(cb) {
    gutil.log(gutil.colors.green.bold('Creating main folders...'));

    getOrCreateManyFolders([
      {drive: drive, title: 'latest', parentId: invisionFolder},
      {drive: drive, title: version, parentId: invisionFolder},
    ], cb);
  }

  // Get or create resolution folders for each main folder
  function getOrCreateResolutionFolders(mainFolders, cb) {
    gutil.log(gutil.colors.green.bold('Creating resolution folders...'));

    var resolutionFolders = _.reduce(mainFolders, function(result, folder) {
      _.forEach(resolutions, function(resolution) {
        result.push({
          drive: drive,
          title: resolution,
          parentId: folder.id
        });
      });
      return result;
    }, []);

    getOrCreateManyFolders(resolutionFolders, cb);
  }

  function updateOrCreateScreenshots(resolutionFolders, cb) {
    gutil.log(gutil.colors.green.bold('Creating screenshots files...'));

    var screenshots = _.reduce(resolutionFolders, function(result, folder) {
      _.forEach(localFiles[folder.title], function(file) {
        result.push({
          drive: drive,
          title: file.title,
          path: file.path,
          parentId: folder.id
        });
      });

      return result;
    }, []);

    updateOrCreateManyFiles(screenshots, cb);
  }

  async.waterfall([
    getOrCreateMainFolders,
    getOrCreateResolutionFolders,
    updateOrCreateScreenshots
  ], function(error, result) {
    if(error) throw error;
    done();
  });
};
