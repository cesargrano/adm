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
	    menu.toggleNav = MenuFactory.toggleNav;
	    menu.isNavCollapsed = true;
	});
	app.controller('SideNavCtrl', function($window, MenuFactory){
	    var ctrl = this;
	    
	    MenuFactory.getMenu(
	        function(result){
	            ctrl.data = result;
	        },
	        function(error){
	            ctrl.errMsg = error.data;
	            window.refreshView();
	    });
	    ctrl.toggleNav = MenuFactory;
	
		ctrl.getWindowHeight = function() {
			var heightWindow = angular.element($window)[0].innerHeight - 52;
			return {
				height: heightWindow + "px" 
			};
		};
		
		ctrl.toggle = function (scope) {
			if (scope.$$ChildScope == null)
				ctrl.toggleNav.status = true;
			
			scope.toggle();
		};
		
	});
})();