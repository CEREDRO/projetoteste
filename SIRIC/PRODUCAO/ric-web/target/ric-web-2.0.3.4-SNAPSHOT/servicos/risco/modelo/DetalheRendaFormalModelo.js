define([
], function() {
	var DetalheRendaFormalModelo = Backbone.Model.extend({
	
		urlRoot: 'rest/risco/rendas/formal',
		
		defaults: function() {
			return {
				codigoPessoa: null,
				tipoPessoa: null,
				cgcCpf: null,
				razaoSocial: null,
				codigoOcupacao: null,
				descricaoOcupacao: null,
				dataAdmissao: null,
				dataDemissao: null,
				rendaBruta: null,
				rendaLiquida: null,
				tempoEmpregoAnteriorAnos: null,
				tempoEmpregoanteriorMeses: null,
				anoDesligamento: null,
				enderecoComercial: null,
				enderecoNumero: null,
				enderecoComplemento: null,
				enderecoBairro: null,
				enderecoMunicipio: null,
				enderecoUf: null,
				enderecoCep: null,
				enderecoCorrespondencia: null,
				telefoneComercial: null,
				faxComercial: null,
				dddTelefoneComercial: null,
				dddFaxComercial: null,
				codigoComprovanteRenda: null,
				descricaoComprovanteRenda: null,
				impostoRenda: null,
				dataDocumento: null,
				dataComprovante: null
			};
		},
	
		url: function() {
			return this.urlRoot;
		}
	});
	return DetalheRendaFormalModelo;
});