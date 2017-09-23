(function() {
    angular.module('videoPortalApp')
        .directive('appVideoRating', function (Average, VideoService) {
        return {
            restrict: 'E',
            templateUrl: 'main/video/components/videoRating/video.videoRating.html',
            scope: {
                video: '='
            },
            controller: function ($scope) {
                $scope.setVideoRating = setVideoRating;

                /**
                 * Add the rating to the video
                 *
                 * @param $event - json object provide by angular-star-rating that contains the rating value that is clicked
                 * @param video - json object of the video that contains the id, rating, average rating, etc
                 */
                function setVideoRating($event) {
                    var rating = $event.rating;

                    VideoService.addRating($scope.video._id, rating)
                        .then(function (returnedVideo) {
                            $scope.video.ratings = returnedVideo.ratings;
                            $scope.video.ratingAverage = Average($scope.video.ratings);
                        });
                }
            },
        };
    });
})();