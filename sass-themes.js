const path = require('path');
const through2 = require('through2');

module.exports = function(themesPath, themeNames)
{
  'use strict';

  var placeholder = '.themed.';
  var themeImports = {};

  themeNames.forEach(function(themeName)
  {
    themeImports[themeName] = new Buffer('@import "' + path.join(themesPath, themeName) + '";\n\n');
  });

  return through2.obj(function(file, enc, next)
  {
    var files = this;
    var filename = path.basename(file.path);
    var dirname = path.dirname(file.path);

    if(filename.indexOf(placeholder) > 0)
    {
      themeNames.forEach(function(themeName)
      {
        let themedFile = file.clone();

        themedFile.contents = Buffer.concat([themeImports[themeName], themedFile.contents]);
        themedFile.path = path.join(dirname, filename.replace(placeholder, '.' + themeName + '.'));

        files.push(themedFile);
      });
    }
    else
    {
      files.push(file);
    }

    next();
  });
};