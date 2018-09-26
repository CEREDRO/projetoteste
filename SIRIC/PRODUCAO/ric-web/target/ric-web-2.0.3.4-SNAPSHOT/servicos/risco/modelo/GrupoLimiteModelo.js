define([
], function() {
	var GrupoLimiteModelo = Backbone.Model.extend({
		defaults: function() {
			return {
				codigo: null,
				nome: null,
				descricao: null,	
				codigoPai: null, 
				tipo: null, 
				linha: null, 
				cabecalhos: null, 
				campos: null, 
				operacoes: null
			};
		}
	});
	return GrupoLimiteModelo;
});