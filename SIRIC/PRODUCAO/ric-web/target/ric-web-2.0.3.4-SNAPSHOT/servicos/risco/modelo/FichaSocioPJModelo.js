define([
], function() {
	var FichaSocioPJModelo = Backbone.Model.extend({
	
		urlRoot: 'rest/risco/pessoas/fichasociopj/',
		
		defaults: function() {
			return {
				codigoSocio: null,
				codigoEmpresa: null,
				nomeempresa: null,
				cnpjEmpresa: null,
				razaoSocial: null,
				cnpjSocio: null,
				nomeFantasia: null,
				cidade: null,
				uf: null,
				cep: null,
				endereco: null,
				complemento: null,
				numero: null,
				bairro: null,
				municipio: null,
				ufMunicipio: null,
				contato: null,
				telefone1: null,
				telefone2: null,
				email: null, 	
				condicaoSede: null,	
				indicaFranquia: null,
				nomeFranqueador: null,
				quantidadeSocios: null,
				socios: null,
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
	return FichaSocioPJModelo;
});