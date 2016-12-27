(function() {
	'use strict';
	
	app.controller('LoginCtrl', function ($scope, $rootScope, $state, $window, $sce, AuthService) {
	    var login = this;
	    login.credentials = {};
	    login.loginForm = {};
	    login.error = false;
	    
	    
	    //login.inputCPF = 'Cesar';
	    login.inputCPF = $sce.trustAsHtml('<input type="text" ng-model="cpf" ui-br-cpf-mask>');
	    
	    //when the form is submitted
	    login.submit = function () {
	        login.submitted = true;
	        if (login.loginForm.$valid) {
	            login.login(login.credentials);
	        } else {
	            login.error = true;
	            return;
	        }
	    };
	
	    //Performs the login function, by sending a request to the server with the Auth service
	    login.login = function (credentials) {
	        login.error = false;
	        AuthService.login(credentials, function(user) {
	            //success function
	            $state.go('dashboard');
	        }, function (err) {
	            console.log("error: " + JSON.stringify(err));
	            login.error = true;
	            login.errorMsg = err;
	        });
	    };
	    
	    login.credentials = {};
	    login.schema = {
    	    "type": "object",
    	    "title": "Login",
    	    "properties": {
    	        "teste": {
    	            "type": 'string',
    	            "title": "Teste",
    				"format": "cpf"
    	        },
    	        "user": {
    	            "type": 'string',
    	            "title": "Usuário"
    	        },
    	        "password": {
    	            "type": 'string',
    	            "title": 'Senha'
    	        }
    	    },
    	    "required": ["user", "password"]
	    };
	    login.form = [
	        {
	            "key": "teste"
	        },
	        {
	            "key": "user"
	        },
	        {
	            "key": "password",
	            "type": "password"
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
	        login.login(credentials);
	    }
	});
	app.constant('LoginForm', {
	    type: 'object',
	    title: 'Login',
	    properties: {
	        user: {
	            "type": 'string',
	            "title": 'User',
				"format": "br-phone"
	        },
	        password: {
	            "type": 'string',
	            "title": 'Password'
	        }
	    },
	    required: [
	        "user",
	        "password"
	  ]
	});
})();