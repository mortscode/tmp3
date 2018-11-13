import autoprefixer from 'gulp-autoprefixer';
import babili from 'gulp-babili';
import browserify from 'gulp-browserify';
import browserSync from 'browser-sync';
import livereload from 'gulp-livereload';
import gulp from 'gulp';
import path from 'path';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import svgmin from 'gulp-svgmin';
import svgstore from 'gulp-svgstore';
import uglify from 'gulp-uglify';

// TASKS *************

// HTML
gulp.task('html', () => {
  return gulp
    .src('craft/templates/**/*.html')
    .pipe(browserSync.stream())
    .pipe(livereload());
});

// SCRIPTS
gulp.task('scripts', () => {
  return gulp
    .src('_src/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(
      browserify({
        transform: ['babelify'],
      }),
    )
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/assets/js'))
    .pipe(browserSync.stream())
    .pipe(livereload());
});

// SCRIPTS-MINIFIED
gulp.task('scripts-min', () => {
  return gulp
    .src('_src/js/*.js')
    .pipe(
      browserify({
        transform: ['babelify'],
      }),
    )
    .pipe(
      babili({
        mangle: {
          keepClassName: true,
        },
      }),
    )
    .pipe(gulp.dest('public/assets/js'));
});

// STYLES
gulp.task('styles', () => {
  return gulp
    .src('_src/styles/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(
      autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false,
      }),
    )
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/assets/styles'))
    .pipe(browserSync.stream())
    .pipe(livereload());
});

// STYLES-MINIFIED
gulp.task('styles-min', () => {
  return gulp
    .src('_src/styles/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(
      autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false,
      }),
    )
    .pipe(gulp.dest('public/assets/styles'));
});

gulp.task('svgstore', () => {
  return gulp
    .src('_src/svg/**/*.svg')
    .pipe(
      svgmin(file => {
        const prefix = path.basename(
          file.relative,
          path.extname(file.relative),
        );
        return {
          plugins: [
            {
              cleanupIDs: {
                prefix: prefix + '-',
                minify: true,
              },
            },
          ],
        };
      }),
    )
    .pipe(svgstore())
    .pipe(gulp.dest('public/assets/img/svg'));
});

// Watch Files For Changes & Reload
// Uncomment proxy and change to dev site local url
gulp.task('default', ['html', 'scripts', 'styles', 'svgstore'], () => {
  livereload.listen({
    start: true,
  });
  gulp.watch('craft/templates/**/*.html', ['html']);
  gulp.watch('_src/js/**/*.js', ['scripts']);
  gulp.watch('_src/styles/**/*.scss', ['styles']);
  gulp.watch('_src/svg/**/*.svg', ['svgstore']);
});

gulp.task('sync', ['html', 'scripts', 'styles', 'svgstore'], () => {
  browserSync.init({
    proxy: 'http://tmp3.craft.dev',
    port: 3000,
  });
  gulp.watch(['craft/templates/**/*.html'], browserSync.reload);
  gulp.watch(['_src/js/**/*.js'], ['scripts'], browserSync.reload);
  gulp.watch(['_src/styles/**/*.scss'], ['styles'], browserSync.reload);
  gulp.watch(['_src/svg/**/*.svg'], ['svgstore'], browserSync.reload);
});

// Watch Files For Changes & Reload
// Uncomment proxy and change to dev site local url
gulp.task('build', ['scripts-min', 'styles-min', 'svgstore'], () => {});
