/**
 * @main.state.js
 *
 * @description
 * This is a file configuration to specify a new state in the application, define the url for this state, specify the html
 * that will be rendered, and indicate which controller must used.
 */
(function () {
    angular.module('videoPortalApp')
        .config(function ($stateProvider) {
            $stateProvider.state('main', {
                abstract: true,
                templateUrl: 'main/main.html',
                controller: 'MainController as ctrl'
            })
        });
})();