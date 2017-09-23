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
     * @param $state - angular's provider to change page location
     * @param Average - calculate the average of a number's array
     */
    function VideoDetailController($scope, VideoService, apiUrl, $sce, $stateParams, $state, Average) {
        var self = this;

        /** title page */
        self.title = 'Crossover Video Portal';
        /** list of video in the right side*/
        self.videos = [];
        /** flag to know when the page is loading more videos */
        self.busy = false;
        self.loadVideoById = loadVideoById;
        self.loadVideos = loadVideos;


        /** if there is not id provided, then return to the video list page */
        if(!$stateParams.id){
            $state.go('main.video.list');
            return;
        }

        /** load the video by id */
        loadVideoById($stateParams.id);

        /** load video list in the right side*/
        loadVideos();

        // functions

        /**
         * Calls find method from VideoService to fetch videos.
         * If there are videos in the page, so will search for the videos that are next to the last video loaded in the page.
         * */
        function loadVideos() {
            if (self.busy) return;

            self.busy = true;

            VideoService.find(self.videos.length, 3)
                .then(function (videos) {
                    angular.forEach(videos, function (video, idx) {
                        /** attach the object so the videogular would render the video */
                        video.videogularSrc = [{
                            src: $sce.trustAsResourceUrl(apiUrl + '/' + video.url),
                            type: "video/mp4"
                        }];

                        /** set the video rating average */

                        video.ratingAverage = Average(video.ratings);
                        self.videos.push(video);
                    });


                    self.busy = false;
                });
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