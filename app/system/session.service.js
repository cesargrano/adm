(function() {
	'use strict';
	
	/*
	 * In this service the user data is defined for the current session. Within
	 * angular current session is until the page is refreshed. When the page is
	 * refreshed the user is reinitialized through $window.sessionStorage at the
	 * login.js file.
	 */
	app.service('Session', function ($rootScope, USER_ROLES) {
	    this.create = function (users) {
	        //this.id = sessionId;
	        //this.userId = userId;
	        //this.userRole = userRole;
	        
	        // verificar quais itens necessitam na Session
	        this.BOSS = users.BOSS;
	        this.PREFIX = users.PREFIX;
	        this.ID_GROUP_USER = users.ID_GROUP_USER;
	        this.ID_COMPANY = users.ID_COMPANY;
	        this.MANAGER = users.MANAGER;
	        this.ID_USER = users.ID_USER;
	        this.NAME = users.NAME;
	        this.COMPANY = users.COMPANY;
	    };
	    this.destroy = function () {
	        //this.id = null;
	        //this.userId = null;
	        //this.userRole = null;
	        
	        // verificar quais itens necessitam na Session
	        this.BOSS = null;
	        this.PREFIX = null;
	        this.ID_GROUP_USER = null;
	        this.ID_COMPANY = null;
	        this.MANAGER = null;
	        this.ID_USER = null;
	        this.NAME = null;
	        this.COMPANY = null;
	    };
	    return this;
	});
})();