define([
       'servicos/risco/modelo/MunicipioModelo'
], function(MunicipioModelo) {
   var MunicipioColecao = Backbone.Collection.extend({
	    pessoauf: null,
		model: MunicipioModelo,
		
		urlRoot: 'rest/risco/pessoas/listamunicipios/',
	     
		url: function(){
			return this.urlRoot + this.pessoauf;
		} 
	});
   return MunicipioColecao;
});