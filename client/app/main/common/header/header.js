/**
 * @header.js
 *
 * @description
 * This directive is the header of the application.
 */

(function () {
    angular.module('videoPortalApp')
        .directive('appHeader', appHeader);

    function appHeader() {
        return {
            templateUrl: 'main/common/header/header.html'
        }
    }
})();