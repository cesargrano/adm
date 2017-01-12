(function() {
	
	'use strict';
	
	app.controller('EntitiesCtrl', function($scope, $rootScope, $http, $state, $window, EntitiesFactory, TRANSACTION_TYPE){
		var ctrl = this;
	
		EntitiesFactory.entity = $state.current.data.entity;
		EntitiesFactory.table = $state.current.data.table;
	
		ctrl.gridOptions = EntitiesFactory.gridOptions;
	
		ctrl.title = $state.current.data.title;
		ctrl.TRANSACTION_TYPE = TRANSACTION_TYPE;
		$rootScope.title = ctrl.title;
		$rootScope.TRANSACTION_TYPE = ctrl.TRANSACTION_TYPE;
		

//		ctrl.create = EntitiesFactory.create;
		ctrl.insertUpdate = EntitiesFactory.insertUpdate;
		ctrl.delete = EntitiesFactory.delete;

		ctrl.insertUpdateDetail = EntitiesFactory.insertUpdateDetail;

		
		ctrl.getTableHeight = function() {
			var rowHeight = 30; // your row height
			var headerHeight = 30; // your header height
			
			var heightWindow = angular.element($window)[0].innerHeight - 117;
			var heightGrid = (ctrl.gridOptions.data.length + 2.20) * 30;
			
			if (heightGrid > heightWindow)
				heightGrid = heightWindow
			
			return {
				height: heightGrid + "px" 
			};
		};
	
		ctrl.read = function () {
			ctrl.error = false;
			var trt = TRANSACTION_TYPE.read;
			EntitiesFactory.transaction(null, 'GET', 'table', trt, function(result){
				ctrl.gridOptions.columnDefs = result.data.columnDefs;
				ctrl.gridOptions.data = result.data.data;
				$rootScope.selectbuffers = result.data.selectbuffers;
			}, function(err){
				console.log(err);
			});
		};
		return ctrl.read();
		
	});
	
	app.controller('ModalInsertUpdateCtrl', function ($uibModalInstance, grid, row, trt, $rootScope, EntitiesFactory, TRANSACTION_TYPE) {
		var ctrl = this;

		ctrl.title = $rootScope.title;
		ctrl.selectbuffers = $rootScope.selectbuffers;
		ctrl.gridOptions = EntitiesFactory.gridOptions;
		
		if (row)
			ctrl.entity = angular.copy(row.entity);
		else
			ctrl.entity = {};
		
		ctrl.groupUserOnChange = EntitiesFactory.groupUserOnChange; //(ctrl.entity, ctrl.modelValue, ctrl.form);
		ctrl.save = function () {
			// Copy row values over
			var entity;
			
			if (trt == TRANSACTION_TYPE.update) {
				row.entity = angular.extend(row.entity, ctrl.entity);
				entity = row.entity;
			}
			if (trt == TRANSACTION_TYPE.insert)
				entity = ctrl.entity;
			
			EntitiesFactory.transaction(entity, 'POST', 'save', trt, function(result){
				//Success();
				console.log(result);
				if (trt == TRANSACTION_TYPE.insert)
					ctrl.gridOptions.data.push(result.data.data[0]);
			}, function(err){
				//do something if Error();
				console.log(err);
			});
			$uibModalInstance.close(entity);
		};
		
		ctrl.isValid = function () {
			return ctrl.entity.NAME && ctrl.entity.LOGIN && ctrl.entity.PASSWORD && ctrl.entity.EMAIL && ctrl.entity.MOBILE;
	    };
	});
	app.controller('ModalDeleteCtrl',function ($uibModalInstance, grid, row, $rootScope, EntitiesFactory, TRANSACTION_TYPE) {
		var ctrl = this;
		
		ctrl.title = $rootScope.title;
		ctrl.gridOptions = EntitiesFactory.gridOptions;
		ctrl.entity = angular.copy(row.entity);
		ctrl.delete = function () {
			// Copy row values over
			row.entity = angular.extend(row.entity, ctrl.entity);
			var trt = TRANSACTION_TYPE.delete;
			var data = row.entity;
			EntitiesFactory.transaction(data, 'POST', 'save', trt, function(result){
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
	
	app.controller('ModalCreateUserCtrl', function ($uibModalInstance, $rootScope, EntitiesFactory, TRANSACTION_TYPE) {
		var ctrl = this;
		ctrl.gridOptions = EntitiesFactory.gridOptions;
		ctrl.entity = {};
		ctrl.groupUserOnChange = EntitiesFactory.groupUserOnChange; //(ctrl.entity, ctrl.modelValue, ctrl.form);
		ctrl.create = function () {
			var trt = TRANSACTION_TYPE.insert;
			EntitiesFactory.transaction(ctrl.entity, 'POST', 'save', trt, function(result){
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

})();