describe('VideoListController', function () {
    var videoListController, scope, videoServiceMock, url;

    beforeEach(module('videoPortalApp'));

    beforeEach(function () {
        videoServiceMock = jasmine.createSpyObj('videoServiceMock', ['find', 'addRating']);

        module(function ($provide) {
            $provide.value('VideoService', videoServiceMock);
        });
    });

    beforeEach(inject(function ($controller, $rootScope, $q, apiUrl) {
        videoServiceMock.find.and.returnValue($q.resolve([{}]));
        videoServiceMock.addRating.and.returnValue($q.resolve([{}]));

        scope = $rootScope.$new();
        url = apiUrl;
        videoListController = $controller('VideoListController', {
            '$scope': scope
        });
    }));

    it('Controller should have title', function () {
        expect(videoListController.title).toBeDefined();
        expect(videoListController.title).toEqual('Crossover Video Portal');
    });

    it('find method of VideoService should be called when controller initialized ', function () {
       expect(videoServiceMock.find).toHaveBeenCalled();
    });

    it('When execute attachApiToVideo should return the object to the video list correctly', function () {
        var api = { pause: function () {}};
        var videos = [{title: ''}];

        videoListController.videos = videos;

        videoListController.attachApiToVideo(api, 0);

        expect(videoListController.videos[0].videoApi).toEqual(api);
    });

    it('when call stopCurrentVideoAndSetVideoIndex should call the videoApi to pause the video', function () {
        var videoApi = jasmine.createSpyObj('videoApi', ['pause']);
        videoListController.videos = [{ videoApi: videoApi }, { videoApi: videoApi }];
        videoListController.currentVideoIndex = 0;

        videoListController.stopCurrentVideoAndSetVideoIndex(1);

        expect(videoListController.videos[0].videoApi.pause).toHaveBeenCalled();
    });
});