describe('appVideoRating directive', function () {
    var videoRatingDirective, compile, scope, videoServiceMock, url;

    beforeEach(module('videoPortalApp'));

    beforeEach(function () {
        videoServiceMock = jasmine.createSpyObj('videoServiceMock', ['addRating']);

        module(function ($provide) {
            $provide.value('VideoService', videoServiceMock);
        });
    });

    beforeEach(inject(function ($compile, $rootScope, $q, apiUrl) {
        videoServiceMock.addRating.and.returnValue($q.resolve([{}]));

        scope = $rootScope.$new();
        url = apiUrl;
        compile = $compile;
    }));

    function getCompiledElement(scope){
        var element = angular.element('<app-video-rating video="video"></app-video-rating>');
        var compiledElement = compile(element)(scope);
        scope.$digest();
        return compiledElement;
    }

    it('When execute setVideoRating should call the addRating from VideoService', function () {
        var $event = {rating: 5};
        var video = {_id: '1', ratingAverage: 5};
        scope.video = video;

        videoRatingDirective = getCompiledElement(scope);

        videoRatingDirective.isolateScope().setVideoRating($event);

        expect(videoServiceMock.addRating).toHaveBeenCalled();
    });

});

