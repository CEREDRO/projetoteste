define([
], function() {
	var ItemQuadroModelo = Backbone.Model.extend({
		
		codigo: null,
		
		urlRoot: 'rest/risco/itemquadro',
		
		defaults: function() {
			return {
				descricao: null,
				anoReferencia: null,
				permite: null,
				listaItemDemonstrativo: null
			};
		},
		
		url: function() {
			return this.urlRoot + "/" + this.codigo;
		}			
	});
	return ItemQuadroModelo;
});