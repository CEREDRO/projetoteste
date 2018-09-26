define([
       'servicos/risco/modelo/PessoaModelo'
], function(PessoaModelo) {
	var PessoaColecao = Backbone.Collection.extend({
	
		model: PessoaModelo,
		
		urlRoot: '',
	     
		url: function(){
			return this.urlRoot;
		} 
	});
	return PessoaColecao;
});