(function() {
	'use strict';
	
	app.controller('LoginCtrl', function ($scope, $rootScope, $state, $window, AuthService, LoginForm) {
	    var lgn = this;
	    lgn.credentials = {};
	    lgn.loginForm = {};
	    lgn.error = false;
	    
	    
	    //when the form is submitted
	    lgn.submit = function () {
	        lgn.submitted = true;
	        if (lgn.loginForm.$valid) {
	            lgn.login(lgn.credentials);
	        } else {
	            lgn.error = true;
	            return;
	        }
	    };
	
	    //Performs the login function, by sending a request to the server with the Auth service
	    lgn.login = function (credentials) {
	        lgn.error = false;
	        AuthService.login(credentials, function(user) {
	            //success function
	            $state.go('dashboard');
	        }, function (err) {
	            console.log("error: " + JSON.stringify(err));
	            lgn.error = true;
	            lgn.errorMsg = err;
	        });
	    };
	    
	    lgn.schema = LoginForm;
	    lgn.credentials = {};
	    lgn.form = [
	        {
	            "key": "user",
	            "title": "Usuário"
	        },
	        {
	            "key": "password",
	            "type": "password",
	            "title": "Senha"
	        },        
	        {
	            "type": "submit",
	            "value": "Login",
	    	    "style": "btn-info",
	            "title": "Entrar"
	        }
	    ];
	
	    // if a session exists for current user (page was refreshed)
	    // log him in again
	    if ($window.sessionStorage.getItem("userInfo")) {
	        //var credentials = JSON.parse($window.sessionStorage.getItem("userInfo"));
	        var credentials = JSON.parse($window.sessionStorage.getItem("sessionData"));
	        var credentials = {
	            user: credentials.user,
	            password: credentials.password
	        };
	        lgn.login(credentials);
	    }
	});
	app.constant('LoginForm', {
	    type: 'object',
	    title: 'Login',
	    properties: {
	        user: {
	            type: 'string',
	            title: 'User'
	        },
	        password: {
	            type: 'string',
	            title: 'Password'
	        }
	    },
	    required: [
	        "user",
	        "password"
	  ]
	});
})();