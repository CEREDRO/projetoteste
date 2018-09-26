define([
], function() {
	var DemonstrativoRelacionamentoModelo = Backbone.Model.extend({
	
		pessoa: null,
		
		urlRoot: 'rest/risco/itemquadro/qvrel/',
		
		defaults: function() {
			return {
				codigoDemonstrativo: null,
				codigoRelacionamento: null
			};
		},
	
		url: function() {
			return this.urlRoot + this.pessoa.get('codigo') +  "," + this.get('codigoRelacionamento');
		}
	});
	return DemonstrativoRelacionamentoModelo;
});