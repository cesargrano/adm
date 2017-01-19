(function() {
	
	'use strict';
	
	app.controller('MasterCtrl', function($scope, $http, $state, $window, FunctionsService, MasterService, TRANSACTION_TYPE){
		var ctrl = this;
	
		MasterService.entity = $state.current.data.entity;
		MasterService.table = $state.current.data.table
		
		ctrl.gridOptions = MasterService.gridOptions;

		ctrl.insert = FunctionsService.insert;
		ctrl.update = FunctionsService.update;
		ctrl.delete = FunctionsService.delete;
		ctrl.openDetail = FunctionsService.openDetail;
		
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
			FunctionsService.transaction(null, 'GET', 'table', trt, $state.current.data.entity, $state.current.data.table, function(result){
				ctrl.gridOptions.columnDefs = result.data.columnDefs;
				ctrl.gridOptions.data = result.data.data;
				ctrl.title = result.data.title;
				ctrl.simpleTitle = result.data.simpleTitle;
				MasterService.title = result.data.title;
				MasterService.simpleTitle = result.data.simpleTitle;
				MasterService.selectBuffers = result.data.selectBuffers;
				MasterService.insertBuffer = result.data.insertBuffer.data[0];
			}, function(err){
				//do something if Error();
				console.log(err);
			});
		};
		return ctrl.read();
		
	});
	
	app.controller('ModalInsertUserCtrl',function ($uibModalInstance, FunctionsService, MasterService, TRANSACTION_TYPE) {
		var ctrl = this;
		
		ctrl.titleType = "Novo";
		ctrl.simpleTitle = MasterService.simpleTitle;
		ctrl.selectBuffers = MasterService.selectBuffers;
		ctrl.gridOptions = MasterService.gridOptions;
		ctrl.entity = MasterService.insertBuffer;
		ctrl.selectOnChange = FunctionsService.selectOnChange;
		ctrl.save = function () {
			var trt = TRANSACTION_TYPE.insert;
			FunctionsService.transaction(ctrl.entity, 'POST', 'save', trt, MasterService.entity, MasterService.table, function(result){
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
	app.controller('ModalUpdateUserCtrl',function ($uibModalInstance, grid, row, FunctionsService, MasterService, TRANSACTION_TYPE) {
		var ctrl = this;
		
		ctrl.titleType = "Edição";
		ctrl.simpleTitle = MasterService.simpleTitle;
		ctrl.selectBuffers = MasterService.selectBuffers;

		ctrl.gridOptions = MasterService.gridOptions;
		ctrl.entity = angular.copy(row.entity);
		
		ctrl.selectOnChange = FunctionsService.selectOnChange;
		ctrl.save = function () {
			// Copy row values over
			row.entity = angular.extend(row.entity, ctrl.entity);
			var trt = TRANSACTION_TYPE.update;
			var entity = row.entity;
			FunctionsService.transaction(entity, 'POST', 'save', trt, MasterService.entity, MasterService.table, function(result){
				//Success();
				//console.log(result);
			}, function(err){
				//do something if Error();
				console.log(err);
			});
			$uibModalInstance.close(row.entity);
		};
	});
	app.controller('ModalDeleteUserCtrl',function ($uibModalInstance, grid, row, MasterService, TRANSACTION_TYPE) {
		var ctrl = this;
		ctrl.gridOptions = MasterService.gridOptions;
		ctrl.entity = angular.copy(row.entity);
		ctrl.delete = function () {
			// Copy row values over
			row.entity = angular.extend(row.entity, ctrl.entity);
			var trt = TRANSACTION_TYPE.delete;
			var data = row.entity;
			FunctionsService.transaction(data, 'POST', 'save', trt, MasterService.entity, MasterService.table, function(result){
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