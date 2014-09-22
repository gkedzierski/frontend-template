// Require modules
var gulp        = require('gulp');
var plugins     = require('gulp-load-plugins')({ lazy: false });
var browserSync = require('browser-sync');
var reload      = browserSync.reload;

// var sass         = require("gulp-ruby-sass");
// var scsslint     = require('gulp-scss-lint');
// var browserify   = require('gulp-browserify');
// var jshint       = require('gulp-jshint');
// var stylish      = require('jshint-stylish');
// var filter       = require('gulp-filter');
// var cache        = require('gulp-cached');
// var copy         = require('gulp-copy');
// var autoprefixer = require('gulp-autoprefixer');
// var minifyCSS    = require('gulp-minify-css');

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
        proxy : 'frontend-template.vm.com',
        open  : false
    });
});

// Compile SASS into single CSS file
gulp.task('sass', function () {
    return gulp.src(config.paths.src.sass + '/main.scss')
        .pipe(plugins.rubySass())
        .pipe(plugins.autoprefixer({
            browsers : ['> 1%', 'last 3 versions'],
            cascade  : false
        }))
        .pipe(plugins.minifyCss())
        .pipe(gulp.dest(config.paths.dist.css))
        .pipe(plugins.filter('**/*.css'))
        .pipe(reload({
            stream: true
        }));
});

// Lint SCSS
gulp.task('scss-lint', function() {
    return gulp.src(config.paths.src.sass + '/**/*.scss')
        .pipe(plugins.scssLint({
            config: 'scss-lint.yml'
        }))
        .pipe(plugins.scssLint.failReporter());
});

// Lint SCSS (watch)
gulp.task('watch-scss-lint', function() {
    return gulp.src(config.paths.src.sass + '/**/*.scss')
        .pipe(plugins.cache('scsslint'))
        .pipe(plugins.scssLint({
            config: 'scss-lint.yml'
        }))
        .pipe(plugins.scssLint.failReporter());
});

// Compile JS
gulp.task('js', function() {
    gulp.src(config.paths.src.js + '/app.js')
        .pipe(plugins.browserify({
            insertGlobals : true,
            debug         : true
        }))
        .pipe(gulp.dest(config.paths.dist.js));
});

// Lint JS
gulp.task('js-lint', function () {
    return gulp.src(config.paths.src.js + '/**/*.js')
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter(plugins.stylish))
        .pipe(plugins.jshint.reporter('fail'));
});

// Lint JS (watch)
gulp.task('watch-js-lint', function () {
    return gulp.src(config.paths.src.js + '/**/*.js')
        .pipe(plugins.cache('jshint'))
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter(stylish))
        .pipe(plugins.jshint.reporter('fail'));
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
