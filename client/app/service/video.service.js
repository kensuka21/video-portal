/**
 * @video.service.js
 *
 * @description
 * This service will handle all ajax request related to videos (e.g.: ratings, fetch all videos)
 */

(function () {
    angular.module('videoPortalApp')
        .service('VideoService', VideoService);

    /**
     * @param ApiService - custom http provider to make ajax requests that concatenate the sessionId
     * @param $q - angular's provider to make promises
     * @param apiUrl - constant value of the api's url
     * @param AJAX_STATUS_SUCCESS - string value that the server returns when an ajax request has return successfully
     */
    function VideoService(ApiService, $q, apiUrl, AJAX_STATUS_SUCCESS) {
        var self = this;

        self.find = find;
        self.addRating = addRating;

        /**
         * Make an ajax request to get videos.
         *
         * @param skip (number)
         * @param limit (number)
         *
         * @returns {Function} - A promise with the resolve of video list if the status is success
         * and reject value: (string) if the status is error
         */
        function find(skip, limit) {
            var deferred = $q.defer();
            ApiService.get(apiUrl + '/video',
                {
                    params: {
                        skip: skip,
                        limit: limit
                    }
                })
                .then(function (response) {
                    var data = response.data;
                    if (data.status !== AJAX_STATUS_SUCCESS) {
                        deferred.reject(data.error);
                        return;
                    }

                    deferred.resolve(data.data);
                });
            return deferred.promise;
        }

        /**
         *
         * @param videoId - id of the video in the database
         * @param rating - rating that will be added
         * @returns {Function} - A promise with the resolve of video if the status is success
         * and reject value: (string) if the status is error
         */
        function addRating(videoId, rating) {
            var deferred = $q.defer();

            ApiService.post(apiUrl + '/video/ratings', { videoId: videoId, rating: rating})
                .then(function (response) {
                    var data = response.data;
                    if (data.status !== AJAX_STATUS_SUCCESS) {
                        deferred.reject(data.error);
                        return;
                    }

                    deferred.resolve(data.data);
                });

            return deferred.promise;
        }
    }
})();