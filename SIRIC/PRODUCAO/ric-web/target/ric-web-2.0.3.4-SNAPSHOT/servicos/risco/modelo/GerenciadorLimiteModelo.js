define([
], function() {
	var GerenciadorLimiteModelo = Backbone.Model.extend({
		defaults: function() {
			return {
				pessoa: null,
				codigo: null,
				nome: null,
				descricao: null,	
				codigoPai: null, 
				tipo: null, 
				detalhes: null, 
				cabecalhos: null, 
				grupos: null
			};
		}
	});
	return GerenciadorLimiteModelo;
});