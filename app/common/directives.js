(function() {
	'use strict';
	
	app.directive('toggleNav', function (MenuFactory) {
	
	    function link(scope, element) {
	        scope.toggleNav = function(){
	            MenuFactory.status = !MenuFactory.status;
	        }
	    }
	    return {
	        template: '<span class="hidden-xs"><i class="fa fa-bars" ng-click="toggleNav()"></i></span>',
	        restrict: 'E',
	        scope: {},
	        link: link
	    };
	});
	app.directive('focusMe', ['$timeout', function ($timeout) {
		return {
			restrict: 'A',
			link: function (scope, element, attrs) {
				$timeout(function () {
					element[0].focus();
				});
			}
		};
	}]);
})();