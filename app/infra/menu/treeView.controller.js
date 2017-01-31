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
				FunctionsService.transaction(entity, 'POST', 'save', TRANSACTION_TYPE.update, TreeViewService.entity, TreeViewService.table, FunctionsService.debug, function(result){
					//Success();
					//console.log(result);
					nodeData = angular.extend(nodeData, entity);
					return true;
				}, function(error){
					//do something if Error();
					console.log("error: ", error);
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
		ctrl.edit = TreeViewService.edit;
		ctrl.delete = TreeViewService.delete;
		
		ctrl.read = function () {
			ctrl.error = false;
			var trt = TRANSACTION_TYPE.read;
			FunctionsService.transaction(null, 'GET', 'table', trt, $state.current.data.entity, $state.current.data.table, FunctionsService.debug, function(result){
				
				ctrl.data = result.data.data;
				ctrl.title = result.data.title;

				TreeViewService.simpleTitle = result.data.simpleTitle;
				TreeViewService.displayModalDelete = result.data.displayModalDelete;
				TreeViewService.insertBuffer = result.data.insertBuffer.data[0];

			}, function(error){
				FunctionsService.message(error, 'fa-exclamation-triangle');
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
		ctrl.entity["PRESENTATION_ORDER"] = (nodeData.TMP_SUB_MENU.data.length * 10) + 10;
		
		ctrl.save = function () {
			var trt = TRANSACTION_TYPE.insert;
			FunctionsService.transaction(ctrl.entity, 'POST', 'save', trt, TreeViewService.entity, TreeViewService.table, FunctionsService.debug, function(result){
				//Success();
				//console.log("save: ", result.data.data[0]);
				nodeData.TMP_SUB_MENU.data.push(result.data.data[0]);
			}, function(error){
				FunctionsService.message(error, 'fa-exclamation-triangle');
			});
			$uibModalInstance.close();
		};
	});
	app.controller('ModalEditTreeViewCtrl',function ($uibModalInstance, node, FunctionsService, TreeViewService, TRANSACTION_TYPE) {
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
			FunctionsService.transaction(ctrl.entity, 'POST', 'save', TRANSACTION_TYPE.update, TreeViewService.entity, TreeViewService.table, FunctionsService.debug, function(result){
				//Success();
				//console.log(result);
				nodeData = angular.extend(nodeData, ctrl.entity);
			}, function(error){
				FunctionsService.message(error, 'fa-exclamation-triangle');
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
			FunctionsService.transaction(nodeData, 'POST', 'save', TRANSACTION_TYPE.delete, TreeViewService.entity, TreeViewService.table, FunctionsService.debug, function(result){
				//Success();
				node.remove(nodeData);
			}, function(error){
				FunctionsService.message(error, 'fa-exclamation-triangle');
			});
			$uibModalInstance.close(nodeData);
		};
	});
	app.controller('ModalMessageCtrl',function ($uibModalInstance, msg, icon) {
		var ctrl = this;
		ctrl.msg = msg.status + '() ' + msg.data;
		ctrl.icon = icon;
	});
})();