'use strict';

/**
 * @ngdoc directive
 * @name ngAppApp.directive:jobslists
 * @description
 * # jobslists
 */
angular.module('prototype')
  .directive('jobslists', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the jobslists directive');
      }
    };
  });