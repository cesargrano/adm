(function() {
	
	'use strict';
	
	app.controller('UsersCtrl', function($scope, $rootScope, $http, $state, $window, UsersFactory, TRANSACTION_TYPE){
		var ctrl = this;
	
		UsersFactory.entity = $state.current.data.entity;
		UsersFactory.table = $state.current.data.table;
		UsersFactory.master = $state.current.data.master;
		UsersFactory.detail = $state.current.data.detail;
	
		ctrl.gridOptions = UsersFactory.gridOptions;
	
		ctrl.title = $state.current.data.title;
		ctrl.title2 = $state.current.data.title2;
		$rootScope.title = ctrl.title;
		$rootScope.title2 = ctrl.title2;

		ctrl.insert = UsersFactory.insert;
		ctrl.update = UsersFactory.update;
		ctrl.delete = UsersFactory.delete;
		ctrl.openDetail = UsersFactory.openDetail;
		
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
				ctrl.gridOptions.columnDefs = result.data.columnDefs;
				ctrl.gridOptions.data = result.data.data;
				$rootScope.selectbuffers = result.data.selectbuffers;

				//console.log(ctrl.gridOptions.onRegisterApi($scope.gridApi));
				//ctrl.height = (ctrl.gridOptions.data.length + 3.05) * 30;
				
			}, function(err){
				//do something if Error();
				console.log(err);
			});
		};
		return ctrl.read();
		
	});
	
	app.controller('ModalInsertUserCtrl',function ($uibModalInstance, $rootScope, UsersFactory, TRANSACTION_TYPE) {
		var ctrl = this;
		
		ctrl.titleType = "Novo";
		ctrl.title2 = $rootScope.title2;
		ctrl.selectbuffers = $rootScope.selectbuffers;

		ctrl.gridOptions = UsersFactory.gridOptions;
		ctrl.entity = {};
		
		ctrl.groupUserOnChange = UsersFactory.groupUserOnChange;
		ctrl.save = function () {
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
		
		ctrl.isValid = function () {
			return ctrl.entity.NAME && ctrl.entity.LOGIN && ctrl.entity.PASSWORD && ctrl.entity.EMAIL && ctrl.entity.MOBILE;
	    };

	});
	app.controller('ModalUpdateUserCtrl',function ($uibModalInstance, grid, row, $rootScope, UsersFactory, TRANSACTION_TYPE) {
		var ctrl = this;
		
		ctrl.titleType = "Edição";
		ctrl.title2 = $rootScope.title2;
		ctrl.selectbuffers = $rootScope.selectbuffers;

		ctrl.gridOptions = UsersFactory.gridOptions;
		ctrl.entity = angular.copy(row.entity);
		
		ctrl.groupUserOnChange = UsersFactory.groupUserOnChange;
		ctrl.save = function () {
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
		
		ctrl.isValid = function () {
			return ctrl.entity.NAME && ctrl.entity.LOGIN && ctrl.entity.PASSWORD && ctrl.entity.EMAIL && ctrl.entity.MOBILE;
	    };
	});
	app.controller('ModalDeleteUserCtrl',function ($uibModalInstance, grid, row, $rootScope, UsersFactory, TRANSACTION_TYPE) {
		var ctrl = this;
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