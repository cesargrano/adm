(function() {
	
	'use strict';
	
	app.factory('UsersFactory', function ($rootScope, $http, $state, $window, Session, APP_DATA, AUTH_EVENTS, $uibModal) {
		var usersFactory = {};
	
		usersFactory.transaction = function(data, mthd, rest, trt, success, error){
			$http({
				method: mthd,
				url: APP_DATA.serverPath+rest,
				params: {
					prefix: APP_DATA.prefix,
					entity: $state.current.data.entity,
					tb: $state.current.data.table,
					trt: trt
				},
				data: {"data": [data]}
			}).then(function successCallback(response){
				success(response);
				//console.log(response);
			}, function errorCallback(error){
				error;
			});
		};
		usersFactory.insert = function (url, ctrl) {
			$uibModal.open({
				templateUrl: url, //'app/infra/users/usersModal.html',
				controller: ctrl, //'ModalInsertUserCtrl',
				controllerAs: 'ctrl'
			});
		};
		usersFactory.update = function (url, ctrl, grid, row) {
			$uibModal.open({
				templateUrl: url, //'app/infra/users/usersModal.html',
				controller: ctrl, //'ModalUpdateUserCtrl',
				controllerAs: 'ctrl',
				resolve: {
					grid: function () { return grid; },
					row: function () { return row; }
				}
			});
		};
		usersFactory.delete = function (url, ctrl, grid, row) {
			$uibModal.open({
				templateUrl: url, //'app/views/deleteModal.html',
				controller: ctrl, //'ModalDeleteUserCtrl',
				controllerAs: 'ctrl',
				resolve: {
					grid: function () { return grid; },
					row: function () { return row; }
				}
			});
		};
		
	//	var width = angular.element(document.getElementsByClassName('grid')[0].parentElement.offsetWidth);
	//	angular.element(document.getElementsByClassName('grid')[0]).css('width', width + 'px');
		
		usersFactory.gridOptions = {
			enableSorting: false,
			enableColumnMenus: false,
	//		useExternalPagination: true,
	//		useExternalSorting: true,
	//		showGridFooter: false,
	//		showColumnFooter: true,
			paginationPageSize: 15,
			enableRowSelection: true,
			enableRowHeaderSelection: false,
			multiSelect: false,
			onRegisterApi: function (gridApi, registerGridApi){
				usersFactory.gridApi = gridApi;
				usersFactory.registerGridApi = registerGridApi;
			}
		};
		
		usersFactory.groupUserOnChange = function(item, display, entity, field) {
			entity[field] = item[display];
		};
		
		usersFactory.openDetail = function (url, ctrl, grid, row) {
			$uibModal.open({
				templateUrl: url, //'app/infra/users/usersEmailModal.html',
				controller: ctrl, //'UsersEmailCtrl',
				controllerAs: 'ctrl',
				resolve: {
					grid: function () { return grid; },
					row: function () { return row; }
				}
			});
		};
		

		
		return usersFactory;
	});
})();