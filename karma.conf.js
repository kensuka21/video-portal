// Karma configuration
// Generated on Thu Sep 21 2017 13:07:12 GMT-0400 (AST)

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        //Every time a new dependency is added with npm must add the js file here.
        files: [
            'node_modules/angular/angular.js',
            'node_modules/angular-sanitize/angular-sanitize.min.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'node_modules/@uirouter/angularjs/release/angular-ui-router.min.js',
            'node_modules/@uirouter/angularjs/release/stateEvents.min.js',
            'node_modules/angular-md5/angular-md5.min.js',
            'node_modules/ngstorage/ngStorage.min.js',
            'node_modules/angular1-star-rating/dist/index.js',
            'node_modules/videogular/dist/videogular/videogular.min.js',
            'node_modules/videogular-controls/vg-controls.min.js',
            'node_modules/angular-animate/angular-animate.min.js',
            'node_modules/ng-infinite-scroll/build/ng-infinite-scroll.min.js',
            'client/**/*.js'
        ],


        // list of files to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'client/app/**/*.js': ['coverage']
        },

        // optionally, configure the reporter
        coverageReporter: {
            type: 'html',
            dir: 'coverage/',
            instrumenterOptions: {
                istanbul: { noCompact: true }
            }
        },
        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'coverage'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    })
};
