define([
       'servicos/risco/modelo/GradacaoModelo'
], function(GradacaoModelo) {
   var GradacaoColecao = Backbone.Collection.extend({
	
		model: GradacaoModelo,
		
		urlRoot: 'rest/risco/ocorrencia',
	     
		url: function(){
			return this.urlRoot;
		} 
	});
   return GradacaoColecao;
});