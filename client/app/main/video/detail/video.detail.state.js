/**
 * @video.detail.state.js
 *
 * @description
 * This is a file configuration to specify a new state in the application, define the url for this state, specify the html
 * that will be rendered, and indicate which controller must used.
 */
(function () {
    angular.module('videoPortalApp')
        .config(function ($stateProvider) {
            $stateProvider.state('main.video.detail', {
                url: '/videos/:id',
                views: {
                    'content': {
                        templateUrl: 'main/video/detail/video.detail.html',
                        controller: 'VideoDetailController as ctrl'
                    }
                },
                params: {
                    video: null
                }

            })
        });
})();