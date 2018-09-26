define([
], function() {
	var FichaSocioPFModelo = Backbone.Model.extend({
	
		urlRoot: 'rest/risco/pessoas/fichasociopf/',
		
		defaults: function() {
			return {
				codigo: null,
				empresa: null,
				cnpj: null,
				identificacao: null,
				percentualParticipacao: null,
				nome: null,
				cpf: null,
				estadoCivil: null,
				sexo: null,
				cpfConjuge: null,
				nomeConjugue: null,
				dataNascimento: null,
				cep: null,
				endereco: null,
				numeroEndereco: null,
				complemento: null,
				bairro: null,
				municipio: null,
				uf: null,
				telefonecelular: null,
				telefoneResidencial: null,
				telefoneComercial: null,
				email: null,
				tipoResidencia: null,
				possuiImovel: null,
				tipoImovel1: null,
				valorImovel1: null,
				tipoImovel2: null,
				valorImovel2: null,
				tipoImovel3: null,
				valorImovel3: null,
				tipoImovel4: null,
				valorImovel4: null,
				tipoImovel5: null,
				valorImovel5: null,
				tipoImovel6: null,
				valorImovel6: null,
				participaOutraEmpresa: null,
				quantidadeParticipacao: null,
				anoReferencia: null,
				fichaSocioParticipacoes: null
			};
		},
	
		url: function() {
			return this.urlRoot;
		}
	});
	return FichaSocioPFModelo;
});