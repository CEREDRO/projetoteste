define([
], function() {
	var ProvedorModelo = Backbone.Model.extend({
	
		urlRoot: 'rest/risco/controleavaliacao/avaliar',
		
		defaults: function() {
			return {
				pessoaFisica: null,
				pessoaJuridica: null,
				modeloAvaliacaos: null
				
			};
		},
	
		url: function() {
			return this.urlRoot;
		}
	});
	return ProvedorModelo;
});