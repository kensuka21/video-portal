//TODO: Write the documentation

(function () {
    angular.module('videoPortalApp')
        .factory('AuthInterceptor', function ($window, $q, $state, $localStorage) {
            return {
                request: function (config) {

                    if ($localStorage.authInfo) {
                        config.params = config.params || {};
                        config.params.sessionId = $localStorage.authInfo.sessionId;
                    }
                    return config || $q.when(config);
                },
                responseError: function (response) {
                    if (response.status === 401) {
                        //  Redirect user to login page.
                        delete $localStorage.authInfo;
                        $state.go('login');
                    }

                    return response || $q.when(response);
                },
                response: function (response) {
                    return response || $q.when(response);
                }
            };
        });
})();
