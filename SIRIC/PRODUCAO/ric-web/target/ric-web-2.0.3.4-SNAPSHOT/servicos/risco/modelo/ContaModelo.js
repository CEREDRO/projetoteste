define([
], function() {
	var ContaModelo = Backbone.Model.extend({
	
		urlRoot: '',
		
		defaults: function() {
			return {
				codigo: null,            
				denominacao: null,
				unidade: null,          
				dataAtualizacao: null,
				gradacaoOcorrencia: null,
				listaGradacaoOcorrencia: null,
				mensagem: null,        
				visivel: null
			};
		},
	
		url: function() {
			return this.urlRoot;
		}
	});
	return ContaModelo;
});