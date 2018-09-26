define([
], function() {
	var AjudaModelo = Backbone.Model.extend({
	
		urlRoot: 'rest/risco/permissao',
		
		defaults: function() {
			return {
				descricao: null
			};
		},
	
		url: function() {
			return this.urlRoot;
		}
	});
	return AjudaModelo;
});