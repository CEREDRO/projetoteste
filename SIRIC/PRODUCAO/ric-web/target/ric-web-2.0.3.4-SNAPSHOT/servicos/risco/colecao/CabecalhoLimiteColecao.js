define([
       'servicos/risco/modelo/CabecalhoLimiteModelo'
], function(CabecalhoLimiteModelo) {
   var CabecalhoLimiteColecao = Backbone.Collection.extend({

		model: CabecalhoLimiteModelo,
		url: function(){
			return this.urlRoot;
		} 
	});
   return CabecalhoLimiteColecao;
});