# gulp-sass-themes

A plugin for [Gulp](https://github.com/gulpjs/gulp) as extention of [gulp-sass](https://github.com/dlmanning/gulp-sass).

## Install

```
npm install gulp-sass-themes gulp-sass --save-dev
```

## Basic Usage

Source files
```
├── styles
    ├── body.themed.scss
    └── themes
        ├── _red.scss
        └── _blue.scss
```

Gulpfile
```javascript
'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sassThemes = require('gulp-sass-themes');

gulp.task('styles', function () {
  return gulp.src('./styles/**/*.scss')
    .pipe(sassThemes('./styles/themes', ['red','blue']))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/styles'));
});
```

Output
```
├── dist
    └── styles
        ├── body.red.css
        └── body.blue.css
```

## Options

### themePath
Type: `String`

### themeNames
Type: `Array` of `Strings`
