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
                                'ui.utils.masks'])
                                .filter('to_html', function($sce) { return $sce.trustAsHtml; });
