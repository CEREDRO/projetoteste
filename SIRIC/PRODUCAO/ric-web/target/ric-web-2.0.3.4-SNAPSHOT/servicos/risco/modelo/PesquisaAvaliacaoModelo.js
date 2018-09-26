define([
], function() {
		var PesquisaAvaliacaoModelo = Backbone.Model.extend({
			
			urlRoot: 'rest/risco/solicitaavaliacao',
			
			pessoa: null,
			
			defaults: function() {
				return {
					numero: null, 
					descricao: null
				};
			},
			
			url: function() {
				return this.urlRoot + '/' + this.pessoa.get('tipo').codigo;
			}			
		});
		return PesquisaAvaliacaoModelo;
	}
);