define([
], function() {
	var DetalheAvaliacaoModelo = Backbone.Model.extend({
	
		urlRoot: 'rest/risco/avaliacao/detalhe/',
		
		codigo: null,
		
		defaults: function() {
			return {
				codigo: null,
				usuario: null,
				dataMigracao: null,
				erroMigracao: null,
				usuarioCancel: null,
				dataCancelamento: null,
				usuarioDesbloqueio: null,
				dataDesbloqueio: null,
				sistema: null
			};
		},
	
		url: function() {
			return this.urlRoot + this.codigo;
		}
	});
	return DetalheAvaliacaoModelo;
});