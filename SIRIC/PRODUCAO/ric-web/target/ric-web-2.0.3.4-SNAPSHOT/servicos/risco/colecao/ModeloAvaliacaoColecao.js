define([
       'servicos/risco/modelo/ModeloAvaliacaoModelo'
], function(ModeloAvaliacaoModelo) {
   var ModeloAvaliacaoColecao = Backbone.Collection.extend({
	
		pessoa: null,
		
		model: ModeloAvaliacaoModelo,
		
		urlRoot: 'rest/risco/solicitaavaliacao',
	     
		url: function(){
			return this.urlRoot;
		} 
	});
   return ModeloAvaliacaoColecao;
});