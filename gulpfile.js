const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const reload      = browserSync.reload;
const pug         = require('gulp-pug');
const clean       = require('gulp-clean');
const stylus      = require('gulp-stylus');

// Static server
gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });

  gulp.watch("app/pages/*.pug", ['pug']);
  gulp.watch("app/stylus/**/*.styl", ['stylus']);
  gulp.watch("dist/*.html").on('change', reload);
});

gulp.task('pug', function() {
  return gulp.src('app/pages/*.pug')
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest('./dist'));
});

gulp.task('stylus', function () {
  return gulp.src('./app/stylus/style.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('clean', function() {
  return gulp.src('./dist')
    .pipe(clean());
});

gulp.task('default', ['pug', 'stylus', 'serve']);
