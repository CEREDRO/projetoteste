define([
       'servicos/risco/modelo/ConsultaAvaliacaoModelo'
], function(ConsultaAvaliacaoModelo) {
   var ConsultaAvaliacaoColecao = Backbone.Collection.extend({
	
		pessoa: null,
		
		model: ConsultaAvaliacaoModelo,
		
		urlRoot: 'rest/risco/avaliacao',
	     
		url: function(){
			return this.urlRoot;
		} 
	});
   return ConsultaAvaliacaoColecao;
});