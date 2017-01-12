(function() {
	'use strict';
	
	app.config(function ($stateProvider, $urlRouterProvider, $locationProvider /*, USER_ROLES*/) {
	    //
	    // For any unmatched url, redirect to /login
	    $urlRouterProvider.otherwise("/login");
	    //
	    // Now set up the states
	    $stateProvider
	        .state('login', {
	            url: "/login",
	            templateUrl: "app/login/login.html",
	            data: {
	                title: 'Login'
	                //authorizedRoles: [USER_ROLES.all, USER_ROLES.admin, USER_ROLES.editor, USER_ROLES.guest]
	            }
	        })
	        .state('/', {
	            url: "/dashboard",
	            templateUrl: "app/dashboard/dashboard.html",
	            data: {
	                title: 'Dashboard'
	                //authorizedRoles: [USER_ROLES.all]
	            }
	        })
	        .state('dashboard', {
	            url: "/dashboard",
	            templateUrl: "app/dashboard/dashboard.html",
	            data: {
	                title: 'Dashboard'
	                //authorizedRoles: [USER_ROLES.all]
	            }
	        })
	        .state('Users', {
	            url: "/users",
	            templateUrl: "app/infra/users/users.html",
	            data: {
	                title: 'Usuários',
	                title2: 'Usuário',
	                entity: 'Infra',
	                table: 'Users'
	            }
	        })
		    .state('EmailType', {
		        url: "/emailType",
		        templateUrl: "app/infra/users.html",
		        data: {
		            title: 'Tipos de Emails',
		            entity: 'Infra',
		            table: 'EmailType'
		        }
		    });
	    /*$locationProvider.html5Mode({
	        enable: true,
	        requireBase: false
	    });*/
	    //$locationProvider.html5Mode(true);
	});
})();