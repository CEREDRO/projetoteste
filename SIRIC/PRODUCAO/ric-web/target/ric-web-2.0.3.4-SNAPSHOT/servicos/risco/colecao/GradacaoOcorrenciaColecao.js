define([
       'servicos/risco/modelo/GradacaoOcorrenciaModelo'
], function(GradacaoOcorrenciaModelo) {
   var GradacaoOcorrenciaColecao = Backbone.Collection.extend({
	
		pessoa: null,
		
		model: GradacaoOcorrenciaModelo,
		
		urlRoot: '',
	     
		url: function(){
			return this.urlRoot;
		} 
	});
   return GradacaoOcorrenciaColecao;
});