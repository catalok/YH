'use strict';

angular.module('yhApp')
.controller('MainCtrl', function ($scope, lokBlog) {

	$scope.lokBlog = lokBlog;

});
