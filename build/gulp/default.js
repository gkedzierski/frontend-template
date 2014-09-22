module.exports = function (gulp, config) {
    gulp.task('default', ['scss-lint', 'sass', 'js-lint', 'js', 'browser-sync'], function () {
        gulp.watch(config.paths.styles.src + '/**/*.scss', ['watch-scss-lint', 'sass']);
        gulp.watch(config.paths.scripts.src + '/**/*.js', ['watch-js-lint', 'js', 'bs-reload']);
        gulp.watch('**/*.{htm,html,php}', ['bs-reload']);
    });
};
