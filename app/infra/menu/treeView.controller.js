(function() {
	
	'use strict';
	
	app.controller('TreeViewCtrl', function($scope, $http, $state, $window, FunctionsService, TreeViewService, TRANSACTION_TYPE){
		var ctrl = this;

		TreeViewService.entity = $state.current.data.entity;
		TreeViewService.table = $state.current.data.table

		$scope.treeOptions = {
			beforeDrop : function (e) {
				
				//console.log("source: ", e.source.nodeScope.$modelValue.DESCRIPTION, e.source.nodeScope.$modelValue.ID_MENU_PARENT);
				//console.log("dest: ", e.dest.nodesScope.$nodeScope.$modelValue.DESCRIPTION, e.dest.nodesScope.$nodeScope.$modelValue.ID_MENU);

				var nodeData = e.source.nodeScope.$modelValue;

				if (e.dest.nodesScope.$nodeScope != null)
					nodeData.ID_MENU_PARENT = e.dest.nodesScope.$nodeScope.$modelValue.ID_MENU;
				else
					nodeData.ID_MENU_PARENT = null;
					
				var entity = angular.copy(nodeData);
				
				// Copy row values over
				FunctionsService.transaction(entity, 'POST', 'save', TRANSACTION_TYPE.update, TreeViewService.entity, TreeViewService.table, function(result){
					//Success();
					//console.log(result);
					nodeData = angular.extend(nodeData, entity);
					return true;
				}, function(err){
					//do something if Error();
					console.log(err);
					return false;
				});
			}
		};

		ctrl.toggle = function (scope) {
			scope.toggle();
		};

//		ctrl.collapseAll = function () {
//			ctrl.$broadcast('angular-ui-tree:collapse-all');
//		};
//
//		ctrl.expandAll = function () {
//			ctrl.$broadcast('angular-ui-tree:expand-all');
//		};

		ctrl.insert = TreeViewService.insert;
		ctrl.update = TreeViewService.update;
		ctrl.delete = TreeViewService.delete;
		
		ctrl.read = function () {
			ctrl.error = false;
			var trt = TRANSACTION_TYPE.read;
			FunctionsService.transaction(null, 'GET', 'table', trt, $state.current.data.entity, $state.current.data.table, function(result){
				
				ctrl.data = result.data.data;
				ctrl.title = result.data.title;

				TreeViewService.simpleTitle = result.data.simpleTitle;
				TreeViewService.displayModalDelete = result.data.displayModalDelete;
				TreeViewService.insertBuffer = result.data.insertBuffer.data[0];

			}, function(err){
				//do something if Error();
				console.log(err);
			});
		};
		return ctrl.read();
		
	});
	app.controller('ModalInsertTreeViewCtrl',function ($uibModalInstance, node, FunctionsService, TreeViewService, TRANSACTION_TYPE) {
		var ctrl = this;
		
		var nodeData = node.$nodeScope.$modelValue;
		
		ctrl.titleType = "Novo";
		ctrl.simpleTitle = TreeViewService.simpleTitle;
		ctrl.entity = angular.copy(TreeViewService.insertBuffer);
		ctrl.entity["ID_MENU_PARENT"] = nodeData.ID_MENU;
		
		ctrl.save = function () {
			var trt = TRANSACTION_TYPE.insert;
			FunctionsService.transaction(ctrl.entity, 'POST', 'save', trt, TreeViewService.entity, TreeViewService.table, function(result){
				//Success();
				console.log(result.data.data[0]);
				nodeData.SUB_MENU.data.push(result.data.data[0]);
			}, function(err){
				//do something if Error();
				console.log(err);
			});
			$uibModalInstance.close();
		};
	});
	app.controller('ModalUpdateTreeViewCtrl',function ($uibModalInstance, node, FunctionsService, TreeViewService, TRANSACTION_TYPE) {
		var ctrl = this;
		
		var nodeData = node.$nodeScope.$modelValue;

		ctrl.titleType = "Edição";
		ctrl.simpleTitle = TreeViewService.simpleTitle;
		ctrl.selectBuffers = TreeViewService.selectBuffers;

		ctrl.gridOptions = TreeViewService.gridOptions;
		ctrl.entity = angular.copy(nodeData);
		
		ctrl.selectOnChange = FunctionsService.selectOnChange;
		ctrl.save = function () {
			// Copy row values over
			FunctionsService.transaction(ctrl.entity, 'POST', 'save', TRANSACTION_TYPE.update, TreeViewService.entity, TreeViewService.table, function(result){
				//Success();
				//console.log(result);
				nodeData = angular.extend(nodeData, ctrl.entity);
			}, function(err){
				//do something if Error();
				console.log(err);
			});
			$uibModalInstance.close(nodeData);
		};
	});
	app.controller('ModalDeleteTreeViewCtrl',function ($uibModalInstance, node, FunctionsService, TreeViewService, TRANSACTION_TYPE) {
		var ctrl = this;
		var nodeData = angular.copy(node.$nodeScope.$modelValue);
		
		ctrl.simpleTitle = TreeViewService.simpleTitle;
		ctrl.displayModalDelete = nodeData[TreeViewService.displayModalDelete];

		ctrl.delete = function () {
			// Copy row values over
			FunctionsService.transaction(nodeData, 'POST', 'save', TRANSACTION_TYPE.delete, TreeViewService.entity, TreeViewService.table, function(result){
				//Success();
				node.remove(nodeData);
			}, function(err){
				//do something if Error();
				console.log(err);
			});
			$uibModalInstance.close(nodeData);
		};
	});

})();