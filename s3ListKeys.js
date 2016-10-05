var _ = require('lodash');

function listKeys(client, options, callback) {
  var keys = [];

  function listKeysRecusively(marker) {
    options.marker = marker;

    listKeyPage(
      client,
      options,
      function (error, nextMarker, keyset) {
        if (error) {
          return callback(error, keys);
        }

        keys = keys.concat(keyset);

        if (nextMarker) {
          listKeysRecusively(nextMarker);
        } else {
          callback(null, keys);
        }
      }
    );
  }

  listKeysRecusively();
}

function listKeyPage(client, options, callback) {
  var params = {
    Bucket : options.bucket,
    Delimiter: options.delimiter,
    Marker : options.marker,
    MaxKeys : options.maxKeys || 1000,
    Prefix : options.prefix
  };

  client.listObjects(params, function (error, response) {
    if (error) {
      return callback(error);
    } else if (response.err) {
      return callback(new Error(response.err));
    }

    var keys;
    if (options.delimiter) {
      keys = _.map(response.CommonPrefixes, function (item) {
        return item.Prefix;
      });
    } else {
      keys = _.map(response.Contents, function (item) {
        return item;
      });
    }

    var nextMarker;
    if (response.IsTruncated) {
      if (options.delimiter) {
        // If specifying a delimiter, the response.NextMarker field exists.
        nextMarker = response.NextMarker;
      } else {
        // For normal listing, there is no response.NextMarker
        // and we must use the last key instead.
        nextMarker = keys[keys.length - 1].Key;
      }
    }

    callback(null, nextMarker, keys);
  });
}

module.exports = listKeys;
