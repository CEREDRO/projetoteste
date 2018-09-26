define([
], function() {
	var ConfirmacaoModelo = Backbone.Model.extend({
	
		urlRoot: '',
		
		defaults: function() {
			return {
				titulo: null,
				conteudo: null
			};
		},
	
		url: function() {
			return this.urlRoot;
		}
	});
	return ConfirmacaoModelo;
});