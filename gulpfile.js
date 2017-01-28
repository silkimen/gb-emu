const gulp = require('gulp');
const eslint = require('gulp-eslint');
const babel = require('gulp-babel');
const jasmine = require('gulp-jasmine');

gulp.task('lint', () => gulp
  .src('src/**/*.js')
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError()));

gulp.task('transpile', () => gulp
  .src('src/**/*.js')
  .pipe(babel())
  .pipe(gulp.dest('target/dist')));

gulp.task('test', [ 'transpile' ], () => gulp
  .src([ 'spec/helper.js', 'spec/**/*.spec.js' ])
  .pipe(jasmine()));

gulp.task('build', [ 'lint', 'transpile', 'test' ]);

gulp.task('default', [ 'build' ]);
