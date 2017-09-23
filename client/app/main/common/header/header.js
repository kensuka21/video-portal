/**
 * @header.js
 *
 * @description
 * This directive is the header of the application.
 */

(function () {
    angular.module('videoPortalApp')
        .directive('appHeader', appHeader);

    /**
     * @param AuthService - service that makes the ajax request to login
     * @param $state - angular's provider to change the location page
     * @param $localStorage - provider that access to the local storage of the browser
     * @returns {{templateUrl: string, controller: controller}}
     */
    function appHeader(AuthService, $state, $localStorage) {
        return {
            templateUrl: 'main/common/header/header.html',
            scope: {

            },
            controller: function ($scope) {
                $scope.logout = logout;

                /**
                 * Calls the logout service, delete the user information from localStorage and then return to the login page.
                 */
                function logout() {
                    AuthService.logout()
                        .then(function () {
                            delete $localStorage.authInfo;
                            $state.go('login');
                        })
                }
            }
        }
    }
})();