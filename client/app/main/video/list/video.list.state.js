/**
 * @video.list.state.js
 *
 * @description
 * This is a file configuration to specify a new state in the application, define the url for this state, specify the html
 * that will be rendered, and indicate which controller must used.
 */
(function () {
    angular.module('videoPortalApp')
        .config(function ($stateProvider) {
            $stateProvider.state('main.video.list', {
                url: '/videos',
                views: {
                    'content': {
                        templateUrl: 'main/video/list/video.list.html',
                        controller: 'VideoListController as ctrl'
                    }
                }

            })
        });
})();