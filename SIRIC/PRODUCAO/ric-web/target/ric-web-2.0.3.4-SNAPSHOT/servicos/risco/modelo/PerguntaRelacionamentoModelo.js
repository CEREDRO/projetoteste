define([
], function() {
	var PerguntaRelacionamentoModelo = Backbone.Model.extend({
	
		urlRoot: 'rest/risco/relacionamento/pergunta',
		
		defaults: function() {
			return {
				codigo: null,
				tipoRelacionamento: null, 
				papel: null,
				papelReciproco: null, 
				pergunta: null,
				tipoPessoa: null,
				aceitaRegDuplicado: null, 
				dataAtualizacao: null,
				obrigaResposta: null
			};
		},
	
		url: function() {
			return this.urlRoot;
		}
	});
	return PerguntaRelacionamentoModelo;
});