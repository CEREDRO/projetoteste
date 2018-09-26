define([
], function() {
	var MunicipioModelo = Backbone.Model.extend({
		
		defaults: function() {
			return {
				codigo: null,
				nome: null,
				estado: null
			};
		}		
	});
	return MunicipioModelo;
});

