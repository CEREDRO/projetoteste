define([
       'servicos/risco/modelo/ItemDemonstrativoModelo'
], function(ItemDemonstrativoModelo) {
   var ItemDemonstrativoColecao = Backbone.Collection.extend({
	
		pessoa: null,
		
		model: ItemDemonstrativoModelo,
		
		urlRoot: '',
	     
		url: function(){
			return this.urlRoot;
		} 
	});
   return ItemDemonstrativoColecao;
});