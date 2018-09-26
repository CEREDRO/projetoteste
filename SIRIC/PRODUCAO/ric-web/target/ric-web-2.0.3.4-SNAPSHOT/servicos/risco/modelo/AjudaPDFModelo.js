define([
], function() {
	var AjudaPDFModelo = Backbone.Model.extend({
	
		urlRoot: 'rest/risco/ajuda/pdf/',
		
		defaults: function() {
			return {
				codigo: null,
				dataInformacao: null
			};
		},
	
		url: function() {
			return this.urlRoot + this.get('codigo');
		}
	});
	return AjudaPDFModelo;
});