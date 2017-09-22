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
     * @param $http - angular's provider to make ajax requests
     * @param $q - angular's provider to make promises
     * @param apiUrl - constant value of the api's url
     * @param AJAX_STATUS_SUCCESS - string value that the server returns when an ajax request has return successfully
     */
    function VideoService($http, $q, apiUrl, AJAX_STATUS_SUCCESS) {
        var self = this;

        self.find = find;

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
            $http.get(apiUrl + '/video',
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
    }
})();