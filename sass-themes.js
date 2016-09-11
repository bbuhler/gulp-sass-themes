const path = require('path');
const through2 = require('through2');
const slash = require('slash');
const globby = require('globby');

const defaultOptions = {
  placeholder: /^.+\.(themed)\.(scss|sass)$/,
  cwd: process.cwd(),
  ext: '.scss'
};

/**
 * @param {String|Array<String>} themes Glob pattern to theme files.
 * @param {Object=} options Options
 *
 * @param {String=} options.cwd Current working directory for glob pattern.
 * @param {String=} options.ext Theme file extension `.scss` or `.sass`.
 * @param {RegExp=} options.placeholder Regular expression to match and replace placeholder in file.
 * The first parentheses-captured matched result will be replaced with the theme name.
 *
 * @returns {Stream}
 */
module.exports = function(themes, options)
{
  'use strict';

  let settings = Object.assign({}, defaultOptions, options);
  let themeImports = {};

  globby.sync(themes, { cwd: settings.cwd }).forEach( themePath =>
  {
    let themeName = path.basename(themePath, settings.ext).replace(/_(.+)/, '$1');

    themeImports[themeName] = new Buffer(`$current-theme-name: "${themeName}";\n@import "${slash(themePath)}";\n\n`);
  });

  return through2.obj(function(file, enc, next)
  {
    let files = this;
    let filename = path.basename(file.path);
    let dirname = path.dirname(file.path);

    if(settings.placeholder.test(filename))
    {
      Object.keys(themeImports).forEach( themeName =>
      {
        let themedFile = file.clone();

        themedFile.contents = Buffer.concat([themeImports[themeName], themedFile.contents]);
        themedFile.path = path.join(dirname, filename.replace(filename.match(settings.placeholder)[1], themeName));

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