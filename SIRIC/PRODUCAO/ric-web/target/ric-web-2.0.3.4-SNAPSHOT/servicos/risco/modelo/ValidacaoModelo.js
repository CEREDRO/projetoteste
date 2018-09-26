define([
], function() {
	var ValidacaoModelo = Backbone.Model.extend({
	
		urlRoot: 'rest/risco/controleavaliacao/validacao',
		
		defaults: function() {
			return {
				pessoaValidada: null,
				codiogPessoa: null, 
				nome: null, 
				cpfCnpj: null, 
				tipo: null,
				item: null,
				mensagem: null
			};
		},
	
		url: function() {
			return this.urlRoot + this.get('codiogPessoa');
		}
	});
	return ValidacaoModelo;
});