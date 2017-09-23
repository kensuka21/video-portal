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
    function VideoListController($scope, VideoService, apiUrl, $sce) {
        var self = this;

        self.title = 'Crossover Video Portal';
        self.videos = [];
        self.getVideoUrl = getVideoUrl;
        self.loadVideos = loadVideos;
        self.getVideoRating = getVideoRating;
        self.attachApiToVideo = attachApiToVideo;
        self.stopCurrentVideoAndSetVideoIndex = stopCurrentVideoAndSetVideoIndex;
        self.currentVideoIndex = null;

        loadVideos();

        //functions

        /** Calls find method from VideoService to fetch all videos */
        function loadVideos() {
            VideoService.find(0, 10)
                .then(function (videos) {
                    angular.forEach(videos, function (video, idx) {
                        /** attach the object so the videogular would render the video */
                       video.videogularSrc = [{src: getVideoUrl(video.url), type: "video/mp4"}];

                       self.videos.push(video)
                    });
                });
        }

        /**
         * Concatenate the host and the video url to get the video from the server
         *
         * @param videoUrl {string} - This video url comes from the server
         * @returns {string}
         */
        function getVideoUrl(videoUrl) {
            return apiUrl + '/' + videoUrl;
        }

        /**
         * Calculate the average of ratings
         *
         * @param ratings {array} - This array contains all the rating that the video has
         * */
        function getVideoRating(ratings) {
            var sum = 0;
            for (var i = 0; i < ratings.length; i++) {
                sum += ratings[i];
            }

            return sum/ratings.length;
        }

        /**
         * attach the api to the video in the video list
         *
         * @param api - refers to the video rendered in the page. Works to play or pause the video
         * @param videoIndex - the index of ctrl.videos
         */
        function attachApiToVideo(api, videoIndex) {
            self.videos[videoIndex].videoApi = api;
        }


        /**
         * Stop the current video (if there is a video playing) and then set the current video index in the self.currentVideoIndex variable
         *
         * @param videoIndex - the index of ctrl.videos
         */
        function stopCurrentVideoAndSetVideoIndex(videoIndex) {
            debugger;
            if(self.currentVideoIndex === null){
                self.currentVideoIndex = videoIndex;
            }else if(self.currentVideoIndex !== videoIndex){
                self.videos[self.currentVideoIndex].videoApi.pause();
                self.currentVideoIndex = videoIndex;
            }
        }
    }
})();