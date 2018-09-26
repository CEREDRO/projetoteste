define([
], function() {
	var PesquisaExternaModelo = Backbone.Model.extend({
	
		urlRoot: 'rest/risco/pesquisa',
		
		defaults: function() {
			return {
				dataPesquisaCadastral: null,
				descricaoCadastral: null,
				visivelRelCadastral: null,
				dataPesquisaRelacional: null,
				descricaoRelacional: null,
				visivelRelRelacional: null,
				bloqueioPesquisaCadastral: null,
				bloqueioPesquisaRelacional: null,
				retornoerro: null,
				podeLiberarPesquisa: null,
				podeSolicitarPesquisa: null
			};
		},
	
		url: function() {
			return this.urlRoot;
		}
	});
	return PesquisaExternaModelo;
});