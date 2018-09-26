define([
], function() {
	var FormularioModelo = Backbone.Model.extend({
		
		pessoa: null,
		
		urlRoot: 'rest/risco/solicitaavaliacao/formulario',
		
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
				obrigatorio: null, 
				detalhe: null, 
				posicao: null, 
				exibeDataInicio: null, 
				exibeDataFim: null, 
				exibevalor: null, 
				exibeExclusao: null, 
				quantidadeMaxima: null, 
				numeroPergunta: null, 
				codigoRelQv: null, 
				codigoDemonstrativo: null, 
				numerocod: null, 
				situacaoAval: null,
				indicaInclusao: null, 
				indicaAlteracao: null, 
				indicaConsulta: null,
				indicaAjuda: null,
				indicaHomologado: null,
				nomeDataInicio: null,
				nomeDataFim: null,
				nomeValor: null,
				indicaTodas: null,
				rLink: null,
				numeroquantidadeTotal: null,
				tipoPessoaReciproca: null,
				matricula: null,
				codigoPropriedade: null
			};
		},
		
		url: function() {
			return this.urlRoot;
		}			
	});
	return FormularioModelo;
});