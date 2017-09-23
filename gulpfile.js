/**
 * @gulpfile.js
 *
 * This file contains all the task that is needed in development to build compiled files, execute a development server
 * with hot reload, and run tests.
 */
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    gulpNgConfig = require('gulp-ng-config'),
    cleanCSS = require('gulp-clean-css');

/**
 * Config variable that contains file's paths, ports.
 *
 * Everytime a new dependency is added in the project must be included in the js/css path.
 *
 * @type {{port: number, paths: {js: string, html: string, css: string}}}
 */
var config = {
    port: 5000,
    paths: {
        clientApp: './client/app/',
        js: [
            './node_modules/jquery/dist/jquery.min.js',
            './node_modules/bootstrap/dist/js/bootstrap.min.js',
            './node_modules/angular/angular.min.js',
            './node_modules/angular-sanitize/angular-sanitize.min.js',
            './node_modules/@uirouter/angularjs/release/angular-ui-router.min.js',
            './node_modules/@uirouter/angularjs/release/stateEvents.min.js',
            './node_modules/angular-md5/angular-md5.min.js',
            './node_modules/ngstorage/ngStorage.min.js',
            './node_modules/angular1-star-rating/dist/index.js',
            './node_modules/videogular/dist/videogular/videogular.min.js',
            './node_modules/videogular-controls/vg-controls.min.js',
            './node_modules/angular-animate/angular-animate.min.js',
            './node_modules/ng-infinite-scroll/build/ng-infinite-scroll.min.js',
            './client/app/**/*.js'
        ],
        html: './client/app/**/*.html',
        images: './client/app/assets/images/*',
        fontsGlyphicon: './node_modules/bootstrap/dist/fonts/*.{ttf,otf,woff,woff2}',
        fontsAwesome: './node_modules/font-awesome/fonts/*.{ttf,otf,woff,woff2}',
        fontsVideogular: './node_modules/videogular-themes-default/fonts/*.{ttf,otf,woff,woff2}',
        css: [
            './node_modules/bootstrap/dist/css/bootstrap.min.css',
            './node_modules/angular-ui-bootstrap/dist/ui-bootstrap-csp.css',
            './node_modules/font-awesome/css/font-awesome.min.css',
            './node_modules/videogular-themes-default/videogular.css',
            './client/app/**/*.css'
        ],
        test: './client/test/**/*.js',
        configFile: 'client-environment-config.json',
        dist: './dist/'
    }
};

/**
 * Runs a development server with livereload
 */
gulp.task('connect', function () {
    connect.server({
        port: config.port,
        root: 'dist',
        livereload: true
    });
});

/**
 * Look for all javascript files from the client and integrate it into a single file (bundle.js)
 * and puts in dist folder
 */
gulp.task('scripts', function () {
    return gulp.src(config.paths.js)
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest(config.paths.dist))
        .pipe(connect.reload());
});

/**
 * Look for all html files from the client and puts in dist folder
 */
gulp.task('html', function () {
    return gulp.src(config.paths.html)
        .pipe(gulp.dest(config.paths.dist))
        .pipe(connect.reload());
});

/**
 * Look for all css files from the client and puts in dist folder
 */
gulp.task('css', function () {
    return gulp.src(config.paths.css)
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest(config.paths.dist))
        .pipe(connect.reload());
});

/**
 * Look for all images from the client and puts in dist folder
 */
gulp.task('images', function () {
    return gulp.src(config.paths.images)
        .pipe(gulp.dest(config.paths.dist + 'assets/images/'))
});


/**
 * Execute all fonts tasks
 */
gulp.task('fonts', ['font-awesome', 'font-glyphicon', 'font-videogular']);

/**
 * Look for all glyphicon fonts from the client and puts in dist folder
 */
gulp.task('font-glyphicon', function () {
    return gulp.src(config.paths.fontsGlyphicon)
        .pipe(gulp.dest(config.paths.dist + '/fonts'));
});

/**
 * Look for all fonts awesome from the client and puts in dist folder
 */
gulp.task('font-awesome', function () {
    return gulp.src(config.paths.fontsAwesome)
        .pipe(gulp.dest(config.paths.dist + '/font-awesome/fonts'));
});

/**
 * Look for all fonts awesome from the client and puts in dist folder
 */
gulp.task('font-videogular', function () {
    return gulp.src(config.paths.fontsVideogular)
        .pipe(gulp.dest(config.paths.dist + '/videogular-themes-default/fonts'));
});

/**
 * Build task that wraps all the task needed to build the dist folder
 */
gulp.task('build', ['scripts', 'html', 'css', 'images', 'fonts']);

/**
 * Keeps watching all the files that exists in one of the path, if one file changes the build task will be
 * executed
 */
gulp.task('watch', function () {
    gulp.watch([config.paths.js, config.paths.html, config.paths.css], ['build']);
});

/**
 * Creates a js files with angular's constant for the local environment
 */
gulp.task('config-local', function () {
    createConfig('local');
});

/**
 * Creates a js files with angular's constant for the production environment
 */
gulp.task('config-production', function () {
    createConfig('production');
});

/**
 * Creates a js file that contains angular's constant for the specific environment's param and puts in the client app folder
 *
 * @param environment (string)
 */
function createConfig(environment) {
    gulp.src(config.paths.configFile)
        .pipe(gulpNgConfig('videoPortalApp.config', {
            environment: environment
        }))
        .pipe(gulp.dest(config.paths.clientApp))
}

/**
 * Build dist folder with local environment configuration
 */
gulp.task('build-local', ['config-local', 'build']);

/**
 * Build dist folder with production environment configuration
 */
gulp.task('build-production', ['config-production', 'build']);

/**
 * Runs the development server with the watch task active
 */
gulp.task('dev-server', ['build-local', 'connect', 'watch']);
