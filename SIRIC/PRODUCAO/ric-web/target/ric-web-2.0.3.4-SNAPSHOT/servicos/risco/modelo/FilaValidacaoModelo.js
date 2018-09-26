define([
], function() {
	var FilaValidacaoModelo = Backbone.Model.extend({
	
		urlRoot: 'rest/risco/pessoas/solicitavalidacao',
		
		defaults: function() {
			return {
				codigoPessoa: null,
				datasolicitacao: null,
				situacao: null,
				datatermino: null,
				codigoValidador: null,
				modeloAvaliacao: null
			};
		},
	
		url: function() {
			return this.urlRoot;
		}
	});
	return FilaValidacaoModelo;
});