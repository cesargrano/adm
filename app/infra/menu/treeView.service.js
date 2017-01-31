(function() {
	
	'use strict';

	app.service('TreeViewService', function ($uibModal) {
		var treeViewService = this;

		treeViewService.insert = function (node) {
			$uibModal.open({
				templateUrl: 'app/infra/menu/menuTreViewModal.html',
				controller: 'ModalInsertTreeViewCtrl',
				controllerAs: 'ctrl',
				resolve: {
					node: function () { return node; }
				}
			});
		};
		treeViewService.edit = function (node) {
			$uibModal.open({
				templateUrl: 'app/infra/menu/menuTreViewModal.html',
				controller: 'ModalEditTreeViewCtrl',
				controllerAs: 'ctrl',
				resolve: {
					node: function () { return node; }
				}
			});
		};
		treeViewService.delete = function (node) {
			$uibModal.open({
				templateUrl: 'app/views/deleteModal.html',
				controller: 'ModalDeleteTreeViewCtrl',
				controllerAs: 'ctrl',
				resolve: {
					node: function () { return node; }
				}
			});
		};
	});
})();