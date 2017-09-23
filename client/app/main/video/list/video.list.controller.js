/**
 * @video.list.controller.js
 *
 * @description
 * This controller will handle all the data and events that will be presented in the Video List Page.
 */

(function () {
    angular.module('videoPortalApp')
        .controller('VideoListController', VideoListController);

    /**
     * @param $scope - scope that angular created for this controller
     * @param VideoService - service that makes the ajax request to fetch videos
     * @param apiUrl - constant value of the api's url
     * @param $sce - creates trust resource urls
     */
    function VideoListController($scope, VideoService, apiUrl, $sce, $state, Average) {
        var self = this;

        /** title page */
        self.title = 'Crossover Video Portal';
        /** list of video */
        self.videos = [];
        /** index of the video that is current playing */
        self.currentVideoIndex = null;
        /** flag to know when the page is loading more videos */
        self.busy = false;
        self.loadVideos = loadVideos;
        self.attachApiToVideo = attachApiToVideo;
        self.stopCurrentVideoAndSetVideoIndex = stopCurrentVideoAndSetVideoIndex;
        self.goToDetailPage = goToDetailPage;


        loadVideos();

        //functions

        /**
         * Calls find method from VideoService to fetch videos.
         * If there are videos in the page, so will search for the videos that are next to the last video loaded in the page.
         * */
        function loadVideos() {
            if (self.busy) return;

            self.busy = true;

            VideoService.find(self.videos.length, 10)
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
            if (self.currentVideoIndex === null) {
                self.currentVideoIndex = videoIndex;
            } else if (self.currentVideoIndex !== videoIndex) {
                self.videos[self.currentVideoIndex].videoApi.pause();
                self.currentVideoIndex = videoIndex;
            }
        }

        function goToDetailPage(video) {
            $state.go('main.video.detail', {
                id: video._id,
                video: video
            });
        }
    }
})();