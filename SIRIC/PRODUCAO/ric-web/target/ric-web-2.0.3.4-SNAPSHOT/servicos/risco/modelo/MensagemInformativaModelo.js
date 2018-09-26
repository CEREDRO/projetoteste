define([
], function() {
	var MensagemInformativaModelo = Backbone.Model.extend({

		urlRoot: 'rest/risco/mensageminformativa/1,1',

		defaults: function() {
			return {
				codigoMensagem: null,
				titulo: null,
				mensagem: null,
				ordem: null,
				dataFimApresentacao: null,
				dataLiberacao: null,
				tipo: null,
				tipoapresentacao: null,
				html: null
			};
		},

		url: function() {
			return this.urlRoot;
		}
	});
	return MensagemInformativaModelo;
});