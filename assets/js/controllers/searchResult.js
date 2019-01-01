'use strict';

/**
 * @ngdoc directive
 * @name searchResult.controller
 * @description
 * # Search Result controller
 */
angular.module("prototype")
  .controller('searchResult', function ($scope, prototype_api, commonFunctions) {
    //Get All jobs data
    $scope.varData = " Thsi is from search Result Controller";
    var pageSize=2;
    var pageShown = 1;
    var rowCount=0;
    prototype_api.allJobs().then(function(res) {
      //common func retrun data in row, col (2 col is set as per design)
      $scope.rowData = commonFunctions.get_tabular_data(res.data);  
      rowCount = parseInt($scope.rowData.length);  
    },function() {
      return "An error occured!";
    }); 
    
    //show more items func
    $scope.showMore = function() { 
      pageShown = pageShown + 1; 
      console.log(pageShown);
    };
    
    //Set the limit 
    $scope.setLimit = function() {
      return pageShown*pageSize;
    };

    $scope.hasMoreItemsToShow = function() {
      return pageShown < (rowCount / pageSize);
    };
  });