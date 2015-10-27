'use strict';
/* global NProgress */
angular.module('yhApp')
.controller('SettingsCtrl', function ($routeParams, $rootScope, $scope, offNavMediator, $location) {

	var curPage,nextPage;
	var _updateTarget = function(){
		curPage = $location.path();

		nextPage = '/settings';

		console.log(curPage,nextPage);
	};

	var _currentTimer = [0,0];

	var _testMenu = function(){
		NProgress.start();

		offNavMediator.publish('tester:start');
		offNavMediator.publish('menu:open');
		_currentTimer[0] = setTimeout(function(){
			offNavMediator.publish('menu:close');
			offNavMediator.publish('tester:end');
			NProgress.done();
		},2500);
	};

	var _testMenuChangePage = function(){
		offNavMediator.publish('tester:start');
		offNavMediator.publish('menu:open');
		_updateTarget();

		_currentTimer[0] = setTimeout(function(){
			$rootScope.$apply(function(){
				$location.search({ tester: Math.random() }).path(nextPage).replace();
			});
		},2500);

		// setTimeout(function(){
		// 	$rootScope.$apply(function(){
		// 		$location.path(curPage);
		// 	});
		// },3500);

		_currentTimer[1] = setTimeout(function(){
			offNavMediator.publish('menu:close');
			offNavMediator.publish('tester:end');
		},4000);
	};


	var _testChangePage = function(){
		offNavMediator.publish('tester:start');
		_updateTarget();

		_currentTimer[3] = setTimeout(function(){
			$rootScope.$apply(function(){
				$location.search({ tester: Math.random() }).path(nextPage).replace();
			});
			offNavMediator.publish('tester:end');
		},0);

		// setTimeout(function(){
		// 	$rootScope.$apply(function(){
		// 		$location.path(curPage);
		// 	});
		// },1300);

	};

	offNavMediator.subscribe('menu:close',function(){
		clearTimeout(_currentTimer[0]);
		clearTimeout(_currentTimer[1]);
		offNavMediator.publish('tester:end');
	});


	$scope.btnMenu = function(effeckt){
		offNavMediator.publish('update:effect:menu',effeckt);
		setTimeout(_testMenu,30);
	};

	$scope.btnMenuChangePage = function(effeckt){
		offNavMediator.publish('update:effect:3dPage',effeckt);
		setTimeout(_testMenuChangePage,30);
	};

	$scope.btnChangePage = function(effeckt){
		offNavMediator.publish('update:effect:2dPage',effeckt);
		setTimeout(_testChangePage,30);
	};


	$scope.$routeParams = $routeParams;


});
