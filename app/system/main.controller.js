(function() {
	'use strict';
	
	app.controller('MainCtrl', function($scope, $rootScope, $document, $element, $state, AuthService, AUTH_EVENTS, USER_ROLES, MenuFactory){
	    var main = this;
	    main.toggle = MenuFactory;
	    $rootScope.enterFullScreen = function (argument) {
	        var conf = confirm("Para melhor desempenho do sistema recomendamos entrar em modo de tela cheia! \nDeseja entrar em tela cheia?");
	        var docElem = document.documentElement;
	        
	        var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
	        var fullscreenEnabled = document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled;
	
	        if (conf == true) {
	            if (docElem.requestFullscreen) {
	                docElem.requestFullscreen();
	            }
	            else if (docElem.mozRequestFullScreen) {
	                docElem.mozRequestFullScreen();
	            }
	            else if (docElem.webkitRequestFullScreen) {
	                docElem.webkitRequestFullScreen();
	            }
	            else if (docElem.msRequestFullscreen) {
	                docElem.msRequestFullscreen();
	            }
	        }
	    };
	    $rootScope.exitFullScreen = function () {
	        if(document.exitFullscreen) {
	            document.exitFullscreen();
	        } else if(document.mozCancelFullScreen) {
	            document.mozCancelFullScreen();
	        } else if(document.webkitExitFullscreen) {
	            document.webkitExitFullscreen();
	        }
	    };
	    
	    // this is the parent controller for all controllers.
		// Manages auth login functions and each controller
		// inherits from this controller	
		
		var showLogin = function(){
	        $state.go('login');
	    }
		var setCurrentUser = function(){
			$scope.currentUser = $rootScope.currentUser;
		}
		
		/*var showNotAuthorized = function(){
			alert("Not Authorized");
		}*/
		
		$scope.currentUser = null;
		$scope.userRoles = USER_ROLES;
		$scope.isAuthenticated = AuthService.isAuthenticated;
	
		//listen to events of unsuccessful logins, to run the login dialog
		/*$rootScope.$on(AUTH_EVENTS.notAuthorized, showNotAuthorized);*/
		$rootScope.$on(AUTH_EVENTS.notAuthenticated, showLogin);
		$rootScope.$on(AUTH_EVENTS.sessionTimeout, showLogin);
		$rootScope.$on(AUTH_EVENTS.logoutSuccess, showLogin);
		$rootScope.$on(AUTH_EVENTS.loginSuccess, setCurrentUser);
		
	});
	
	/**
	 *
	 * globalFuncions.js
	 *
	 * Contains functions that are added to the root AngularJs scope.
	 */
	app.run(function ($rootScope, $state, AuthService, AUTH_EVENTS) {
	
	    //before each state change, check if the user is logged in
	    //and authorized to move onto the next state
	    $rootScope.$on('$stateChangeStart', function (event, next) {
	        /*var authorizedRoles = next.data.authorizedRoles;
	        if (!AuthService.isAuthorized(authorizedRoles) && next.url !== "/login") {
	            event.preventDefault();
	            if (AuthService.isAuthenticated()) {
	                // user is not allowed
	                $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
	            } else {
	                // user is not logged in
	                $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
	            }
	        }*/
	        $rootScope.$state = $state;
	        
	        if (!AuthService.isAuthenticated() && next.url !== "/login") {
	            event.preventDefault();
	            // user is not logged in
	            $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
	        }
	    });
	
	    /* To show current active state on menu */
	    $rootScope.getClass = function (path) {
	        if ($state.current.name == path) {
	            return "active";
	        } else {
	            return "";
	        }
	    }
	
	    $rootScope.logout = function () {
	        AuthService.logout();
	    };
	
	});
})();