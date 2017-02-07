(function() {
	
	'use strict';

	app.service('DetailService', function () {
		var detailService = this;
				
		detailService.gridOptions = {
			enableSorting: false,
			enableColumnMenus: false,
			paginationPageSize: 15,
			enableRowSelection: true,
			enableRowHeaderSelection: true,
			multiSelect: false,
			selectionRowHeaderWidth: 30,
			onRegisterApi: function (gridApi, registerGridApi){
				detailService.gridApi = gridApi;
				detailService.registerGridApi = registerGridApi;
			}
		};
	});
})();