(function() {
	
	'use strict';

	app.service('DetailService', function () {
		var detailService = this;
				
		detailService.gridOptions = {
			enableSorting: false,
			enableColumnMenus: false,
			paginationPageSize: 15,
			enableRowSelection: true,
			enableRowHeaderSelection: false,
			multiSelect: false,
			onRegisterApi: function (gridApi, registerGridApi){
				detailService.gridApi = gridApi;
				detailService.registerGridApi = registerGridApi;
			}
		};
	});
})();