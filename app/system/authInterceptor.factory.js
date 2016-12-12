(function() {
	'use strict';
	/**
	 * This interceptor will make sure that, after each $http request
	 * if the user doesn't have access to something runs the according
	 * event, given the response status codes from the server. 
	 */
	app.factory('AuthInterceptor', function($rootScope, $q, Session, AUTH_EVENTS, APP_DATA) {
		return {
			responseError : function(response) {
				$rootScope.$broadcast({
					401 : AUTH_EVENTS.notAuthenticated,
					403 : AUTH_EVENTS.notAuthorized,
					419 : AUTH_EVENTS.sessionTimeout,
					440 : AUTH_EVENTS.sessionTimeout
				}[response.status], response);
				return $q.reject(response);
			},
	        request: function(config) {
	            config.headers = config.headers || {};
	            config.headers.Authorization = APP_DATA.appName;
	            return config;
	        }
		};
	});
})();