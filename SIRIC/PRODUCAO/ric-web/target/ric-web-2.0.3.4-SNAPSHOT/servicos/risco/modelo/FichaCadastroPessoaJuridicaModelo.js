define([
], function() {
	var FichaCadastroPessoaJuridicaModelo = Backbone.Model.extend({
	
		urlRoot: 'rest/risco/pessoas/fichaCadastroPJ/',
		
		defaults: function() {
			return {
				dadosEmpresa: null,
				socios: null,
				participantes: null
			};
		},
	
		url: function() {
			return this.urlRoot;
		}
	});
	return FichaCadastroPessoaJuridicaModelo;
});