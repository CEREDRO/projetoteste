define([
       'servicos/risco/modelo/PesquisaAvaliacaoModelo'
], function(PesquisaAvaliacaoModelo) {
   var PesquisaAvaliacaoColecao = Backbone.Collection.extend({
	
		pessoa: null,
		
		model: PesquisaAvaliacaoModelo,
		
		urlRoot: 'rest/risco/solicitaavaliacao',
	     
		url: function(){
			return this.urlRoot + '/' + this.pessoa.get('tipo').codigo;
		} 
	});
   return PesquisaAvaliacaoColecao;
});