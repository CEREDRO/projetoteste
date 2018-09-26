define([
], function() {
	var RendaModelo = Backbone.Model.extend({
			
		urlRoot: 'rest/risco/rendas',
		
		defaults: function() {
			return {
				id: null,
				nome: null,
				tipo: null,
				valorBruto: null,
				valorLiquido: null,
				cpfcnpj: null,
				tipoPessoa : null
			};
		},
		
		url: function() {
			return this.urlRoot + '/' + this.get('coPessoa');
		}
	});
	return RendaModelo;
});