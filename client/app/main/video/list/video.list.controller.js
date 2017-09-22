/**
 * @login.controller.js
 *
 * @description
 * This controller will handle all the data and events that will be presented in the Main Page.
 */

(function () {
    angular.module('videoPortalApp')
        .controller('VideoListController', VideoListController);

    /**
     * @param $scope - scope that angular created for this controller
     * @param VideoService - service that makes the ajax request to fetch videos
     * @param apiUrl - constant value of the api's url
     */
    function VideoListController($scope, VideoService, apiUrl) {
        var self = this;

        self.videos = [];
        self.getVideoUrl = getVideoUrl;

        VideoService.find(0, 10)
            .then(function (videos) {
                self.videos = videos;
            });

        //functions

        function getVideoUrl(videoUrl) {
            return apiUrl + '/' + videoUrl;
        }
    }
})();