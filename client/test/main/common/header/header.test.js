describe('Header directive', function () {
    var headerDirective, compile, scope, authServiceMock, url;

    beforeEach(module('videoPortalApp'));

    beforeEach(function () {
        authServiceMock = jasmine.createSpyObj('authServiceMock', ['logout']);

        module(function ($provide) {
            $provide.value('AuthService', authServiceMock);
        });
    });

    beforeEach(inject(function ($compile, $rootScope, $q, apiUrl) {
        authServiceMock.logout.and.returnValue($q.resolve([{}]));

        scope = $rootScope.$new();
        url = apiUrl;
        compile = $compile;
    }));

    function getCompiledElement(scope){
        var element = angular.element('<app-header/>');
        var compiledElement = compile(element)(scope);
        scope.$digest();
        return compiledElement;
    }

    it('When logout should call logout from AuthService', function () {

        headerDirective = getCompiledElement(scope);

        headerDirective.isolateScope().logout();

        expect(authServiceMock.logout).toHaveBeenCalled();
    });

});

