const path = require('path');
const through2 = require('through2');
const slash = require('slash');

module.exports = function(themesPath, themeNames)
{
  'use strict';

  let placeholder = '.themed.';
  let themeImports = {};

  themeNames.forEach( themeName =>
  {
    themeImports[themeName] = new Buffer(`$current-theme-name: "${themeName}"; @import "${slash(path.join(themesPath, themeName))}"; `);
  });

  return through2.obj(function(file, enc, next)
  {
    let files = this;
    let filename = path.basename(file.path);
    let dirname = path.dirname(file.path);

    if(filename.includes(placeholder))
    {
      themeNames.forEach( themeName =>
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