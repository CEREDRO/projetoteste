define([
], function() {
	var ConsultaAvaliacaoAutomaticaModelo = Backbone.Model.extend({

		urlRoot: 'rest/risco/avaliacaoautomatica/',
		defaults: function() {
			return {
				tipoconsulta: null,
				tipoparametro: null,
				geric: null,
				cpf: null,
				cnpj: null,
				pv: null, 
				datainicial: null, 
				datafim: null,
				permissaoConveniosalario: null,
				permissaoCartaoparceiro: null,
				permissaoPreaprovado: null,
				permissaoRenovacaocdc: null,
				permissaoProspeccaopj: null,
				permissaoProspeccaocomercial: null
			};
		},
		url: function() {
			return this.urlRoot;
		}
	});
	return ConsultaAvaliacaoAutomaticaModelo;
});