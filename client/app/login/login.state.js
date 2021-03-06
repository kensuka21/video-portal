/**
 * @login.state.js
 *
 * @description
 * This is a file configuration to specify a new state in the application, define the url for this state, specify the html
 * that will be rendered, and indicate which controller must used.
 */
(function () {
    angular.module('videoPortalApp')
        .config(function ($stateProvider) {
            $stateProvider.state('login', {
                url: '/login',
                templateUrl: 'login/login.html',
                controller: 'LoginController as ctrl'
            })
        });
})();