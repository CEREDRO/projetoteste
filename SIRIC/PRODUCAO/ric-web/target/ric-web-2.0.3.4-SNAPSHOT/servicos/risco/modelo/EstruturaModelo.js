define([
], function() {
	var EstruturaModelo = Backbone.Model.extend({
	
		urlRoot: '',
		
		defaults: function() {
			return {
				codigo: null,
				modeloDemonstrativo: null,
				conta: null,
			    estruturaSintese: null,
			    estruturaResultado: null,
			    estruturaSequencia: null,
			    estruturaSinal: null,       
			    estruturaIndResultado: null,
			    dataAtualizacao: null,
			    ordemApresentacao: null,
			    indicaPai: null
			};
		},
	
		url: function() {
			return this.urlRoot;
		}
	});
	return EstruturaModelo;
});