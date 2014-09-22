var browserSync = require('browser-sync');

module.exports = function (gulp, config, plugins) {
    // Initialize Browser Sync
    gulp.task('browser-sync', function () {
        browserSync({
            proxy : config.app.domain,
            open  : false
        });
    });

    // Reload all Browsers
    gulp.task('bs-reload', function () {
        browserSync.reload();
    });
};
