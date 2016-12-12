(function() {
	'use strict';
	/* Adding the auth interceptor here, to check every $http request*/
	app.config(function ($httpProvider, APP_DATA) {
	    $httpProvider.interceptors.push(['$injector', function ($injector) {
	        return $injector.get('AuthInterceptor');
	    }]);
	});
})();