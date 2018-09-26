define([
       'servicos/risco/modelo/EstadoModelo'
], function(EstadoModelo) {
   var EstadoColecao = Backbone.Collection.extend({
	
		model: EstadoModelo,
		
		urlRoot: 'rest/risco/pessoas/listaestados',
	     
		url: function(){
			return this.urlRoot;
		} 
	});
   return EstadoColecao;
});