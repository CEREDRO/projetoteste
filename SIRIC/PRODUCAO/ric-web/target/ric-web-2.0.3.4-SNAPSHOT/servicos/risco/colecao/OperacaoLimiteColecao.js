define([
       'servicos/risco/modelo/OperacaoLimiteModelo'
], function(OperacaoLimiteModelo) {
   var OperacaoLimiteColecao = Backbone.Collection.extend({

		model: OperacaoLimiteModelo,
		url: function(){
			return this.urlRoot;
		} 
	});
   return OperacaoLimiteColecao;
});