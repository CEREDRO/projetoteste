define([
], function() {
	var PessoaRuralModelo = Backbone.Model.extend({
			
		urlRoot: 'rest/risco/pessoas',
		
		defaults: function() {
			return {
				codigo: null, 
				nome: null,
				tipo: null, 
				dataInicio: null, 
				usuarioHomologacao: null,
				dataHomologacao: null,
				numeroEmpreendimento: null,
				dataAtualizacao: null,
				validacaoEfetuada: null,
				procBatch: null,
				codigoClienteCaixa: null, 
				NumeroParametrizacao: null,
				tempoPesquisa: null,
				codigoPropriedade: null,
				endereco: null,
				bairro: null,
				cidade: null,
				uf: null,
				cep: null,
				matricula: null,
				responsavel: null,
				municipio: null
			};
		},
		
		url: function() {
			return this.urlRoot;
		}			
	});
	return PessoaRuralModelo;
});
