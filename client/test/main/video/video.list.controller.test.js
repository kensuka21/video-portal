describe('VideoListController', function () {
    var videoListController, scope, videoServiceMock, url;

    beforeEach(module('videoPortalApp'));

    beforeEach(function () {
        videoServiceMock = jasmine.createSpyObj('videoServiceMock', ['find']);

        module(function ($provide) {
            $provide.value('VideoService', videoServiceMock);
        });
    });

    beforeEach(inject(function ($controller, $rootScope, $q, apiUrl) {
        videoServiceMock.find.and.returnValue($q.resolve([{}]));
        scope = $rootScope.$new();
        url = apiUrl;
        videoListController = $controller('VideoListController', {
            '$scope': scope
        });
    }));

    it('Controller should have title', function () {
        expect(videoListController.title).toBeDefined();
    });

    it('find method of VideoService should be called when controller initialized ', function () {
       expect(videoServiceMock.find).toHaveBeenCalled();
    });

    it('getVideoUrl should return the video url concatenated with the apiUrl', function () {
        var video = {
            url: 'videos/video.mp4'
        };
        var videoUrl = url + '/' + video.url;

        var returnedUrl = videoListController.getVideoUrl(video.url);

        expect(returnedUrl).toEqual(videoUrl);
    });
});