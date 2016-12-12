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
					entity: usersFactory.entity,
					tb: usersFactory.table,
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
		usersFactory.create = function () {
			$uibModal.open({
				templateUrl: 'app/views/createModal.html',
				controller: 'ModalCreateUserCtrl',
				controllerAs: 'ctrl'
			});
		};
		usersFactory.update = function (grid, row) {
			$uibModal.open({
				templateUrl: 'app/views/editModal.html',
				controller: 'ModalUpdateUserCtrl',
				controllerAs: 'ctrl',
				resolve: {
					grid: function () { return grid; },
					row: function () { return row; }
				}
			});
		};
		usersFactory.delete = function (grid, row) {
			$uibModal.open({
				templateUrl: 'app/views/deleteModal.html',
				controller: 'ModalDeleteUserCtrl',
				controllerAs: 'ctrl',
				resolve: {
					grid: function () { return grid; },
					row: function () { return row; }
				}
			});
		};
		
	//	var width = angular.element(document.getElementsByClassName('grid')[0].parentElement.offsetWidth);
	//	angular.element(document.getElementsByClassName('grid')[0]).css('width', width + 'px');
		
		usersFactory.gridOptions = {}
		
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
		//var columnSize = width[0]/usersFactory.gridOptions.columnDefs.length;
		
		usersFactory.groupUserOnChange = function(modelValue, form, model, field) {
			
			
			console.log("modelValue: " + modelValue);
			
			var titleMap = form.titleMap
			for (var i = 0; i < titleMap.length; i++) {
				if (titleMap[i].value == modelValue) {
					model[field] = titleMap[i].name;
					break;
				}
			}
		};
		
		return usersFactory;
	});
})();