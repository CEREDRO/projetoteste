define([
], function() {
	var ItemDemonstrativoModelo = Backbone.Model.extend({
	
		urlRoot: '',
		
		defaults: function() {
			return {
				demonstrativoAplicadoPessoa: null,
				estrutura: null,
				valor: null
			};
		},
	
		url: function() {
			return this.urlRoot;
		}
	});
	return ItemDemonstrativoModelo;
});