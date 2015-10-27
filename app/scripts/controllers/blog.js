'use strict';

angular.module('yhApp')
.controller('BlogCtrl', function ($scope,lokBlog,$routeParams,$location) {

	var _blogId = $routeParams.blogId;

	$scope.$location = $location;

	$scope.lokBlog = lokBlog;

	$scope.currentBlog = lokBlog.getUrl(_blogId);

	$scope.found = false;

	lokBlog.blogs.forEach(function(each){
		if (each === _blogId){
			$scope.found = true;
		}
	});


});
