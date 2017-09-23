describe('VideoListController', function () {
    var videoDetailController, scope, videoServiceMock, url;

    beforeEach(module('videoPortalApp'));

    beforeEach(function () {
        videoServiceMock = jasmine.createSpyObj('videoServiceMock', ['find', 'findOne', 'addRating']);

        module(function ($provide) {
            $provide.value('VideoService', videoServiceMock);
            $provide.value('$stateParams', {
                id: 1
            })
        });
    });

    beforeEach(inject(function ($controller, $rootScope, $q, apiUrl) {
        videoServiceMock.find.and.returnValue($q.resolve([{}]));
        videoServiceMock.findOne.and.returnValue($q.resolve({}));
        videoServiceMock.addRating.and.returnValue($q.resolve([{}]));

        scope = $rootScope.$new();
        url = apiUrl;
        videoDetailController = $controller('VideoDetailController', {
            '$scope': scope
        });
    }));

    it('Controller should have title', function () {
        expect(videoDetailController.title).toBeDefined();
        expect(videoDetailController.title).toEqual('Crossover Video Portal');
    });

    it('When controller initialize should call findOne method from VideoService', function () {
        expect(videoServiceMock.findOne).toHaveBeenCalled();
    });

    it('When controller initialize should call find method from VideoService to fetch all videos', function () {
        expect(videoServiceMock.find).toHaveBeenCalled();
    });
});