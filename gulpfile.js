// Require modules
var gulp        = require('gulp');
var plugins     = require('gulp-load-plugins')({ lazy: false });
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var requireDir  = require('require-dir');

// Load tasks from external directory
var tasks = requireDir('./build/gulp');

var config = tasks.config;

// Check environment, allows using --prod for production
var isProduction = plugins.util.env.prod === true;

// Initialize tasks
tasks.browsersync(gulp, config, plugins);
tasks.styles(gulp, plugins, config, isProduction, reload);
tasks.scripts(gulp, plugins, config, isProduction, reload);
tasks.build(gulp, plugins, config, isProduction);
tasks.assets(gulp, plugins, config, isProduction);
tasks.default(gulp, config);
