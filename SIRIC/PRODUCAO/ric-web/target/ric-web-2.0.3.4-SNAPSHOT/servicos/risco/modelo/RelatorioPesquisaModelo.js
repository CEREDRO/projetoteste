define([
], function() {
	var RelatorioPesquisaModelo = Backbone.Model.extend({
		
		urlRoot: 'rest/risco/pesquisaexterna/relatorio',
		
		defaults: function() {
			return {
				codigoPessoa: null, 
				prioridade: null,
				descricao: null,
				situacao: null,
				dataSolicitacao: null,
				dataUltimaAtualizacao: null,
				dataInicioProcessamento: null, 
				quantidadeErro: null,
				numeroMaquina: null,
				listatags: null,
				template: null
			};
		},
		
		url: function() {
			return this.urlRoot;
		}			
	});
	return RelatorioPesquisaModelo;
});