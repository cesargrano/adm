(function() {
	
	'use strict';
	
	app.controller('UsersEmailCtrl', function($scope, $rootScope, $http, $state, $window, UsersFactory, TRANSACTION_TYPE, APP_DATA, row){
		var ctrl = this;
		
		var master = row.entity;
	
//		UsersFactory.entity = $state.current.data.entity;
		UsersFactory.table = "UsersEmail";
	
		ctrl.gridOptions = {}
		
		ctrl.gridOptions = {
			enableSorting: false,
			enableColumnMenus: false,
	//		useExternalPagination: true,
	//		useExternalSorting: true,
	//		showGridFooter: false,
	//		showColumnFooter: true,
			paginationPageSize: 15,
			enableRowSelection: true,
			enableRowHeaderSelection: false,
			multiSelect: false,
			onRegisterApi: function (gridApi, registerGridApi){
				ctrl.gridApi = gridApi;
				ctrl.registerGridApi = registerGridApi;
			}
		};

		ctrl.title = "E-mail";
		ctrl.title2 = "E-mail";

		ctrl.insert = UsersFactory.insert;
		ctrl.update = UsersFactory.update;
		ctrl.delete = UsersFactory.delete;
		
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

			/*
			var parameters = {
				prefix: APP_DATA.prefix,
				entity: "Infra",
				tb: "UsersEmail",
				trt: TRANSACTION_TYPE.read,
				id: row.entity['ID_USER']
			};
			
			var config = {
				params: parameters
			};
			
			$http.get(APP_DATA.serverPath+"table", config).
		    success(function(data, status, headers, config) {
				ctrl.gridOptions.columnDefs = data.data.columnDefs;
				ctrl.gridOptions.data = data.data.data;

//		      $scope.posts = data;
				console.log("passei aqui 2", data);
		    }).
		    error(function(data, status, headers, config) {
		      // log error
		    });
			*/

			$http({
				method: "GET",
				url: APP_DATA.serverPath+"table",
				params: {
					prefix: APP_DATA.prefix,
					entity: "Infra",
					tb: "UsersEmail",
					trt: TRANSACTION_TYPE.read,
					param1: master['ID_USER']
				},
				data: {}
			}).then(function successCallback(result){

				//success(result);
				
				ctrl.gridOptions.columnDefs = result.data.columnDefs;
				ctrl.gridOptions.data = result.data.data;
				//$rootScope.selectbuffers = result.data.selectbuffers;

				//console.log(response);
			}, function errorCallback(error){
				console.log(err);
			});
		};
		return ctrl.read();

	});
})();