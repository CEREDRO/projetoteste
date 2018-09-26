define([
], function() {
	var ConsultaAvaliacaoModelo = Backbone.Model.extend({
	
		urlRoot: 'rest/risco/avaliacao',
		
		defaults: function() {
			return {
				codigo: null,
				modeloAvaliacao: null,
				codigoPessoa: null,
				data: null,     
				valorNota: null,
				conceito: null,
				usuarioHomologacao: null,
				dataHomologacao: null,
				dataCancelamento: null,
				dataTermino: null,
				tempoDuracao: null,
				usuarioCancelamento: null,
				liberaVisualizacao: null,
				dataLiberaVisualizacao: null,
				usuarioLiberaVisualizacao: null,
				situacao: null,
				quantidadeErros: null,
				avaliador: null,
				dataProcSiapc: null,
				indicaContratacao: null,
				indicaBloqueado: null,
				dataDesbloqueio: null,
				usuarioDesbloqueio: null,
				indicaBloqueioRendaPresumida: null,
				dataDesbloqueioRendaPresumida: null,
				usuarioDesbloqueioRendaPresumida: null,
				dataValidade: null,
				produto: null,
				indicaAutomatica: null,
				indicaConsulta: null,
				indicaCancela: null,
				indicaImprime: null,
				indicaLibera: null,
				indicaLiberaAvaliacao: null,
				indicaNota: null,
				indicaBloqueioTomador: null,
				dataDesbloqueioTomador: null,
				usuarioDesbloqueioTomador: null,
				indicaLiberaTomador: null
			};
		},
	
		url: function() {
			return this.urlRoot;
		}
	});
	return ConsultaAvaliacaoModelo;
});