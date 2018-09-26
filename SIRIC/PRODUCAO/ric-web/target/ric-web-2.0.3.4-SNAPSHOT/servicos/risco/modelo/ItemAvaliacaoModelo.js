define([
], function() {
	var ItemAvaliacaoModelo = Backbone.Model.extend({
	
		urlRoot: 'rest/risco/avaliacao/item/',
		
		defaults: function() {
			return {
				nota: null,
			    denominacao: null,   
			    aplicacao: null,
			    sequencia: null
			};
		},
	
		url: function() {
			return this.urlRoot;
		}
	});
	return ItemAvaliacaoModelo;
});