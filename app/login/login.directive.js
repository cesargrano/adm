app.directive('inputCpf',function(){    
    return {
        restrict: 'E',
        template: function(element, attrs) {
        	var type = attrs.type || 'text';
	        var htmlText = '<input type="text" id="' + attrs.formId + '" name="' + attrs.formId + '" ng-model="' + attrs.formId + '" ui-br-cpf-mask>'
	        return htmlText;
	    }
    }
});