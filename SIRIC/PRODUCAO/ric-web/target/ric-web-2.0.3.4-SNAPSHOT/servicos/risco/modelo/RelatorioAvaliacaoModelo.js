define([
], function() {
	var RelatorioAvaliacaoModelo = Backbone.Model.extend({
		
		urlRoot: 'rest/risco/avaliacao/relatorio',
		
		defaults: function() {
			return {
				codigoAvaliacao: null, 
				prioridade: null,
				codigoModeloAvaliacao: null,
				geraCentral: null,
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
	return RelatorioAvaliacaoModelo;
});