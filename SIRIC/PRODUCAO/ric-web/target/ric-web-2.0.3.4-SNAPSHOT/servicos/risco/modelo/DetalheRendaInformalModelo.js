define([
], function() {
	var DetalheRendaInformalModelo = Backbone.Model.extend({
	
		urlRoot: 'rest/risco/rendas/informal',
		
		defaults: function() {
			return {
				codigoPessoa: null,
				nomeAtividade: null,
				localAtividade: null,
				dataInicio: null,
				rendaLiquida: null,
				despesa: null,
				fatura: null,
				previdencia: null,
				internet: null,
				semComprovante: null
			};
		},
	
		url: function() {
			return this.urlRoot;
		}
	});
	return DetalheRendaInformalModelo;
});