/**
 * @auth.service.js
 *
 * @description
 * This service will handle all ajax request related to authentication (e.g.: login, logout)
 */

(function () {
    angular.module('videoPortalApp')
        .service('AuthService', AuthService);

    /**
     * @param $http - angular's provider to make ajax requests
     * @param $q - angular's provider to make promises
     * @param apiUrl - constant value of the api's url
     * @param AJAX_STATUS_SUCCESS - string value that the server returns when an ajax request has return successfully
     */
    function AuthService($http, $q, apiUrl, AJAX_STATUS_SUCCESS) {
        var self = this;

        self.login = login;

        /**
         * Make an ajax request to authenticate the user and receive the sessionId.
         *
         * @param username (string)
         * @param password (string, with MD5 encryption)
         *
         * @returns {Function} - A promise with the resolve value: {sessionId, username} if the status is success
         * and reject value: (string) if the status is error
         */
        function login(username, password) {
            var deferred = $q.defer();
            $http.post(apiUrl + '/user/auth', {username: username, password: password})
                .then(function (response) {
                    var data = response.data;

                    if(data.status !== AJAX_STATUS_SUCCESS){
                        deferred.reject(data.error);
                        return;
                    }

                    deferred.resolve({
                        sessionId: data.sessionId,
                        username: data.username
                    });
                });
            return deferred.promise;
        }
    }
})();