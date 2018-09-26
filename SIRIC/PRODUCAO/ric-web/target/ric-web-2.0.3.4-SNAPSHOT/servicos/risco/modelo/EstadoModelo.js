define([
], function() {
	var EstadoModelo = Backbone.Model.extend({
		
		defaults: function() {
			return {
				codigo: null,
				nome: null,
				sigla: null
			};
		}		
	});
	return EstadoModelo;
});

