define([
], function() {
	var GradacaoOcorrenciaModelo = Backbone.Model.extend({
	
		urlRoot: '',
		
		defaults: function() {
			return {
				tipoOcorrencia: null, 
				gradacao: null, 
				dataAtualizacao: null
			};
		},
	
		url: function() {
			return this.urlRoot;
		}
	});
	return GradacaoOcorrenciaModelo;
});