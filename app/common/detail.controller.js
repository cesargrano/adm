(function() {
	
	'use strict';
	
	app.controller('DetailCtrl', function($scope, $http, $state, $window, FunctionsService, DetailService, TRANSACTION_TYPE, APP_DATA, row, entity, table){
		var ctrl = this;
		
		FunctionsService.detail = true;

		var master = row.entity;

		ctrl.gridOptions = DetailService.gridOptions;
		ctrl.gridOptions.data = null;

		DetailService.entity = entity;
		DetailService.table = table;

		ctrl.insert = FunctionsService.insert;
		ctrl.edit = FunctionsService.edit;
		ctrl.delete = FunctionsService.delete;

		ctrl.executeString = function(body){
			  eval(body);
		};
			
		ctrl.getTableHeight = function() {
			var rowHeight = 30; // your row height
			var headerHeight = 30; // your header height
			
			var heightWindow = angular.element($window)[0].innerHeight - 117;
			var heightGrid = (ctrl.gridOptions.data.length + 2.12) * 30;
			
			if (heightGrid > heightWindow)
				heightGrid = heightWindow
			
			return {
				height: heightGrid + "px" 
			};
		};

		ctrl.read = function () {
			ctrl.error = false;
			ctrl.gridOptions.data = {};
			FunctionsService.transaction(master, 'GET', 'table', TRANSACTION_TYPE.read, entity, table, FunctionsService.debug, function(result){
				ctrl.gridOptions.columnDefs = result.data.columnDefs;
				ctrl.gridOptions.data = result.data.data;
				ctrl.title = result.data.title;
				ctrl.toolBar = result.data.toolBar;

				FunctionsService.htmlTemplateInsertEditDetail = result.data.htmlTemplateInsertEdit;
				FunctionsService.htmlTemplateDeleteDetail = result.data.htmlTemplateDelete;

				FunctionsService.htmlControllerInsertDetail = result.data.htmlControllerInsert;
				FunctionsService.htmlControllerEditDetail = result.data.htmlControllerEdit;
				FunctionsService.htmlControllerDeleteDetail = result.data.htmlControllerDelete;

				DetailService.title = result.data.title;
				DetailService.simpleTitle = result.data.simpleTitle;
				DetailService.displayModalDelete = result.data.displayModalDelete;
				DetailService.selectBuffers = result.data.selectBuffers;
				DetailService.masterColumn = result.data.masterColumn;
				DetailService.masterColumnValue = master[result.data.masterColumn];
				
				if (result.data.insertBuffer != undefined)
					DetailService.insertBuffer = result.data.insertBuffer.data[0];
				
				ctrl.gridApi = DetailService.gridApi;

			}, function(error){
				FunctionsService.message(error, 'glyphicon-warning-sign');
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
		ctrl.entity = angular.copy(DetailService.insertBuffer);
		ctrl.entity[DetailService.masterColumn] = DetailService.masterColumnValue;

		ctrl.selectOnChange = FunctionsService.selectOnChange;
		ctrl.save = function () {
			FunctionsService.transaction(ctrl.entity, 'POST', 'save', TRANSACTION_TYPE.insert, DetailService.entity, DetailService.table, FunctionsService.debug, function(result){
				//Success();
				console.log(result.data.data[0]);
				ctrl.gridOptions.data.push(result.data.data[0]);
			}, function(error){
				FunctionsService.message(error, 'glyphicon-warning-sign');
			});
			$uibModalInstance.close();
		};
	});
	app.controller('ModalEditDetailCtrl',function ($uibModalInstance, row, FunctionsService, DetailService, TRANSACTION_TYPE) {
		var ctrl = this;
		
		ctrl.titleType = "Edição";
		ctrl.simpleTitle = DetailService.simpleTitle;
		ctrl.selectBuffers = DetailService.selectBuffers;

		ctrl.gridOptions = DetailService.gridOptions;
		ctrl.entity = angular.copy(row[0]);
		
		ctrl.selectOnChange = FunctionsService.selectOnChange;
		ctrl.save = function () {
			// Copy row values over
			row[0] = angular.extend(row[0], ctrl.entity);
			FunctionsService.transaction(row[0], 'POST', 'save', TRANSACTION_TYPE.update, DetailService.entity, DetailService.table, FunctionsService.debug, function(result){
				//Success();
				//console.log(result);
			}, function(error){
				FunctionsService.message(error, 'glyphicon-warning-sign');
			});
			$uibModalInstance.close(row[0]);
		};
	});
	app.controller('ModalDeleteDetailCtrl',function ($uibModalInstance, row, FunctionsService, DetailService, TRANSACTION_TYPE) {
		var ctrl = this;
		ctrl.gridOptions = DetailService.gridOptions;
		ctrl.entity = angular.copy(row[0]);
		ctrl.simpleTitle = DetailService.simpleTitle;
		ctrl.displayModalDelete = ctrl.entity[DetailService.displayModalDelete];

		ctrl.delete = function () {
			// Copy row values over
			row[0] = angular.extend(row[0], ctrl.entity);
			FunctionsService.transaction(row[0], 'POST', 'save', TRANSACTION_TYPE.delete, DetailService.entity, DetailService.table, FunctionsService.debug, function(result){
				//Success();
				var index = ctrl.gridOptions.data.indexOf(row[0]);
				//console.log(index);
				ctrl.gridOptions.data.splice(index, 1);
			}, function(error){
				FunctionsService.message(error, 'glyphicon-warning-sign');
			});
			$uibModalInstance.close(row[0]);
		};
	});
})();