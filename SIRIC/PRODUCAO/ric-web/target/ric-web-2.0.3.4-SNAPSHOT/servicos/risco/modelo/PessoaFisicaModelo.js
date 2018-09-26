define([
], function() {
	var PessoaFisicaModelo = Backbone.Model.extend({
			
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
				pessoaCpf: null, 
				endereco: null, 
				complemento: null, 
				bairro: null, 
				cidade: null,
				uf: null,
				cep: null,
				telefone: null,
				telefone2: null,
				telefoneCelular: null,
				fax: null,
				eMail: null,
				numeroIdentidade: null,
				datatEmissaoIdentidade: null,
				orgaoEmissaoIdentidade: null,
				ufEmissaoIdentidade: null,
				pisPasep: null,
				enderecoCorrespondencia: null,
				nomePai: null,
				nomeMae: null,
				enderecoNumero: null,
				codigoDddTelefone: null,
				codigoDddTelefone2: null,
				codigoDddCelular: null,
				nomeReferencia1: null,
				nomeReferencia2: null,
				numeroTelefoneRef1: null,
				numeroTelefoneRef2: null,
				codigoDddRef1: null,
				codigoDddRef2: null,
				sexo: null,
			    nacionalidade: null,
				naturalidade: null,
				ufNaturalidade: null,
				estadoCivil: null,
				nomeConjugue: null,
				cpfConjugue: null,
				identidadeConjugue: null,
				dataNascConjugue: null,
				grauInstrucao: null,
				valorRendaFormal: null,
		        valorRendaInformal: null,
		        valorTotalRenda: null,
		    	quantidadeRendaFormal: null,  
		    	quantidadeRendaInformal: null,
		    	quantidadeTotalRenda: null,
		    	codigoAvaliacao: null,
		    	dataAvaliacao: null,
		    	valorCrot: null,
		        nomeCrot: null,
		        valorCartao: null,
		        nomeCartao: null,
		        valorParcelado: null,
		        nomeParcelado: null,
		    	obito: null
			};
		},
		
		url: function() {
			return this.urlRoot + '/' + this.get('cpfCnpj') + ',' + this.get('tipopessoaid');
		}			
	});
	return PessoaFisicaModelo;
});