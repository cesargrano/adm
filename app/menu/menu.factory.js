(function() {
	'use strict';
	
	app.factory('MenuFactory', function ($http, Session, APP_DATA, AUTH_EVENTS) {
	    var menuFactory = {};
	    
	    menuFactory.getMenu = function (success, error){
	        $http({
	            method: 'GET',
	            url: APP_DATA.serverPath+'menu',
	            params: {
	                app: APP_DATA.appName,
	                prefix: APP_DATA.prefix,
	                id_group_user: Session.ID_GROUP_USER
	            }
	        }).then(function successCallback(response) {
	            // this callback will be called asynchronously
	            // when the response is available
	            //console.log(JSON.stringify(response.data));
	            success(response.data.data);
	        }, function errorCallback(response) {
	            // called asynchronously if an error occurs
	            // or server returns response with an error status.
	            error;
	        });
	    };
	    menuFactory.status = true;
	    
	    return menuFactory;
	});
})();