define([
       'servicos/risco/modelo/PessoaConsultadaModelo'
], function(PessoaConsultadaModelo) {
	var PessoaConsultadaColecao = Backbone.Collection.extend({
		pessoa : null,
		model: PessoaConsultadaModelo,
		urlRoot: 'rest/risco/pessoasConsultadas/consulta',
	     
		url: function(){
			return this.urlRoot;
		} 
	});
	return PessoaConsultadaColecao;
});