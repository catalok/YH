'use strict';
/* global classie,Modernizr,$ */
angular.module('yhApp')

.factory('_doTransEnd', function () {
	function _doTransEnd(element, endFn, maxTime, type){
		var doneTsk = false;
		var _handleTransitionEnd = function (evt){
			if (!doneTsk){
				if (type && evt.target === element && evt.propertyName.indexOf(type) !== -1){
					console.dir(evt);

					doneTsk = true;
					endFn(evt);
					element.removeEventListener('transitionend',_handleTransitionEnd);
				}
			}
		};
		// safynet if the tranns event is not fired.
		setTimeout(function endFn(){
			if (!doneTsk){
				doneTsk = true;
				endFn(null);
				element.removeEventListener('transitionend',_handleTransitionEnd);
			}
		}, maxTime || 1500);

		element.addEventListener('transitionend',_handleTransitionEnd,false);
	}
	return _doTransEnd;
})
.factory('deviceChecker', function () {


	return {

		iosCheck: function () {
			// http://coveroverflow.com/a/11381730/989439
			var check = false;
			var userAgent = navigator.userAgent||navigator.vendor||window.opera;
			if(userAgent.toLowerCase().match(/(ipad|iphone|ipod)/g)){
				check = true;
			}
			return check;
		},

		checkAndroid: function (){
			var check = false;
			var userAgent = navigator.userAgent||navigator.vendor||window.opera;
			if(userAgent.toLowerCase().indexOf('android') > -1){
				check = true;
			}
			return check;
		},

		mobileCheck: function () {
			var check = false;
			(function(a){
				if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))){
					check = true;
				}
			})(navigator.userAgent||navigator.vendor||window.opera);
			return check;
		}
	};
})
.factory('isMobile', function (deviceChecker) {


	var isIOS = deviceChecker.iosCheck();
	if (isIOS){
		classie.addClass(document.documentElement, 'ios');
	}


	var isAndroid = deviceChecker.checkAndroid();
	if (isAndroid){
		classie.addClass(document.documentElement, 'android');
	}



	var isMobile = deviceChecker.mobileCheck();


	if (isIOS){
		isMobile = true;
	}

	if (!isMobile){
		classie.addClass(document.documentElement, 'desktop');
	}else{
		classie.addClass(document.documentElement, 'mobile');
	}



	return isMobile;
})


.factory('animationClass', function (isMobile, deviceChecker) {

	var list = {
		lok3dPages : [
			'lok-3d-page-minimize',
			'lok-3d-page-zoom',
			'lok-3d-page-migrate',
			'lok-3d-page-flip',
			'lok-3d-page-card-move',
			'lok-3d-page-card-fall',
			'lok-3d-page-slide'
		],
		lok2dPages: [
			'lok-2d-page-zoom',
			'lok-2d-page-fade',
			'lok-2d-page-preview-move'
		],
		lokMenus: [
			'lok-menu-1by1-dive-in',
			'lok-menu-1by1-flip',
			'lok-menu-1by1-fade',
			'lok-menu-1by1-scale'
		]
	};


	var chosenOne;
	if (isMobile){
		if (deviceChecker.checkAndroid()){
			//android
			chosenOne = {
				lok3dPage: list.lok3dPages[0],
				lok2dPage: list.lok2dPages[1],
				lokMenu: list.lokMenus[1],
			};

		}else{
			//other than andorid
			chosenOne = {
				lok3dPage: list.lok3dPages[1],
				lok2dPage: list.lok2dPages[1],
				lokMenu: list.lokMenus[1],
			};
		}
	}else{
		//destop
		chosenOne = {
			lok3dPage: list.lok3dPages[0],
			lok2dPage: list.lok2dPages[0],
			lokMenu: list.lokMenus[0],
		};
	}



	return {
		list: list,
		chosenOne: chosenOne
	};
})


.factory('clickEvent', function (isMobile) {
	return isMobile ? 'touchstart' : 'click';
})
.factory('mouseupEvent', function (isMobile) {
	return isMobile ? 'touchend' : 'click';
})


.factory('Mediator', function(){
	//http://carldanley.com/js-mediator-pattern/

	// var noop = function(){};
	// var console = { log: noop};

	function Mediator() {
		this._topics = {};
	}
	Mediator.prototype.subscribe = function mediatorSubscribe( topic, callback ) {
		if( ! this._topics.hasOwnProperty( topic ) ) {
			this._topics[ topic ] = [];
		}
		this._topics[ topic ].push( callback );
		return true;
	};
	Mediator.prototype.unsubscribe = function mediatorUnsubscrive( topic, callback ) {
		if( ! this._topics.hasOwnProperty( topic ) ) {
			return false;
		}
		for( var i = 0, len = this._topics[ topic ].length; i < len; i++ ) {
			if( this._topics[ topic ][ i ] === callback ) {
				this._topics[ topic ].splice( i, 1 );
				return true;
			}
		}
		return false;
	};
	Mediator.prototype.publish = function mediatorPublish() {
		var args = Array.prototype.slice.call( arguments );
		var topic = args.shift();
		if( ! this._topics.hasOwnProperty( topic ) ) {
			return false;
		}
		for( var i = 0, len = this._topics[ topic ].length; i < len; i++ ) {
			this._topics[ topic ][ i ].apply( null, args );
			// console.log(topic, this._topics[ topic ][ i ]);
		}
		return true;
	};

	Mediator.prototype.trigger = Mediator.prototype.publish;
	Mediator.prototype.on = Mediator.prototype.subscribe;
	Mediator.prototype.off = Mediator.prototype.unsubscribe;

	return Mediator;
})

.factory('offNavMediator',function(Mediator, $injector){
	function OffNavMediator(){
		Mediator.call(this);
	}

	OffNavMediator.prototype = Object.create(Mediator.prototype);

	OffNavMediator.prototype.init = function(){
		$injector.get('scrollRestoreService').scrollRestore.apply(this,arguments);
	};
	var offNavMediator = new OffNavMediator();

	offNavMediator.init(offNavMediator);

	return offNavMediator;
})


.factory('scrollRestoreService', function($rootScope, isMobile, $location){

	return {
		scrollRestore: function(offNavMediator){

			if ($('html').hasClass('no-csstransforms')){ return; }

			var noop = function(){};
			var console = {log:noop};

			var menuOpened = false,
				canSaveScroll = true,
				scrollPos = {},
				curPath = $location.path()
			;

			//default
			$rootScope.restoreScroll = true;

			var _saveMenuClose = function(){
				menuOpened = true;
			};
			var _saveMenuOpen = function(){
				menuOpened = false;
			};

			var _pauseSave = function(){
				canSaveScroll = false;
			};

			var _resumeSave = function(){
				canSaveScroll = true;
			};

			var _saveScroll = function(){
				scrollPos[curPath] = window.scrollY;
				console.log('save:',curPath,':',scrollPos[curPath]);
			};

			var _resumeScroll = function(){
				if ($rootScope.restoreScroll){
					var result = scrollPos[curPath] ? scrollPos[curPath] : 0;
					window.scrollTo(0,result);
					console.log('restore:',curPath,':',result);
				}
			};

			var _updateCurPage = function(){
				curPath = $location.path();
			};

			//save scroll while scrolling
			window.addEventListener('scroll', function(){
				if (canSaveScroll){
					_saveScroll();
				}
			},false);

			offNavMediator.on('menu:open:before', function(){
				_pauseSave();
				_saveMenuClose();
			});
			offNavMediator.on('route:start', function(){
				_updateCurPage();
				if (!menuOpened){
					_pauseSave();
				}
			});
			offNavMediator.on('view:ready', function(){
				if (!menuOpened){
					setTimeout(_resumeScroll,100);
					setTimeout(_resumeSave,120);
				}
			});
			offNavMediator.on('menu:close:after', function(){
				_saveMenuOpen();
				_resumeScroll();
				setTimeout(_resumeSave,100);
			});


		}
	};
})

.directive('lokContainer', function (clickEvent, offNavMediator, _doTransEnd, animationClass) {

	return {
		restrict: 'C',
		controllerAs: 'container',
		controller: function ($scope, $element) {
			var timer = [0];

			var _hasParentClass = function ( eTarget, classname ) {
				if(eTarget === document){ return false; }
				if( classie.has( eTarget, classname ) ) {
					return true;
				}
				return eTarget.parentNode && _hasParentClass( eTarget.parentNode, classname );
			};

			var _closeMenu = function(evt){
				if (!_hasParentClass(evt.target, 'lok-nav')){
					offNavMediator.publish('menu:close');
				}
			};

			var _onOpenMenu = function(){
				offNavMediator.publish('menu:open:before');

				setTimeout(function(){
					$element[0].addEventListener(clickEvent, _closeMenu,true);
					$element.addClass('lok-lock-scroll');
				},0);

				setTimeout(function(){
					window.requestAnimationFrame(function(){
						$element.addClass('lok-open-menu');
					});
				},25);
			};

			var _onCloseMenu = function(){
				timer[0] = setTimeout(_onAfterCloseMenu,700);
				$element[0].removeEventListener(clickEvent, _closeMenu, true);
				$element.removeClass('lok-open-menu');
			};

			var _onAfterCloseMenu = function (){
				$element.removeClass('lok-lock-scroll');
				window.requestAnimationFrame(function(){
					offNavMediator.publish('menu:close:after');
				});
			};



			var _scrollRestore = function(data){
				window.scrollTo(0,data.pos);
				console.log('restore');
			};

			offNavMediator.on('menu:open', _onOpenMenu);
			offNavMediator.on('menu:close', _onCloseMenu);
			offNavMediator.on('scroll:restore', _scrollRestore);


			//swipe to open menu
			var _swipeToOpenMenu = function(){
				console.log('swipeOpenMenu');
				if (Modernizr.touch){
					offNavMediator.publish('menu:open');
				}
			};
			$scope.swipeOpenMenu = _swipeToOpenMenu;

			//page effeckts
			$scope.__pageTranSel = animationClass.list;
			$scope.__curPageTran = animationClass.chosenOne;


			//page effeckts
			offNavMediator.on('update:effect:3dPage',function(effeckt){
				$scope.__curPageTran.lok3dPage = effeckt;
			});
			offNavMediator.on('update:effect:2dPage',function(effeckt){
				$scope.__curPageTran.lok2dPage = effeckt;
			});
			offNavMediator.on('update:effect:menu',function(effeckt){
				$scope.__curPageTran.lokMenu = effeckt;
			});


		}
	};
})

.directive('lokNavTrigger', function (clickEvent, offNavMediator) {

	return {
		restrict: 'C',
		controller: function ($scope, $element) {

			var _onClickMenuBtn = function(){
				offNavMediator.publish('menu:open');
			};

			$element[0].addEventListener(clickEvent, _onClickMenuBtn,true);

			offNavMediator.publish('menu:open');

			// $element[0].addEventListener('mouseover',_onClickMenuBtn);
		}
	};
})
.directive('lokMenuBtn', function (clickEvent, offNavMediator, $rootScope) {
	return {
		restrict: 'C',
		controller: function ($scope, $element) {

			var _onOpenMenu = function btnOpen(){
				classie.addClass($element[0],'lok-open-menu');
			};

			var _onCloseMenu = function btnClose(){
				classie.removeClass($element[0],'lok-open-menu');
			};

			offNavMediator.on('menu:open', _onOpenMenu);
			offNavMediator.on('menu:close', _onCloseMenu);

			var _onClickMenuBtn = function(){
				offNavMediator.publish('menu:open');
			};

			$rootScope.openMenu = _onClickMenuBtn;

			$element[0].addEventListener(clickEvent, _onClickMenuBtn,true);
			$scope.$on('$destroy',function(){
				$element[0].removeEventListener(clickEvent, _onClickMenuBtn);
			});



		}
	};
})

.directive('lokMenuBtnClose', function (clickEvent, offNavMediator) {
	return {
		restrict: 'C',
		controller: function ($scope, $element) {
			//close button
			var _onClickMenuBtnClose = function(){
				offNavMediator.publish('menu:close');
			};
			$element[0].addEventListener(clickEvent, _onClickMenuBtnClose,true);
			$scope.$on('$destroy',function(){
				$element[0].removeEventListener(clickEvent, _onClickMenuBtnClose);
			});
		}
	};
})
.directive('lokNavItem', function (mouseupEvent) {
	function _makeLinkFaster(evt) {
		//delegate
		if(evt.target && evt.target.nodeName === 'A' && evt.target.href && !!!evt.target.attributes.closebtn) {
			evt.preventDefault();
			evt.stopPropagation();
			window.location.assign(evt.target.href);
		}
	}

	return {
		restrict: 'C',
		controller: function ($scope, $element) {
			$element[0].addEventListener(mouseupEvent, _makeLinkFaster,true);
			$scope.$on('$destroy',function(){
				$element[0].removeEventListener(mouseupEvent, _makeLinkFaster);
			});
		},
	};
})

.directive('activeLink', function ($location) {
	return {
		scope: {},
		//http://jsfiddle.net/p3ZMR/3/
		restrict: 'A',
		link: function(scope, element, attrs) {
			var activeClass = attrs.activeLink;

			var ngHref = element.attr('ng-href');
			var href = element.attr('href');

			var path = href || ngHref;

			//detelte hashbang
			if (path.indexOf('#') === 0){
				path = path.substring(1);
			}

			//detelte hashbang
			if (path.indexOf('!') === 0){
				path = path.substring(1);
			}


			//activeLink
			scope.location = $location;
			scope.$watch('location.path()', function(newPath) {


				if (newPath.indexOf('#') !== -1){
					newPath = newPath.substring(1);
				}

				if (path === newPath) {
					element.addClass(activeClass);
				} else {
					element.removeClass(activeClass);
				}
			});

		}
	};
});

