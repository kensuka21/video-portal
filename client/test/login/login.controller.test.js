describe('LoginController', function () {
    var loginController, scope, authServiceMock;

    beforeEach(module('videoPortalApp'));

    beforeEach(function () {
        authServiceMock = jasmine.createSpyObj('authServiceMock', ['login']);

        module(function ($provide) {
            $provide.value('AuthService', authServiceMock);
        });
    });

    beforeEach(inject(function ($rootScope, $controller, $q) {
        authServiceMock.login.and.returnValue($q.resolve({sessionId: '', username: ''}));

        scope = $rootScope.$new();
        loginController = $controller('LoginController', {
            '$scope': scope
        });
    }));

    it('Should have an user object defined', function () {
       expect(loginController.user).toBeDefined();
    });

    it('encryptMD5 method should return the encrypted value', function () {
       expect(loginController.encryptMD5('password')).toEqual('5f4dcc3b5aa765d61d8327deb882cf99');
    });

    it('Login method should call AuthService login request one time', function () {
        loginController.user.username = '';
        loginController.user.password = '';

        loginController.login();

        expect(authServiceMock.login).toHaveBeenCalled();
    })
});