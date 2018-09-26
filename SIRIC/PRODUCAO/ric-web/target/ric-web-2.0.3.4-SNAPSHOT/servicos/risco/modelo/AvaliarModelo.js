define([
], function() {
	var AvaliarModelo = Backbone.Model.extend({
	
		urlRoot: 'rest/risco/controleavaliacao',
		
		defaults: function() {
			return {
				codigo: null,
				cpfCnpj: null,
				situacao: null,
				codigoPessoa: null,
				modeloAvaliacao: null,
				dataCadastramento: null,
				dataUltimaModificacao: null,
				quantidadeTentativaExecucao: null,
				processo: null,
				codigoAvaliacao: null,
				duracaoPesquisa: null,
				duracaoValidacao: null,
				duracaoAvaliacao: null,
				usuario: null
			};
		},
	
		url: function() {
			return this.urlRoot;
		}
	});
	return AvaliarModelo;
});