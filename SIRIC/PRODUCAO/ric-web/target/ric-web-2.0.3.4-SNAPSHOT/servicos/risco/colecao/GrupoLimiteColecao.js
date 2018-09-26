define([
       'servicos/risco/modelo/GrupoLimiteModelo'
], function(GrupoLimiteModelo) {
   var GrupoLimiteColecao = Backbone.Collection.extend({

		model: GrupoLimiteModelo,
		url: function(){
			return this.urlRoot;
		} 
	});
   return GrupoLimiteColecao;
});