// Require modules
var gulp        = require('gulp');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var sass        = require("gulp-ruby-sass");
var scsslint    = require('gulp-scss-lint');
var browserify  = require('gulp-browserify');
var jshint      = require('gulp-jshint');
var stylish     = require('jshint-stylish');
var filter      = require('gulp-filter');
var cache       = require('gulp-cached');
var copy        = require('gulp-copy');

// Configuration
var config = {
    paths: {
        src: {
            sass : './public/src/sass',
            js   : './public/src/js',
        },
        dist: {
            css : './public/assets/css',
            js  : './public/assets/js',
        },
    },
};

// Create a browser sync server
gulp.task('browser-sync', function() {
    browserSync({
        proxy: 'frontend-template.vm.com'
    });
});

// Compile SASS into single CSS file
gulp.task('sass', function () {
    return gulp.src(config.paths.src.sass + '/main.scss')
        .pipe(sass())
        .pipe(gulp.dest(config.paths.dist.css))
        .pipe(filter('**/*.css'))
        .pipe(reload({
            stream: true
        }));
});

// Lint SCSS
gulp.task('scss-lint', function() {
    return gulp.src(config.paths.src.sass + '/**/*.scss')
        .pipe(scsslint({
            config: 'scss-lint.yml'
        }))
        .pipe(scsslint.failReporter());
});

// Lint SCSS (watch)
gulp.task('watch-scss-lint', function() {
    return gulp.src(config.paths.src.sass + '/**/*.scss')
        .pipe(cache('scsslint'))
        .pipe(scsslint({
            config: 'scss-lint.yml'
        }))
        .pipe(scsslint.failReporter());
});

// Compile JS
gulp.task('js', function() {
    gulp.src(config.paths.src.js + '/app.js')
        .pipe(browserify({
            insertGlobals : true,
            debug         : true
        }))
        .pipe(gulp.dest(config.paths.dist.js));
});

// Lint JS
gulp.task('js-lint', function () {
    return gulp.src(config.paths.src.js + '/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(jshint.reporter('fail'));
});

// Lint JS (watch)
gulp.task('watch-js-lint', function () {
    return gulp.src(config.paths.src.js + '/**/*.js')
        .pipe(cache('jshint'))
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(jshint.reporter('fail'));
});

gulp.task('vendor', function () {
    gulp.src('./bower_components/normalize-css/normalize.css')
        .pipe(gulp.dest(config.paths.dist.css));
});

// Reload all Browsers
gulp.task('bs-reload', function () {
    browserSync.reload();
});

// Default task, build project and watch
gulp.task('default', ['vendor', 'scss-lint', 'sass', 'js-lint', 'js', 'browser-sync'], function () {
    gulp.watch(config.paths.src.sass + '/**/*.scss', ['watch-scss-lint', 'sass']);
    gulp.watch(config.paths.src.js + '/**/*.js', ['watch-js-lint', 'js', 'bs-reload']);
    gulp.watch('**/*.{htm,html,php}', ['bs-reload']);
});
