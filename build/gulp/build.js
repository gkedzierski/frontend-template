module.exports = function (gulp, plugins, config, isProduction) {
    gulp.task('build', ['scss-lint', 'sass', 'js-lint', 'js', 'assets'], function () {
    });
};
