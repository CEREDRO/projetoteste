define([
], function() {
	var PessoaConsultadaModelo = Backbone.Model.extend({
			
		urlRoot: 'rest/risco/pessoasConsultadas',
		
		defaults: function() {
			return {
				cogioPessoa: null,
				nome: null,
				cpfCnpj: null,
				tipoPessoa: null,
				codigoUsuario: null,
				matricula: null,
				tipo: null
			};
		},
		
		url: function() {
			return this.urlRoot + '/' + this.get('codUsuario');
		}
	});
	return PessoaConsultadaModelo;
});