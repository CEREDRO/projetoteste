define([
], function() {
	var RelacionamentoModelo = Backbone.Model.extend({
		
		pessoa: null,
		
		urlRoot: 'rest/risco/relacionamento',
		
		defaults: function() {
			return {
				codigo: null, 
				codigoPessoa: null, 
				papel: null, 
				papelReciproco: null, 
				pessoaReciproca: null, 
				tipoRelacionamento: null, 
				validadeDataInicio: null, 
				validadeDataTermino: null, 
				valor: null, 
				dataHomologacao: null, 
				dataCadastramento: null, 
				dataCancelamento: null, 
				situacao: null, 
				usuarioCancelamento: null, 
				usuarioHomologacao: null
			};
		},
		
		url: function() {
			return this.urlRoot;
		}			
	});
	return RelacionamentoModelo;
});