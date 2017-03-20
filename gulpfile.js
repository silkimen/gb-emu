const babel = require('gulp-babel');
const cio = require('./helper/count-implemented-ops');
const del = require('del');
const eslint = require('gulp-eslint');
const gulp = require('gulp');
const istanbul = require('gulp-istanbul');
const jasmine = require('gulp-jasmine');

const SOURCE = 'src/**/*.js';
const DIST_FOLDER = 'target/dist';
const DIST_FILES = `${DIST_FOLDER}/**/*.js`;
const SPEC = [ 'spec/helper.js', 'spec/**/*.spec.js' ];

gulp.task('clean', () => del(DIST_FOLDER));

gulp.task('lint', () => gulp
  .src([].concat(SOURCE).concat(SPEC))
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError()));

gulp.task('transpile', [ 'clean' ], () => gulp
  .src(SOURCE)
  .pipe(babel())
  .pipe(gulp.dest(DIST_FOLDER)));

gulp.task('pre-test', [ 'transpile' ], () => gulp
  .src(DIST_FILES)
  .pipe(istanbul())
  .pipe(istanbul.hookRequire()));

gulp.task('test', [ 'transpile', 'pre-test' ], () => gulp
  .src(SPEC)
  .pipe(jasmine())
  .pipe(istanbul.writeReports()));

gulp.task('show-implemented-ops', [ 'transpile' ], () => {
  const result = cio(require(`./${DIST_FOLDER}/cpu/operation/operation`).default);

  /* eslint-disable no-console */
  console.log('total count of CPU ops:', result.total);
  console.log('implemented ops:', result.implemented);
  console.log('not implemented ops:', result.pending);
  /* eslint-enable no-console */
});

gulp.task('build', [ 'lint', 'transpile', 'test' ]);

gulp.task('default', [ 'build' ]);
