define([
       'servicos/risco/modelo/RendaModelo'
], function(RendaModelo) {
	var RendaColecao = Backbone.Collection.extend({
		pessoa : null,
		model: RendaModelo,
		urlRoot: 'rest/risco/rendas',
	     
		url: function(){
			return this.urlRoot + '/' + this.pessoa.get('codigo');
		} 
	});
	return RendaColecao;
});