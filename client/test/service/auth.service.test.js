describe('AuthService', function () {
    var httpBackend, authService, url, ajaxStatusSuccess;
    beforeEach(module('videoPortalApp'));

    beforeEach(inject(function ($httpBackend, AuthService, AJAX_STATUS_SUCCESS, apiUrl) {
        httpBackend = $httpBackend;
        authService = AuthService;
        url = apiUrl;
        ajaxStatusSuccess = AJAX_STATUS_SUCCESS;
    }));

    describe('login method call', function () {
        var username = 'ali';
        var password = '5f4dcc3b5aa765d61d8327deb882cf99';

        it('When ajax returns success should return user information ', function () {
            var returnedUser;
            var expectedSession = 'expected';
            var expectedResponse = {
                status: ajaxStatusSuccess,
                sessionId: expectedSession,
                username: 'ali'
            };

            authService.login(username, password)
                .then(function (user) {
                    returnedUser = user;
                });

            httpBackend.whenPOST(url + '/user/auth', {username: username, password: password})
                .respond(200, expectedResponse);

            httpBackend.flush();

            expect(returnedUser.sessionId).toEqual(expectedSession);
        });

        it('When ajax returns error should return error message', function () {
            var returnedUser;
            var returnedError;
            var expectedError = 'Invalid credentials';
            var expectedResponse = {
                status: 'error',
                error: expectedError
            };

            authService.login(username, password)
                .then(function (user) {
                    returnedUser = user;
                }, function (error) {
                    returnedError = error
                });

            httpBackend.whenPOST(url + '/user/auth', {username: username, password: password})
                .respond(200, expectedResponse);

            httpBackend.flush();

            expect(returnedError).toEqual(expectedError);
        });
    });
});