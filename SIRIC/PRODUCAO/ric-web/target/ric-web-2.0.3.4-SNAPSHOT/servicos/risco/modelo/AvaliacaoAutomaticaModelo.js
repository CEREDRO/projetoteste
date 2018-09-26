define([
], function() {
	var AvaliacaoAutomaticaModelo = Backbone.Model.extend({

		urlRoot: 'rest/risco/avaliacaoautomatica/',

		defaults: function() {
			return {
				pessoa: null,
				pv: null,
				datamovimento: null,
				datamovimentocompleto: null,
				resultados: null,
				detalhes: null
			};
		},

		url: function() {
			return this.urlRoot + this.get("pessoa").tipo.codigo + "," + this.getCPFCNPJ + "," + this.datamovimentocompleto;
		},
		getCPFCNPJ: function() {
			if (this.get("pessoa").tipo.codigo == 1) {
				return this.get("pessoa").pessoaCpf;
			} else {
				return this.get("pessoa").pessoaCnpj;
			}
		}
	});
	return AvaliacaoAutomaticaModelo;
});