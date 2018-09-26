define([
], function() {
	var TipoPessoaModelo = Backbone.Model.extend({
			
			urlRoot: 'rest/risco/tipopessoa',
			
			defaults: function() {
				return {
					codigo: null, 
					descricao: null,
					dataAtualizacao: null
				};
			},
			
			url: function() {
				return this.urlRoot;
			}
		});
		return TipoPessoaModelo;
	}
);