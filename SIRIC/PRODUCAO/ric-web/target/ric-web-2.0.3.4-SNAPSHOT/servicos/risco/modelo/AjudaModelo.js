define([
], function() {
	var PermissaoModelo = Backbone.Model.extend({
	
		urlRoot: 'rest/risco/permissao',
		
		defaults: function() {
			return {
				codigo: null
			};
		},
	
		url: function() {
			return this.urlRoot;
		}
	});
	return PermissaoModelo;
});