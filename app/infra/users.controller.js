(function() {
	
	'use strict';
	
	app.controller('UsersCtrl', function($scope, $rootScope, $http, $state, $window, UsersFactory, TRANSACTION_TYPE){
		var ctrl = this;
	
		UsersFactory.entity = $state.current.data.entity;
		UsersFactory.table = $state.current.data.table;
		UsersFactory.master = $state.current.data.master;
		UsersFactory.detail = $state.current.data.detail;
	
		ctrl.gridOptions = UsersFactory.gridOptions;
	
		$http.get($state.current.data.schemaForm).success(function(data) {
			$rootScope.schema = data.schema;
			$rootScope.schemaForm = data.form;
			ctrl.gridOptions.columnDefs = data.columnDefs;
		});
		
		ctrl.title = $state.current.data.title;
		ctrl.create = UsersFactory.create;
		ctrl.update = UsersFactory.update;
		ctrl.delete = UsersFactory.delete;
		
		ctrl.getTableHeight = function() {
			var rowHeight = 30; // your row height
			var headerHeight = 30; // your header height
			
			var heightWindow = angular.element($window)[0].innerHeight - 117;
			var heightGrid = (ctrl.gridOptions.data.length + 3.05) * 30;
			
			if (heightGrid > heightWindow)
				heightGrid = heightWindow
			
			return {
				height: heightGrid + "px" 
			};
		};
	
		ctrl.read = function () {
			ctrl.error = false;
			var trt = TRANSACTION_TYPE.read;
			UsersFactory.transaction(null, 'GET', 'table', trt, function(result){
				//Success();
				//console.log(result.data.form);
				
	//			ctrl.gridOptions.columnDefs = result.data.columnDefs;
				ctrl.gridOptions.data = result.data.data;
				//console.log(ctrl.gridOptions.onRegisterApi($scope.gridApi));
				//ctrl.height = (ctrl.gridOptions.data.length + 3.05) * 30;
	//			$rootScope.schema = result.data.schema;
	//			$rootScope.schemaForm = result.data.form;
			}, function(err){
				//do something if Error();
				console.log(err);
			});
		};
		return ctrl.read();
		
	});
	
	app.controller('ModalCreateUserCtrl',function ($uibModalInstance, $rootScope, UsersFactory, TRANSACTION_TYPE) {
		var ctrl = this;
		ctrl.schema = $rootScope.schema;
		ctrl.form = $rootScope.schemaForm;
		ctrl.gridOptions = UsersFactory.gridOptions;
		ctrl.entity = {};
		ctrl.groupUserOnChange = UsersFactory.groupUserOnChange; //(ctrl.entity, ctrl.modelValue, ctrl.form);
		ctrl.create = function () {
			var trt = TRANSACTION_TYPE.insert;
			UsersFactory.transaction(ctrl.entity, 'POST', 'save', trt, function(result){
				//Success();
				console.log(result.data.data[0]);
				ctrl.gridOptions.data.push(result.data.data[0]);
			}, function(err){
				//do something if Error();
				console.log(err);
			});
			$uibModalInstance.close();
		};
	});
	app.controller('ModalUpdateUserCtrl',function ($uibModalInstance, grid, row, $rootScope, UsersFactory, TRANSACTION_TYPE) {
		var ctrl = this;
		ctrl.schema = $rootScope.schema;
		ctrl.form = $rootScope.schemaForm;
		ctrl.gridOptions = UsersFactory.gridOptions;
		ctrl.entity = angular.copy(row.entity);
		ctrl.groupUserOnChange = UsersFactory.groupUserOnChange; //(ctrl.entity, ctrl.modelValue, ctrl.form);
		ctrl.update = function () {
			// Copy row values over
			row.entity = angular.extend(row.entity, ctrl.entity);
			var trt = TRANSACTION_TYPE.update;
			var entity = row.entity;
			UsersFactory.transaction(entity, 'POST', 'save', trt, function(result){
				//Success();
				console.log(result);
			}, function(err){
				//do something if Error();
				console.log(err);
			});
			$uibModalInstance.close(row.entity);
		};
	});
	app.controller('ModalDeleteUserCtrl',function ($uibModalInstance, grid, row, $rootScope, UsersFactory, TRANSACTION_TYPE) {
		var ctrl = this;
		ctrl.schema = $rootScope.schema;
		ctrl.form = $rootScope.schemaForm;
		ctrl.gridOptions = UsersFactory.gridOptions;
		ctrl.entity = angular.copy(row.entity);
		ctrl.delete = function () {
			// Copy row values over
			row.entity = angular.extend(row.entity, ctrl.entity);
			var trt = TRANSACTION_TYPE.delete;
			var data = row.entity;
			UsersFactory.transaction(data, 'POST', 'save', trt, function(result){
				//Success();
				var index = ctrl.gridOptions.data.indexOf(row.entity);
				//console.log(index);
				ctrl.gridOptions.data.splice(index, 1);
			}, function(err){
				//do something if Error();
				console.log(err);
			});
			$uibModalInstance.close(row.entity);
		};
	});
})();