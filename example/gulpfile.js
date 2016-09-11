'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const sassThemes = require('../sass-themes');

gulp.task('styles', () => gulp.src('./src/styles/**/*.scss')
  .pipe(sassThemes('themes/_*.scss', { cwd: './src/styles' }))
  .pipe(sass()).on('error', sass.logError)
  .pipe(gulp.dest('./dist/styles'))
);