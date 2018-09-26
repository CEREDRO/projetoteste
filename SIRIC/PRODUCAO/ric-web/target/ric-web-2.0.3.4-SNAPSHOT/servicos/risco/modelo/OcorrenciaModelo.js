define([
], function() {
	var OcorrenciaModelo = Backbone.Model.extend({
		
		pessoa: null,
		
		urlRoot: 'rest/risco/ocorrencia',
		
		defaults: function() {
			return {
				codigoPessoa: null, 
				tipoOcorrencia: null, 
				validadeDataInicio: null, 
				validadeDataTermino: null, 
				gradacao: null, 
				usuarioHomologacao: null, 
				dataHomologacao: null, 
				dataCadastramento: null,
				dataCancelamento: null, 
				usuarioCancelamento: null, 
				situacaoOcorrencia: null
			};
		},
		
		url: function() {
			return this.urlRoot + "/" + this.get('codigoPessoa') + "," + this.get('tipoOcorrencia').codigo + "," + this.get('dataCadastramento');
		}			
	});
	return OcorrenciaModelo;
});