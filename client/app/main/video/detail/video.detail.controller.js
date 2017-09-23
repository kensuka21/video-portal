/**
 * @video.detail.controller.js
 *
 * @description
 * This controller will handle all the data and events that will be presented in the Video Detail Page.
 */

(function () {
    angular.module('videoPortalApp')
        .controller('VideoDetailController', VideoDetailController);

    /**
     * @param $scope - scope that angular created for this controller
     * @param VideoService - service that makes the ajax request to fetch videos
     * @param apiUrl - constant value of the api's url
     * @param $sce - creates trust resource urls
     * @param $stateParams - angular's provider to obtain the url params
     */
    function VideoDetailController($scope, VideoService, apiUrl, $sce, $stateParams, $state, Average) {
        var self = this;

        self.title = 'Crossover Video Portal'; /** title page */
        self.loadVideoById = loadVideoById;
        self.video = $stateParams.video || null;

        /** if there is not id provided, then return to the video list page */
        if(!$stateParams.id){
            $state.go('main.video.list');
        }

        /** if there is not video provided, then load the video by id */
        if(!self.video){
            loadVideoById($stateParams.id);
        }


        //functions
        /**
         * Calls findOne method from VideoService to find video by id.
         * */
        function loadVideoById(videoId) {
            VideoService.findOne(videoId)
                .then(function (video) {
                    self.video = video;

                    /** attach the object so the videogular would render the video */
                    self.video.videogularSrc = [{
                        src: $sce.trustAsResourceUrl(apiUrl + '/' + video.url),
                        type: "video/mp4"
                    }];

                    self.video.ratingAverage = Average(video.ratings);
                }, function (err) {
                    alert(err);
                    $state.go('main.video.list');
                });
        }
    }
})();