

(function(){
	'use strict';
	var hash = window.location.hash;
	if (hash.indexOf('#/') !== -1){
		hash = hash.replace('#/','');
		window.location.assign('#!/'+hash);
	}
}());

(function(){
	'use strict';

	/* global NProgress */
	var app = angular.module('yhApp', [
		'ngCookies',
		'ngResource',
		'ngTouch',
		'ngSanitize',
		'ngAnimate',
		'ngRoute',
		'ngRoute',
		'hmTouchEvents'
	]);

	app.config(function ($routeProvider, $locationProvider) {
		$locationProvider.hashPrefix('!');

		$routeProvider
			.when('/', {
				templateUrl: 'views/main.html',
				controller: 'MainCtrl'
			})
			// .when('/work', {
			//   templateUrl: 'views/work.html',
			//   controller: 'WorkCtrl'
			// })
			// .when('/cv', {
			//   templateUrl: 'views/cv.html',
			//   controller: 'CvCtrl'
			// })

			.when('/settings', {
				templateUrl: 'views/settings.html',
				controller: 'SettingsCtrl'
			})
			.when('/contact', {
				templateUrl: 'views/contact.html',
				controller: 'ContactCtrl'
			})
			.when('/blog/:blogId', {
				templateUrl: 'views/blog.html',
				controller: 'BlogCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});

	});

	app.run(function($rootScope, offNavMediator){

		$rootScope.$on('$routeChangeStart',function(){
			NProgress.start();
			setTimeout(function(){
				offNavMediator.publish('route:start');
			});
		});

		$rootScope.$on('$routeChangeSuccess',function(){
			NProgress.done();
			setTimeout(function(){
				offNavMediator.publish('route:success');
			},100);
		});

		$rootScope.$on('$viewContentLoaded',function(){
			setTimeout(function(){
				offNavMediator.publish('view:ready');
			});
		});

		$rootScope.$on('$routeChangeFail',function(){
			offNavMediator.publish('route:fail');

			window.requestAnimationFrame(NProgress.done);
		});

	});


}());
