define([
], function() {
	var ConsultaSICLIModelo = Backbone.Model.extend({
	
		urlRoot: 'rest/risco/pessoas/',
		
		defaults: function() {
			return {
				mensagem: null,
				situacao: null,
				procBatch: null
			};
		},
		url: function() {
			return this.urlRoot;
		}
	});
	return ConsultaSICLIModelo;
});