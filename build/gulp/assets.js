var pngcrush = require('imagemin-pngcrush');

module.exports = function (gulp, plugins, config, isProduction) {
    gulp.task('spritesheet', [], function () {

    });

    gulp.task('assets', ['spritesheet'], function () {
        return gulp.src(config.paths.images.src + '**/*.{png,jpg,jpeg,gif}')
            .pipe(isProduction ? plugins.imagemin({
                progressive : true,
                use         : [pngcrush()]
            }) : plugins.util.noop())
            .pipe(gulp.dest(config.paths.images.dist));
    });
};
