"use strict";
/**
 * import the environement settings
 */

//env var to hold the env settings
var env = {};
if(window) {
	Object.assign(env, window.__env);
}
/**
 * Main file contains controller for Druapl REST api data fetch
 */
var app = angular.module("prototype", []);
//define controller here
app.controller("maincontroller", function($scope, prototype_api, commonFunctions, appTitle ) {
  $scope.var ="Debug";
  $scope.title = appTitle;
	function formatData(raqRes) {
		var retAr = new Array();
		//console.log(raqRes.length);
		var pos_1 = 0, pos_2 =1;
		for(var i =0;	i	< raqRes.length / 2;	i ++	) {
			retAr[i] = Array(raqRes[pos_1], raqRes[pos_2]);
			pos_1 = pos_1 + 2;
			pos_2 = pos_2 + 2;
		}
		return retAr;
	}

	//Get All jobs data
	$scope.alljobRecords = prototype_api.allJobs().then(function(res) {
		//console.log(res.data);
		//var format = formatData(res.data);
		var format = commonFunctions.get_tabular_data(res.data);
		//console.log(format);
		return res.data;

	},function() {
		return "An error occured!";
	});
	
	//Get all Managerial jobs data
	$scope.devJobsRecords = prototype_api.devJobs().then(function(res) {
		//console.log(res.data);

		return res.data;
	},function() {
		return "An Error Occured!";
	});
	//Get all Developer jobs data
	$scope.mgmtJobsRecords = prototype_api.mgmtJobs().then(function(res) {
		
		//console.log(res.data);
		return res.data;
	},function(){
		return "An Error Occured!";
	}); 
});

/**
 * API calls to druapl rest a factory service
 */
app.factory("prototype_api",function($http, __env) {

	function fetchAllJobs() {
		return $http.get( __env.apiBaseURL + "/api/v1/alljobl8946hkI" );
	}
	
	//func to Get all Mgmt jobs
	function fetchMgmtJobs() {
		return $http.get( __env.apiBaseURL + "/api/v1/managerial-job-l8946hkI");
	}

	//func to get Get all dev Jobs
	function fetchDevJobs() {
		return $http.get( __env.apiBaseURL + "/api/v1/developer-job-l8946hkI");
	}

	//return api fetched data
	return {
		allJobs : fetchAllJobs,
		mgmtJobs: fetchMgmtJobs,
		devJobs :	fetchDevJobs,
	};
});

app.factory("commonFunctions", function() {

	//format the api response data to two column tabular data for presentation.
	function data_to_tabular(rawData) {
		var retAr = new Array();
		console.log(rawData.length);
		var pos_1 = 0, pos_2 =1;
		for(var i =0;	i	< parseInt(rawData.length / 2);	i ++) {
			//retAr[i] = {"column" : [rawData[pos_1], rawData[pos_2]] };
			retAr[i] = {"column" : [rawData[pos_1], rawData[pos_2]] };
			pos_1 = pos_1 + 2;
			pos_2 = pos_2 + 2;
		}
		return retAr;		
	}
	return {
		get_tabular_data : data_to_tabular
	};
});

//Constant definitions 
app.constant("appTitle", {"dev": "DEVELOPER JOBS", "man" : "MANAGER JOBS", "all":"ALL JOBS"});
app.constant("__env", env);

/**
 * Ref
 * 
 * http://kevgary.github.io/tutorials/2015/12/22/http-angularjs-demo.html
 * https://medium.com/@kudresov/a-better-way-to-inject-environmental-variables-in-angular-d3b2d01a3c5e
 * Learn: https://codeutopia.net/blog/2014/11/10/angularjs-best-practices-avoid-using-ng-repeats-index/
 * https://www.jvandemo.com/how-to-configure-your-angularjs-application-using-environment-variables/
 * 
 */