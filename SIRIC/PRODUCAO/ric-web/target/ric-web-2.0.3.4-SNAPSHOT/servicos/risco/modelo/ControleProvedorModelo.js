define([
], function() {
	var ControleProvedorModelo = Backbone.Model.extend({
	
		urlRoot: 'rest/risco/controleavaliacao/verificaprovedor',
		
		defaults: function() {
			return {
				codigo: null,
				cpfCnpj: null, 
				situacao: null,
				codigoPessoa: null,
				cadastramento: null,
				ultimaModificacao: null,
				processo: null,
				avaliacao: null,
				quantidadeAvaliacao: null, 
				maquina: null,
				quantidadeTentativaExecucao: null, 
				usuario: null,
				origem: null,
				fila: null,
				gerenciador: null, 
				codigoClienteCaixa: null,
				codigoDemonstrativo: null,
				arquivo: null
			};
		},
	
		url: function() {
			return this.urlRoot;
		}
	});
	return ControleProvedorModelo;
});