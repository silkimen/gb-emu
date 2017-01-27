const gulp = require('gulp');
const babel = require('gulp-babel');
const jasmine = require('gulp-jasmine');

gulp.task('transpile', () => gulp
  .src('src/**/*.js')
  .pipe(babel())
  .pipe(gulp.dest('target/dist')));

gulp.task('test', [ 'transpile' ], () => gulp
  .src([ 'spec/helper.js', 'spec/**/*.spec.js' ])
  .pipe(jasmine()));

gulp.task('default', [ 'transpile' ]);
