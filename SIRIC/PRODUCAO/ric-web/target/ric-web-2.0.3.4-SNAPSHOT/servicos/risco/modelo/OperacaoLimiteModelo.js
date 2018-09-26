define([
], function() {
	var OperacaoLimiteModelo = Backbone.Model.extend({
		defaults: function() {
			return {
				codigo: null,
				nome: null,
				descricao: null,	
				codigoPai: null, 
				tipo: null, 
				linha: null, 
				campos: null
			};
		}
	});
	return OperacaoLimiteModelo;
});