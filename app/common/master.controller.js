(function() {
	
	'use strict';
	
	app.controller('MasterCtrl', function($scope, $http, $state, $window, FunctionsService, MasterService, TRANSACTION_TYPE){
		var ctrl = this;
	
		MasterService.entity = $state.current.data.entity;
		MasterService.table = $state.current.data.table
		
		ctrl.htmlTemplateButtonInsert = 'app/infra/users/usersModal.html';
		
		ctrl.gridOptions = MasterService.gridOptions;
		ctrl.gridOptions.data = null;

		ctrl.insert = FunctionsService.insert;
		ctrl.edit = FunctionsService.edit;
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
			FunctionsService.transaction(null, 'GET', 'table', trt, $state.current.data.entity, $state.current.data.table, FunctionsService.debug, function(result){
				ctrl.gridOptions.columnDefs = result.data.columnDefs;
				ctrl.gridOptions.data = result.data.data;
				ctrl.title = result.data.title;
				
				FunctionsService.htmlTemplateInsertEdit = result.data.htmlTemplateInsertEdit;
				FunctionsService.htmlTemplateDelete = result.data.htmlTemplateDelete;

				FunctionsService.htmlControllerInsert = result.data.htmlControllerInsert;
				FunctionsService.htmlControllerEdit = result.data.htmlControllerEdit;
				FunctionsService.htmlControllerDelete = result.data.htmlControllerDelete;

				MasterService.title = result.data.title;
				MasterService.simpleTitle = result.data.simpleTitle;
				MasterService.displayModalDelete = result.data.displayModalDelete;
				MasterService.selectBuffers = result.data.selectBuffers;
				
				if (result.data.insertBuffer != undefined)
					MasterService.insertBuffer = result.data.insertBuffer.data[0];
				
			}, function(error){
				FunctionsService.message(error, 'fa-exclamation-triangle');
			});
		};
		return ctrl.read();
		
	});
	
	app.controller('ModalInsertMasterCtrl',function ($uibModalInstance, FunctionsService, MasterService, TRANSACTION_TYPE) {
		var ctrl = this;
		
		ctrl.titleType = "Novo";
		ctrl.simpleTitle = MasterService.simpleTitle;
		ctrl.selectBuffers = MasterService.selectBuffers;
		ctrl.gridOptions = MasterService.gridOptions;
		ctrl.entity = angular.copy(MasterService.insertBuffer);
		ctrl.selectOnChange = FunctionsService.selectOnChange;
		ctrl.save = function () {
			var trt = TRANSACTION_TYPE.insert;
			FunctionsService.transaction(ctrl.entity, 'POST', 'save', trt, MasterService.entity, MasterService.table, FunctionsService.debug, function(result){
				//Success();
				console.log("master: ", result.data.data[0]);
				ctrl.gridOptions.data.push(result.data.data[0]);
			}, function(error){
				FunctionsService.message(error, 'fa-exclamation-triangle');
			});
			$uibModalInstance.close();
		};
	});
	app.controller('ModalEditMasterCtrl',function ($uibModalInstance, grid, row, FunctionsService, MasterService, TRANSACTION_TYPE) {
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
			FunctionsService.transaction(entity, 'POST', 'save', trt, MasterService.entity, MasterService.table, FunctionsService.debug, function(result){
				//Success();
				//console.log(result);
			}, function(error){
				FunctionsService.message(error, 'fa-exclamation-triangle');
			});
			$uibModalInstance.close(row.entity);
		};
	});
	app.controller('ModalDeleteMasterCtrl',function ($uibModalInstance, grid, row, FunctionsService, MasterService, TRANSACTION_TYPE) {
		var ctrl = this;
		ctrl.gridOptions = MasterService.gridOptions;
		ctrl.entity = angular.copy(row.entity);
		ctrl.simpleTitle = MasterService.simpleTitle;
		ctrl.displayModalDelete = ctrl.entity[MasterService.displayModalDelete];

		ctrl.delete = function () {
			// Copy row values over
			row.entity = angular.extend(row.entity, ctrl.entity);
			var trt = TRANSACTION_TYPE.delete;
			var data = row.entity;
			FunctionsService.transaction(data, 'POST', 'save', trt, MasterService.entity, MasterService.table, FunctionsService.debug, function(result){
				//Success();
				var index = ctrl.gridOptions.data.indexOf(row.entity);
				//console.log(index);
				ctrl.gridOptions.data.splice(index, 1);
			}, function(error){
				FunctionsService.message(error, 'fa-exclamation-triangle');
			});
			$uibModalInstance.close(row.entity);
		};
	});
})();