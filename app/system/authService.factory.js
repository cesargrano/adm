(function() {
	'use strict';
	
	app.factory('AuthService', function ($rootScope, $http, $window, Session, APP_DATA, AUTH_EVENTS) {
	    var authService = {};
	    
	    //the login function
	    authService.mockLogin = function(user, success, error) {
	        $http({
	            method: 'GET',
	            url: 'mocks/login.json',
	            params: {
	                app: APP_DATA.appName,
	                prefix: APP_DATA.prefix,
	                user: user.user,
	                password: user.password
	            }
	        }).then(function successCallback(response) {
	            var users = response.data;
	            //set the browser session, to avoid relogin on refresh
	            $window.sessionStorage.setItem("userInfo", JSON.stringify(users));
	            $window.sessionStorage.setItem("sessionData", JSON.stringify(response.config.params));
	
	            //whatever you prefer
	            Session.create(users);
	            //or
	            $rootScope.currentUser = Session.NAME;
	
	            //fire event of successful login
	            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
	            //run success function
	            success();
	        },function errorCallback(err) {
	            //OR ELSE
	            //unsuccessful login, fire login failed event for 
	            //the according functions to run
	            $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
	            error(err);
	        });
			
		};
	
	    
	    //the login function
	    authService.login = function(user, success, error) {
	        $http({
	            method: 'GET',
	            url: APP_DATA.serverPath + 'login',
	            params: {
	                app: APP_DATA.appName,
	                prefix: APP_DATA.prefix,
	                user: user.user,
	                password: user.password
	            }
	        }).then(function successCallback(response) {
	            var users = response.data;
	            //set the browser session, to avoid relogin on refresh
	            $window.sessionStorage.setItem("userInfo", JSON.stringify(users));
	            $window.sessionStorage.setItem("sessionData", JSON.stringify(response.config.params));
	
	            //whatever you prefer
	            Session.create(users);
	            //or
	            $rootScope.currentUser = Session.NAME;
	
	            //fire event of successful login
	            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
	            //run success function
	            success();
	        },function errorCallback(err) {
	            //OR ELSE
	            //unsuccessful login, fire login failed event for 
	            //the according functions to run
	            $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
	            error(err);
	        });
			
		};
	    
	    //check if the user is authenticated
	    authService.isAuthenticated = function () {
	        return !!Session.NAME;
	    };
	
	    //check if the user is authorized to access the next route
	    //this function can be also used on element level
	    //e.g. <p ng-if="isAuthorized(authorizedRoles)">show this only to admins</p>
	    /*authService.isAuthorized = function (authorizedRoles) {
	        if (!angular.isArray(authorizedRoles)) {
	            authorizedRoles = [authorizedRoles];
	        }
	        return (authService.isAuthenticated() &&
	            authorizedRoles.indexOf(Session.userRole) !== -1);
	    };*/
	
	    //log out the user and broadcast the logoutSuccess event
	    authService.logout = function () {
	        Session.destroy();
	        $window.sessionStorage.removeItem("userInfo");
	        $window.sessionStorage.removeItem("sessionData");
	        $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
	        console.info('Bye!');
	    }
	
	    return authService;
	});
})();