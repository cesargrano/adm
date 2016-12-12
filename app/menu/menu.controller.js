(function() {
	'use strict';
	
	app.controller('MenuCtrl', function (MenuFactory) {
	    var menu = this;
	    MenuFactory.getMenu(
	        function(success){
	            menu.itens = success;
	        },
	        function(error){
	            menu.errMsg = error.data;
	            window.refreshView();
	    });
	    menu.toggle = MenuFactory.toggle;
	    menu.isNavCollapsed = true;
	});
	app.controller('SideNavCtrl', function($window, MenuFactory){
	    var sideNav = this;
	    MenuFactory.getMenu(
	        function(success){
	            sideNav.itens = success;
	        },
	        function(error){
	            sideNav.errMsg = error.data;
	            window.refreshView();
	    });
	    sideNav.toggle = MenuFactory;
	
		sideNav.getWindowHeight = function() {
			var heightWindow = angular.element($window)[0].innerHeight - 52;
			return {
				height: heightWindow + "px" 
			};
		};
	});
})();