/**
 * @http.interceptor.js
 *
 * @description
 * This interceptor will be aware of every response and will redirect to login if the response status is 401 (Unauthorized)
 */
(function () {
    angular.module('videoPortalApp')
        .factory('AuthInterceptor', function ($window, $q, $state, $localStorage) {
            return {
                responseError: function (response) {
                    if (response.status === 401) {
                        //  Redirect user to login page and delete the token from localStorage.
                        delete $localStorage.authInfo;
                        $state.go('login');
                    }

                    return response || $q.when(response);
                }
            };
        });
})();
