define([
], function() {
	var QuadroModelo = Backbone.Model.extend({
		
		pessoa: null,
		
		urlRoot: 'rest/risco/quadro',
		
		defaults: function() {
			return {
				codigo: null,
				data: null, 
				anoReferencia: null, 
				modeloDemonstrativo: null, 
				codigoPessoa: null,
				tipo: null,
				usuarioHomologacao: null, 
				dataHomologacao: null,
				dataCadastramento: null,
				dataCancelamento: null,
				usuarioCancelamento: null,
				situacao: null
			};
		},
		
		url: function() {
			return this.urlRoot + "/" + this.get('codigo');
		}			
	});
	return QuadroModelo;
});