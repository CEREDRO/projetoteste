define([
       'servicos/risco/modelo/DetalheLimiteModelo'
], function(DetalheLimiteModelo) {
   var DetalheLimiteColecao = Backbone.Collection.extend({

		model: DetalheLimiteModelo,
		url: function(){
			return this.urlRoot;
		} 
	});
   return DetalheLimiteColecao;
});