define([
], function() {
	var CabecalhoLimiteModelo = Backbone.Model.extend({
		defaults: function() {
			return {
				codigo: null,
				descricao: null,
				ordem: null,
				classe: null
			};
		}
	});
	return CabecalhoLimiteModelo;
});