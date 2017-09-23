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

    it('getVideoUrl should return the video url concatenated with the apiUrl', function () {
        var video = {
            url: 'videos/video.mp4'
        };
        var videoUrl = url + '/' + video.url;

        var returnedUrl = videoListController.getVideoUrl(video.url);

        expect(returnedUrl).toEqual(videoUrl);
    });

    it('getVideoRating should return the correct average', function () {
        var ratings = [2, 5];
        var expectedAverage = 3.5;

        var returnedAverage = videoListController.getVideoRating(ratings);

        expect(returnedAverage).toBe(expectedAverage);
    });

    it('When execute attachApiToVideo should return the object to the video list correctly', function () {
        var api = { pause: function () {}};
        var videos = [{title: ''}];

        videoListController.videos = videos;

        videoListController.attachApiToVideo(api, 0);

        expect(videoListController.videos[0].videoApi).toEqual(api);
    });

    it('When execute setVideoRating should call the addRating from VideoService', function () {
        var $event = {rating: 5};
        var video = {_id: '1'};

        videoListController.setVideoRating($event, video);

        expect(videoServiceMock.addRating).toHaveBeenCalled();
    });
});