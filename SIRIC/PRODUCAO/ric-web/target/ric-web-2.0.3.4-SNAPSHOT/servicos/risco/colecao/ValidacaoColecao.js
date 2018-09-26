define([
       'servicos/risco/modelo/ValidacaoModelo'
], function(ValidacaoModelo) {
	var ValidacaoColecao = Backbone.Collection.extend({
		model: ValidacaoModelo,
		urlRoot: 'rest/risco/controleavaliacao/validacao',
	         
		url: function(){
			return this.urlRoot + this.model.get('codiogPessoa');
		}
	});
	return ValidacaoColecao;
});