define([
], function() {
	var GradacaoModelo = Backbone.Model.extend({
		
		pessoa: null,
		
		urlRoot: 'rest/risco/ocorrencia',
		
		defaults: function() {
			return {
				codigo: null, 
				denominacao: null, 
				descricao: null,
				dataAtualizacao: null,
				valor: null
			};
		},
		
		url: function() {
			return this.urlRoot + "/" + this.get('codigo');
		}			
	});
	return GradacaoModelo; 
});