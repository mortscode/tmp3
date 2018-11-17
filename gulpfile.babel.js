import autoprefixer from 'gulp-autoprefixer';
import browserify from 'gulp-browserify';
import clean from 'gulp-clean';
import livereload from 'gulp-livereload';
import gulp from 'gulp';
import minify from 'gulp-babel-minify';
import path from 'path';
import rev from 'gulp-rev';
import runSequence from 'run-sequence';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import svgmin from 'gulp-svgmin';
import svgstore from 'gulp-svgstore';

const SOURCE = {
  HTML: 'craft/templates/**/*.html',
  JS: '_src/js/*.js',
  SCSS: '_src/styles/*.scss',
  SVG: '_src/svg/*.svg',
};

const DEST = {
  ASSETS: 'public/assets',
  RESOURCES: 'public/assets/resources',
  SVG: 'public/assets/svg',
};

const WATCH = {
  HTML: 'craft/templates/**/*.html',
  JS: '_src/js/**/*.js',
  SCSS: '_src/styles/**/*.scss',
  SVG: '_src/svg/*.svg',
};

// TASKS *************

// HTML
gulp.task('html', () => {
  return gulp.src(SOURCE.HTML).pipe(livereload());
});

// SCRIPTS
gulp.task('scripts', () => {
  return gulp
    .src(SOURCE.JS)
    .pipe(sourcemaps.init())
    .pipe(
      browserify({
        transform: ['babelify'],
      }),
    )
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(DEST.RESOURCES))
    .pipe(livereload());
});

// SCRIPTS-MINIFIED
gulp.task('scripts-min', () => {
  return gulp
    .src(SOURCE.JS)
    .pipe(
      browserify({
        transform: ['babelify'],
      }),
    )
    .pipe(
      minify({
        mangle: {
          keepClassName: true,
        },
      }),
    )
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(DEST.RESOURCES));
});

// STYLES
gulp.task('styles', () => {
  return gulp
    .src(SOURCE.SCSS)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(
      autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false,
      }),
    )
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(DEST.RESOURCES))
    .pipe(livereload());
});

// STYLES-MINIFIED
gulp.task('styles-min', () => {
  return gulp
    .src(SOURCE.SCSS)
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(
      autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false,
      }),
    )
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(DEST.RESOURCES));
});

// SVG's
gulp.task('svgstore', () => {
  return gulp
    .src(SOURCE.SVG)
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
    .pipe(gulp.dest(DEST.SVG));
});

// CACHE BUSTING
gulp.task('rev-revise', () =>
  gulp
    .src([`${DEST.RESOURCES}/main.css`, `${DEST.RESOURCES}/main.js`])
    .pipe(rev())
    .pipe(gulp.dest(DEST.RESOURCES))
    .pipe(rev.manifest({path: 'rev-manifest.json'}))
    .pipe(gulp.dest(DEST.ASSETS)),
);

gulp.task('remove-revs', function() {
  return gulp.src('public/assets/resources', {read: false}).pipe(clean());
});

gulp.task('remove-mainifest', function() {
  return gulp
    .src('public/assets/rev-manifest.json', {force: true})
    .pipe(clean());
});

// Watch Files For Changes & Reload
// Uncomment proxy and change to dev site local url
gulp.task(
  'default',
  ['remove-revs', 'remove-mainifest', 'html', 'scripts', 'styles', 'svgstore'],
  () => {
    livereload.listen({
      start: true,
    });
    gulp.watch(WATCH.HTML, ['html']);
    gulp.watch(WATCH.JS, ['scripts']);
    gulp.watch(WATCH.SCSS, ['styles']);
    gulp.watch(WATCH.SVG, ['svgstore']);
  },
);

// Watch Files For Changes & Reload
// Uncomment proxy and change to dev site local url
gulp.task('build', callback => {
  runSequence(
    'remove-revs',
    ['scripts-min', 'styles-min', 'svgstore'],
    'rev-revise',
    callback,
  );
});
