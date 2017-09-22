describe('VideoService', function () {
    var httpBackend, videoService, url, ajaxStatusSuccess;
    beforeEach(module('videoPortalApp'));

    beforeEach(inject(function ($httpBackend, VideoService, AJAX_STATUS_SUCCESS, apiUrl) {
        httpBackend = $httpBackend;
        videoService = VideoService;
        url = apiUrl;
        ajaxStatusSuccess = AJAX_STATUS_SUCCESS;
    }));

    it('When calling find method should return the list of video', function () {
        var expectedList = [
            {
                name: 'Video 1',
                description: 'Description'
            }
        ];
        var skip = 0;
        var limit = 1;

        var returnedVideos;

        videoService.find(skip, limit)
            .then(function (videos) {
                returnedVideos = videos;
            });

        httpBackend.whenGET(url + '/video?skip=' + skip + '&limit=' + limit)
            .respond(200, {status: 'success', data: expectedList});

        httpBackend.flush();

        expect(returnedVideos.length).toBeGreaterThan(0);
        expect(returnedVideos[0].name).toEqual(expectedList[0].name);
    });

    it('When calling the find method and throw an error should receive that error', function () {
        var expectedStatus = 'error';
        var expectedError = 'Error fetching videos';
        var skip = 0;
        var limit = 1;
        var returnedError;

        videoService.find(skip, limit)
            .then(function () {

            }, function (err) {
                returnedError = err;
            });

        httpBackend.whenGET(url + '/video?skip=' + skip + '&limit=' + limit)
            .respond(200, {status: expectedStatus, error: expectedError});

        httpBackend.flush();

        expect(returnedError).toEqual(expectedError);
    });
});