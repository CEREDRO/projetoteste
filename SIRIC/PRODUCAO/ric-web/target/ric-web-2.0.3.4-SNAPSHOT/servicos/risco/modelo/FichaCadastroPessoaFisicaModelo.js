define([
], function() {
	var FichaCadastroPessoaFisicaModelo = Backbone.Model.extend({
	
		urlRoot: 'rest/risco/pessoas/fichaCadastroPF/',
		
		defaults: function() {
			return {
				dadosPessoais: null,
				rendasFormais: null,
				outrasRendas: null,
				rendasInformais: null,
				imoveis: null,
				veiculos: null,
				cartoes: null,
				contas: null,
				aplicacoes: null,
				participantes: null,
				compromissos: null,
				participantesSocietarios: null
			};
		},
	
		url: function() {
			return this.urlRoot;
		}
	});
	return FichaCadastroPessoaFisicaModelo;
});