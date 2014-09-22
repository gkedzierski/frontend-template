module.exports = function (gulp, plugins, config, isProduction, reload) {
    // Lint JS
    gulp.task('js-lint', function () {
        return gulp.src(config.paths.scripts.src + '/**/*.js')
            .pipe(plugins.jshint())
            .pipe(plugins.jshint.reporter(plugins.stylish))
            .pipe(plugins.jshint.reporter('fail'));
    });

    // Lint JS (watch)
    gulp.task('watch-js-lint', function () {
        return gulp.src(config.paths.scripts.src + '/**/*.js')
            .pipe(plugins.cached('jshint'))
            .pipe(plugins.jshint())
            .pipe(plugins.jshint.reporter(stylish))
            .pipe(plugins.jshint.reporter('fail'));
    });

    // Compile JS
    gulp.task('js', function() {
        gulp.src(config.paths.scripts.src + '/app.js')
            .pipe(plugins.browserify({
                insertGlobals : true,
                debug         : !isProduction
            }))
            .pipe(gulp.dest(config.paths.scripts.dist));
    });
};
