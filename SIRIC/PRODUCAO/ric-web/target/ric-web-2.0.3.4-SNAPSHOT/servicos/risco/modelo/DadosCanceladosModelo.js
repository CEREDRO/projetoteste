define([
], function() {
	var DadosCanceladosModelo = Backbone.Model.extend({
	
		urlRoot: 'rest/risco/dadoscancelados',
		
		defaults: function() {
			return {
				tipo: null, 
			    codigo: null, 
			    descricao: null,
			    codigo2: null,
			    descricao2: null,
			    dataInicio: null,
			    dataFim: null,
			    valor: null,
			    dataCancelamento: null, 
			    dataHomologacao: null,
			    dataCadastramento: null,
			    detalhe: null,
			    relqvid: null,
			    demonstid: null,
			    numcod: null,
			    usuarioCancelamento: null, 
			    usuarioHomologacao: null
			};
		},
	
		url: function() {
			return this.urlRoot;
		}
	});
	return DadosCanceladosModelo;
});