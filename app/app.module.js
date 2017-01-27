var app = angular.module('adm',[ 'ui.router',
                                'ngCookies',
                                'ngAnimate',
                                'ngSanitize',
                                'ui.mask',
                                'ui.bootstrap',
                                'ui.grid',
                                'ui.grid.selection',
                                'ui.grid.pagination',
                                'ui.grid.autoResize',
                                'ui-notification',
                                'ui.select',
                                'ui.utils.masks',
                                'ui.tree'])
                                .filter('to_html', function($sce) { return $sce.trustAsHtml; })
                                .filter('phoneCellMaks', function () { 
								    return function (value) {
								    	var mask = "(" + value.substr(0, 2) + ") ";
								    	if (value.length == 10) {
								    		mask += value.substr(2, 4) + "-" + value.substr(6, 4);
								    	} else if (value.length == 11) {
								    		mask += value.substr(2, 5) + "-" + value.substr(7, 4);
								    	}
								        return mask;
								    }
                                });
