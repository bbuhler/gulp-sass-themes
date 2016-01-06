var path = require('path');
var through2 = require('through2');
var File = require('vinyl');

module.exports= function(themesPath, themeNames)
{
  'use strict';

  return through2.obj(function(file, enc, next)
  {
    var files = this;
    var filename = path.basename(file.path);
    var placeholder = '.themed.';

    //FIXME: #1 do only for changed files

    if(filename.indexOf(placeholder) > 0)
    {
      var base = path.dirname(file.path);
      var content = file.contents.toString('utf8');

      themeNames.forEach(function(themeName)
      {
        files.push(new File
        ({
          base: file.base,
          path: path.join(base, filename.replace(placeholder, '.' + themeName + '.')),
          contents: new Buffer('@import "' + path.join(themesPath, themeName) + '";\n\n' + content)
        }));
      });
    }
    else
    {
      files.push(file);
    }

    next();
  });
};