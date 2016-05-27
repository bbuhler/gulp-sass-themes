'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const sassThemes = require('../sass-themes');

gulp.task('styles', () => gulp.src('./src/styles/**/*.scss')
  .pipe(sassThemes('./src/styles/themes', ['red','blue']))
  .pipe(sass()).on('error', sass.logError)
  .pipe(gulp.dest('./dist/styles'))
);