(function() {
	
	'use strict';
	
	app.service('FunctionsService', function ($http, $state, $window, Session, APP_DATA, AUTH_EVENTS, $uibModal) {
	
		var functionsService = this;
		
		functionsService.transaction = function(data, mthd, rest, trt, entity, table, success, error){
			$http({
				method: mthd,
				url: APP_DATA.serverPath+rest,
				params: {
					prefix: APP_DATA.prefix,
					entity: entity,
					tb: table,
					trt: trt,
					data: data
				},
				data: data
			}).then(function successCallback(response){
				success(response);
				//console.log(response);
			}, function errorCallback(error){
				error;
			});
		};
		functionsService.insert = function (url, ctrl) {
			$uibModal.open({
				templateUrl: url, //'app/infra/users/usersModal.html',
				controller: ctrl, //'ModalInsertUserCtrl',
				controllerAs: 'ctrl'
			});
		};
		functionsService.update = function (url, ctrl, grid, row) {
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
		functionsService.delete = function (url, ctrl, grid, row) {
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
		
		functionsService.selectOnChange = function(item, display, entity, field) {
			entity[field] = item[display];
		};
		
		
		functionsService.openDetail = function (url, ctrl, entity, table, grid, row) {
			$uibModal.open({
				templateUrl: url, //'app/infra/users/usersEmailModal.html',
				controller: ctrl, //'UsersEmailCtrl',
				controllerAs: 'ctrl',
				resolve: {
					entity: function () { return entity; },
					table: function () { return table; },
					grid: function () { return grid; },
					row: function () { return row; }
				}
			});
		};
	});
})();