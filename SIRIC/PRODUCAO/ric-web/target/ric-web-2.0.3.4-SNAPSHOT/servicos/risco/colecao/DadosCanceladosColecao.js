define([
       'servicos/risco/modelo/DadosCanceladosModelo'
], function(DadosCanceladosModelo) {
   var DadosCanceladosColecao = Backbone.Collection.extend({
	
		model: DadosCanceladosModelo,
		
		urlRoot: 'rest/risco/dadoscancelados',
	     
		url: function(){
			return this.urlRoot;
		} 
	});
   return DadosCanceladosColecao;
});