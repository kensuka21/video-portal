/**
 * @login.controller.js
 *
 * @description
 * This controller will handle all the data and events that will be presented in the Login Page.
 */

(function () {
    angular.module('videoPortalApp')
        .controller('LoginController', LoginController);

    /**
     * @param $scope - scope that angular created for this controller
     * @param md5 - external library to encrypt md5 strings
     * @param $state - angular's provider to change the location page
     * @param AuthService - service that makes the ajax request to login
     * @param $localStorage - provider that access to the local storage of the browser
     */
    function LoginController($scope, md5, $state, AuthService, $localStorage) {
        var self = this;

        self.login = login;
        self.encryptMD5 = encryptMD5;
        self.user = {
            username: '',
            password: ''
        };

        //functions

        /**
         * Call the login ajax's request to get the sessionId, put the user information in localStorage and
         * then, join to the application.
         */
        function login() {
            AuthService.login(self.user.username, self.encryptMD5(self.user.password))
                .then(function (user) {
                    $localStorage.authInfo = user;
                    $state.go('main.video.list');
                }, function (error) {
                    alert(error);
                });
        }

        /**
         * This method will receive an string and it will return an encrypted MD5 value
         *
         * @param value (string)
         */
        function encryptMD5(value) {
            return md5.createHash(value || '')
        }
    }
})();