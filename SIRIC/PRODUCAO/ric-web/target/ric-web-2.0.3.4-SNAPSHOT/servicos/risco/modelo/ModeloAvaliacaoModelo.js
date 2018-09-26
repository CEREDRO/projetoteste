define([
], function() {
	var ModeloAvaliacaoModelo = Backbone.Model.extend({
	
		urlRoot: 'rest/risco/solicitaavaliacao',
		
		defaults: function() {
			return {
				codigo: null, 
				denominacao: null,
				validadeDataInicio: null, 
				validadeDataTermino: null,
				intervaloMinimoEntreAvaliacoes: null, 
				restricaoVisualizacao: null,
				modeloSuspenso: null,
				numeroModeloAberto: null,
				indicaCriterioJulgamental: null,
				numeroParametroRendaPresumida: null,
				indicaAavaliacao: null
			};
		},
	
		url: function() {
			return this.urlRoot;
		}
	});
	return ModeloAvaliacaoModelo;
});