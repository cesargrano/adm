(function() {
	
	'use strict';

	app.service('MasterService', function () {
		var masterService = this;
				
		masterService.gridOptions = {
			enableSorting: false,
			enableColumnMenus: false,
			paginationPageSize: 15,
			enableRowSelection: true,
			enableRowHeaderSelection: false,
			multiSelect: false,
			onRegisterApi: function (gridApi, registerGridApi){
				masterService.gridApi = gridApi;
				masterService.registerGridApi = registerGridApi;
			}
		};
		
	});
})();