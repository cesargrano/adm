(function() {
	
	'use strict';
	
	app.controller('DetailCtrl', function($scope, $http, $state, $window, FunctionsService, DetailService, TRANSACTION_TYPE, APP_DATA, row, entity, table){
		var ctrl = this;
		
		var master = row.entity;
	
		ctrl.gridOptions = DetailService.gridOptions;
		
		DetailService.entity = entity;
		DetailService.table = table;

		ctrl.insert = FunctionsService.insert;
		ctrl.update = FunctionsService.update;
		ctrl.delete = FunctionsService.delete;
		
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
			FunctionsService.transaction(master, 'GET', 'table', trt, entity, table, function(result){
				ctrl.gridOptions.columnDefs = result.data.columnDefs;
				ctrl.gridOptions.data = result.data.data;
				ctrl.title = result.data.title;
				ctrl.simpleTitle = result.data.simpleTitle;
				DetailService.title = result.data.title;
				DetailService.simpleTitle = result.data.simpleTitle;
				DetailService.selectBuffers = result.data.selectBuffers;
				DetailService.masterColumn = result.data.masterColumn;
				DetailService.masterColumnValue = master[result.data.masterColumn];
				DetailService.insertBuffer = result.data.insertBuffer.data[0];
				
			}, function(err){
				//do something if Error();
				console.log(err);
			});

		};
		return ctrl.read();

	});
	app.controller('ModalInsertDetailCtrl',function ($uibModalInstance, FunctionsService, DetailService, TRANSACTION_TYPE) {
		var ctrl = this;
		
		ctrl.titleType = "Novo";
		ctrl.simpleTitle = DetailService.simpleTitle;
		ctrl.selectBuffers = DetailService.selectBuffers;
		
		ctrl.gridOptions = DetailService.gridOptions;
		ctrl.entity = DetailService.insertBuffer;
		ctrl.entity[DetailService.masterColumn] = DetailService.masterColumnValue;

		ctrl.selectOnChange = FunctionsService.selectOnChange;
		ctrl.save = function () {
			var trt = TRANSACTION_TYPE.insert;

			FunctionsService.transaction(ctrl.entity, 'POST', 'save', trt, DetailService.entity, DetailService.table, function(result){
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
	app.controller('ModalUpdateDetailCtrl',function ($uibModalInstance, grid, row, FunctionsService, DetailService, TRANSACTION_TYPE) {
		var ctrl = this;
		
		ctrl.titleType = "Edição";
		ctrl.simpleTitle = DetailService.simpleTitle;
		ctrl.selectBuffers = DetailService.selectBuffers;

		ctrl.gridOptions = DetailService.gridOptions;
		ctrl.entity = angular.copy(row.entity);
		
		ctrl.selectOnChange = FunctionsService.selectOnChange;
		ctrl.save = function () {
			// Copy row values over
			row.entity = angular.extend(row.entity, ctrl.entity);
			var trt = TRANSACTION_TYPE.update;
			var entity = row.entity;
			FunctionsService.transaction(entity, 'POST', 'save', trt, DetailService.entity, DetailService.table, function(result){
				//Success();
				//console.log(result);
			}, function(err){
				//do something if Error();
				console.log(err);
			});
			$uibModalInstance.close(row.entity);
		};
	});
	app.controller('ModalDeleteDetailCtrl',function ($uibModalInstance, grid, row, DetailService, TRANSACTION_TYPE) {
		var ctrl = this;
		ctrl.gridOptions = DetailService.gridOptions;
		ctrl.entity = angular.copy(row.entity);
		ctrl.delete = function () {
			// Copy row values over
			row.entity = angular.extend(row.entity, ctrl.entity);
			var trt = TRANSACTION_TYPE.delete;
			var data = row.entity;
			FunctionsService.transaction(data, 'POST', 'save', trt, DetailService.entity, DetailService.table, function(result){
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