var es = require('event-stream');

module.exports = function (gulp, plugins, config, isProduction, reload) {
    // Lint SCSS files
    gulp.task('scss-lint', function() {
        return gulp.src(config.paths.styles.src + '**/*.scss')
            .pipe(plugins.scssLint({
                config: 'scss-lint.yml'
            }))
            .pipe(plugins.scssLint.failReporter());
    });

    // Lint SCSS (watch)
    gulp.task('watch-scss-lint', function() {
        return gulp.src(config.paths.styles.src + '**/*.scss')
            .pipe(plugins.cached('scsslint'))
            .pipe(plugins.scssLint({
                config: 'scss-lint.yml'
            }))
            .pipe(plugins.scssLint.failReporter());
    });

    // Compile SASS into single CSS file
    gulp.task('sass', function () {
        var vendorFiles = gulp.src(config.vendorFiles.styles)
            .pipe(gulp.dest(config.paths.styles.dist));

        return gulp.src(config.paths.styles.src + 'main.scss')
            .pipe(plugins.rubySass({
                style       : isProduction ? 'compressed' : 'expanded',
                lineNumbers : !isProduction,
                loadPath    : ['./bower_components/'],
            }))
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.autoprefixer({
                browsers : ['> 1%', 'last 3 versions'],
                cascade  : false
            }))
            .pipe(isProduction ? plugins.minifyCss() : plugins.util.noop())
            .pipe(isProduction ? plugins.filter('**/*.css') : plugins.util.noop())
            .pipe(plugins.sourcemaps.write())
            .pipe(gulp.dest(config.paths.styles.dist))
            .pipe(plugins.filter('**/*.css'))
            .pipe(reload({
                stream: true
            }));
    });
};
