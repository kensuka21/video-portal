describe('VideoListController', function () {
    var videoListController, scope, videoServiceMock;

    beforeEach(module('videoPortalApp'));

    beforeEach(function () {
        videoServiceMock = jasmine.createSpyObj('videoServiceMock', ['find']) ;

        module(function ($provide) {
            $provide.value('VideoService', videoServiceMock);
        });
    });

    beforeEach(inject(function ($controller, $rootScope, $q) {
        videoServiceMock.find.and.returnValue($q.resolve([{}]));
        scope = $rootScope.$new();
        videoListController = $controller('VideoListController', {
            '$scope': scope
        });
    }));

    it('Controller should have title', function () {
       expect(videoListController.title).toBeDefined();
    });
});