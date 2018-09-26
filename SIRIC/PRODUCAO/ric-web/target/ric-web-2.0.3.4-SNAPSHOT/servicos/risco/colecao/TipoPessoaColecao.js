define([
       'servicos/risco/modelo/TipoPessoaModelo'
], function(TipoPessoaModelo) {
	var TipoPessoaColecao = Backbone.Collection.extend({
		model: TipoPessoaModelo,
		urlRoot: 'rest/risco/tipopessoa',
	         
		url: function(){
			return this.urlRoot;
		}
   });
   return TipoPessoaColecao;
});