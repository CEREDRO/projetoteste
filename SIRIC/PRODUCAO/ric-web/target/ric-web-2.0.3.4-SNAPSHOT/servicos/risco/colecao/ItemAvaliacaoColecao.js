define([
       'servicos/risco/modelo/ItemAvaliacaoModelo'
], function(ItemAvaliacaoModelo) {
   var ItemAvaliacaoColecao = Backbone.Collection.extend({
	
		model: ItemAvaliacaoModelo,
		
		urlRoot: 'rest/risco/avaliacao/item/',
	     
		url: function(){
			return this.urlRoot;
		} 
	});
   return ItemAvaliacaoColecao;
});