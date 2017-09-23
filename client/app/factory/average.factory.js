/**
 * @rating.factory.js
 *
 * @description
 * This factory calculates the average of an array
 */

(function () {
    angular.module('videoPortalApp')
        .factory('Average', Average);

    function Average() {
        return function (array) {
            var sum = 0;
            for (var i = 0; i < array.length; i++) {
                sum += array[i];
            }
            return sum / array.length
        };
    }
})();