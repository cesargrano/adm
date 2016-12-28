angular.module('templates', []).run(['$templateCache', function($templateCache) {$templateCache.put('src/templates/cpf.html','<div class="cpf-wrapper">\n  <label>{{form.title}}</label>\n  <cpf sf-field-model schema-validate="form"></cpf>\n  <em>Blur this field to update the model.</em>\n  <span sf-message="form.description"></span>\n</div>\n');
$templateCache.put('src/templates/input.cpf.html','<input type="text" \n\tui-br-cpfcnpj-mask \n\tclass="form-control" \n\tng-model="modelValue" \n\tng-blur="updateModel(modelValue)">\n</input>\n\t');}]);
angular.module('angularSchemaFormUiMask', [
	'schemaForm',
	'templates',
	'ui.utils.masks'
]).config(function(schemaFormDecoratorsProvider, sfBuilderProvider) {

	schemaFormDecoratorsProvider.defineAddOn(
		'bootstrapDecorator',                               // Name of the decorator you want to add to.
		'cpf',                                              // Form type that should render this add-on
		'src/templates/cpf.html',                           // Template name in $templateCache
		sfBuilderProvider.stdBuilders                       // List of builder functions to apply.
	);

});

angular.module('angularSchemaFormUiMask').directive('cpf', function () {
  return {
    restrict: 'E',
    require: 'ngModel',
    scope: {},
    templateUrl: 'src/templates/input.cpf.html',
    link: function (scope, element, attrs, ngModel) {
      scope.modelValue = ngModel.$viewValue;

      scope.updateModel = function (modelValue) {
        ngModel.$setViewValue(modelValue);
      };
    },
  };
});
