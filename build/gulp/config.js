// Set up base paths
var basePaths = {
    app  : './app/',
    src  : './public/src/',
    dist : './public/assets/',
};

// Set up paths
var paths = {
    images: {
        src  : basePaths.src + 'img/',
        dist : basePaths.dist + 'img/',
    },

    scripts: {
        src  : basePaths.src + 'js/',
        dist : basePaths.dist + 'js/',
    },

    styles: {
        src  : basePaths.src + 'sass/',
        dist : basePaths.dist + 'css/',
    },
};

// App configuration
var app = {
    domain: 'frontend-template.vm.com',
};

// Vendor files
var vendorFiles = {
    styles: './bower_components/normalize-css/normalize.css'
};

// Export
module.exports = {
    basePaths   : basePaths,
    paths       : paths,
    app         : app,
    vendorFiles : vendorFiles
};
