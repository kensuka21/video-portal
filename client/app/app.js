/**
 * @app.js
 *
 * @description
 * This is the main module. This module declares the dependencies that the application will use.
 */

(function () {
    var app = angular.module('videoPortalApp',
        [
            'ui.router',
            'ui.router.state.events',
            'ui.bootstrap',
            'ngMd5',
            'ngStorage',
            'videoPortalApp.config'
        ]
    );

    /** string value that the server returns when an ajax request has return successfully */
    app.constant('AJAX_STATUS_SUCCESS', 'success'); //

    app.config(appConfig);

    app.run(appRunConfig);

    /**
     * Implements the configuration of the application
     *
     * @param $urlRouterProvider - angular's provider to configure the url router.
     */
    function appConfig($urlRouterProvider) {
        /** when access to the web page and the url path does not exists then the application will be redirected to /login */
        $urlRouterProvider.otherwise('/login');
    }

    /**
     * Implements the configuration of all the events in the application
     *
     * @param $rootScope = global scope of the angular's application
     * @param $localStorage - provider that access to the local storage of the browser
     * @param $state - angular's provider to change the location page
     */
    function appRunConfig($rootScope, $localStorage, $state) {

        /** This event listener will be executed every time the application will navigate.
         * It will validate if the user is authenticated to join the application otherwise will be returned to login' page */
        $rootScope.$on('$stateChangeStart',
            function (event, toState, toParams, fromState, fromParams, options) {

                /** if the user is trying to join to the application instead of the login page and it's not authenticated
                 *  then return to the login page */
                if(toState.name !== 'login' && !$localStorage.authInfo){
                    event.preventDefault();
                    $state.go('login');
                }

                /** if the user is trying to join to the login page and it's already authenticated then return to the
                 *  main's page */
                if(toState.name === 'login' && $localStorage.authInfo){
                    event.preventDefault();
                    $state.go('main.video.list');
                }
            });
    }
})();