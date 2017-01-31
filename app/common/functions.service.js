(function() {
	
	'use strict';
	
	app.service('FunctionsService', function ($http, $state, $window, Session, APP_DATA, AUTH_EVENTS, $uibModal) {
	
		var functionsService = this;
		functionsService.detail = false;
		functionsService.debug = false;

		functionsService.transaction = function(data, mthd, rest, trt, entity, table, debug, success, error){
			$http({
				method: mthd,
				url: APP_DATA.serverPath+rest,
				params: {
					prefix: APP_DATA.prefix,
					entity: entity,
					tb: table,
					trt: trt,
					debug: debug,
					data: data
				},
				data: data
			}).then(function successCallback(response){
				success(response);
			}).catch(function (response) {
				error(response);
		    });
		};
		functionsService.insert = function () {
			var template = functionsService.htmlTemplateInsertEdit;
			var controller = functionsService.htmlControllerInsert;
			
			if (functionsService.detail) {
				template = functionsService.htmlTemplateInsertEditDetail;
				controller = functionsService.htmlControllerInsertDetail;
			}
			
			$uibModal.open({
				templateUrl: template,
				controller: controller,
				controllerAs: 'ctrl'
			});
		};
		functionsService.edit = function (grid, row) {
			var template = functionsService.htmlTemplateInsertEdit;
			var controller = functionsService.htmlControllerEdit;
			
			if (functionsService.detail) {
				template = functionsService.htmlTemplateInsertEditDetail;
				controller = functionsService.htmlControllerEditDetail;
			}
			
			$uibModal.open({
				templateUrl: template,
				controller: controller,
				controllerAs: 'ctrl',
				resolve: {
					grid: function () { return grid; },
					row: function () { return row; }
				}
			});
		};
		functionsService.delete = function (grid, row) {
			var template = functionsService.htmlTemplateDelete;
			var controller = functionsService.htmlControllerDelete;
			
			if (functionsService.detail) {
				template = functionsService.htmlTemplateDeleteDetail;
				controller = functionsService.htmlControllerDeleteDetail;
			}

			$uibModal.open({
				templateUrl: template,
				controller: controller,
				controllerAs: 'ctrl',
				resolve: {
					grid: function () { return grid; },
					row: function () { return row; }
				}
			});
		};
		functionsService.message = function (msg, icon) {
			$uibModal.open({
				templateUrl: 'app/views/messageModal.html',
				controller: 'ModalMessageCtrl',
				controllerAs: 'ctrl',
				resolve: {
					msg: function () { return msg; },
					icon: function () { return icon; }
				}
			});
		};
		functionsService.selectOnChange = function(item, display, entity, field) {
			entity[field] = item[display];
		};
		
		
		functionsService.openDetail = function (entity, table, grid, row) {
			$uibModal.open({
				templateUrl: "app/views/gridViewDetail.html",
				controller: "DetailCtrl",
				controllerAs: 'ctrl',
				resolve: {
					entity: function () { return entity; },
					table: function () { return table; },
					grid: function () { return grid; },
					row: function () { return row; }
				}
			}).closed.then(function(){
				functionsService.detail = false;
			});
		};
	});
})();