define([
], function() {
	var UsuarioModelo = Backbone.Model.extend({
	
		urlRoot: 'rest/risco/usuario/retorna',
		
		defaults: function() {
			return {
				codigo: null,
				nome: null,
				lotacao: null
			};
		},
	
		url: function() {
			return this.urlRoot;
		}
	});
	return UsuarioModelo;
});