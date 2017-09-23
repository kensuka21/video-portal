/**
 * @api.service.js
 *
 * @description
 * This service will handle all ajax request and will set the sessionId for every request.
 */

(function () {
    angular.module('videoPortalApp')
        .service('ApiService', ApiService);

    /**
     * @param $http - angular's provider to make ajax requests
     * @param $q - angular's provider to make promises
     * @param $localStorage - provider that access to the local storage of the browser
     */
    function ApiService($http, $q, $localStorage) {
        var self = this;


        self.get = get;
        self.post = post;

        /**
         * @param url - apiUrl
         * @param config - params configurations
         */
        function get(url, config) {
            var deferred = $q.defer();

            if(config){
                config.params = config.params || {}
            }else{
                config = { params: {} }
            }

            if ($localStorage.authInfo) {
                config.params.sessionId = $localStorage.authInfo.sessionId;
            }

            $http.get(url, config)
                .then(function (response) {
                    deferred.resolve(response);
                }, function (response) {
                    deferred.reject(response);
                });

            return deferred.promise;
        }

        /**
         * @param url - apiUrl
         * @param data - json object
         * @param config - params configurations
         */
        function post(url, data, config) {
            var deferred = $q.defer();

            if(config){
                config.params = config.params || {}
            }else{
                config = { params: {} }
            }

            if ($localStorage.authInfo) {
                config.params.sessionId = $localStorage.authInfo.sessionId;
            }

            $http.post(url, data, config)
                .then(function (response) {
                    deferred.resolve(response);
                }, function (response) {
                    deferred.reject(response);
                });

            return deferred.promise;
        }
    }
})();