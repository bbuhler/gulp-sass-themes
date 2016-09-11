# gulp-sass-themes

A plugin for [Gulp](https://github.com/gulpjs/gulp) as extension of [gulp-sass](https://github.com/dlmanning/gulp-sass).

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

const gulp = require('gulp');
const sass = require('gulp-sass');
const sassThemes = require('gulp-sass-themes');

gulp.task('styles', () => gulp.src('./styles/**/*.scss')
  .pipe(sassThemes('./styles/themes/_*.scss'))
  .pipe(sass()).on('error', sass.logError)
  .pipe(gulp.dest('./dist/styles'))
);
```

Output
```
├── dist
    └── styles
        ├── body.red.css
        └── body.blue.css
```

## Parameters

### themes
Type: `String | Array<String>`

Glob pattern to theme files.

### options

#### cwd
Type: `String`

Current working directory for glob pattern.

#### placeholder
Type: `RegExp`

Regular expression to match and replace placeholder in file. The first parentheses-captured matched result will be replaced with the theme name.

Default is `/^.+\.(themed)\.(scss|sass)$/`.
