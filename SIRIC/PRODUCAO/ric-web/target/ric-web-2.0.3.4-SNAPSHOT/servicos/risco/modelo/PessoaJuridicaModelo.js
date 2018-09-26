define([
], function() {
	var PessoaJuridicaModelo = Backbone.Model.extend({
			
		urlRoot: 'rest/risco/pessoas',
		
		defaults: function() {
			return {
				codigo: null,
				nome: null,
				tipo:null, 
				dataAtualizacao: null,
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
				pessoaCnpj: null, 
				codigoAtividade: null,
				endereco: null, 
				numero: null,
				complemento: null,
				bairro: null, 
				cidade: null, 
				uf: null, 
				cep: null, 
				telefone: null, 
				fax: null, 
				eMail: null, 
				nomeContato: null,
				descricaoAtividade: null,
				indicaFranquia: null,
				descricaoRegimeTrib: null,
				dataUltAtlContratu: null,
				mediaUltMeses: null,
				quantidadeMenses: null,
				valorFatAnual: null,
				dataFatAnual: null,
				codigoAvaliacao: null,
				dataAvaliacao: null,
				valorCrot: null,
				nomeCrot: null,
				valorCartao: null,
				nomeCartao: null,
				valorParcelado: null,
				nomeParcelado: null,
				valorLar: null,
				nomeLar: null
			};
		},
		
		url: function() {
			return this.urlRoot + '/' + this.get('cpfCnpj') + ',' + this.get('tipopessoaid');
		}			
	});
	return PessoaJuridicaModelo;
});