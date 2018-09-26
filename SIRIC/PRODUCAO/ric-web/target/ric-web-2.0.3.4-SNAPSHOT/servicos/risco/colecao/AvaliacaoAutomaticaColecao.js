define([
       'servicos/risco/modelo/AvaliacaoAutomaticaModelo'
], function(AvaliacaoAutomaticaModelo) {
   var AvaliacaoAutomaticaColecao = Backbone.Collection.extend({
	   
	    pv: null,
	    geric: 0,
	    cpfcnpj: null,
	    datainicioconsulta: null,
		datafimconsulta: null,
		tipoconsulta: null,
		tipoparametro: null,
	    urlRoot: 'rest/risco/avaliacaoautomatica/',
		model: AvaliacaoAutomaticaModelo,
		
		url: function() {
			return this.urlRoot + this.pv + "," + this.datainicioconsulta + "," + this.datafimconsulta + "," + this.geric + "," + this.cpfcnpj + "," + this.tipoconsulta + "," + this.tipoparametro;
		}
	});
   return AvaliacaoAutomaticaColecao;
});