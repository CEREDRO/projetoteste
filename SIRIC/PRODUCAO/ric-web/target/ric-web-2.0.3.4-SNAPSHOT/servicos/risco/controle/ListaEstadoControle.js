define([
	'text!servicos/risco/visao/listaestado.html',
	'bootstrap',
	'ajaxStatus',
	'servicos/risco/colecao/EstadoColecao'
], function(template, Bootstrap, AjaxStatus,EstadoColecao) {
	var ListaEstadoControle = Backbone.View.extend({
		initialize: function(model, options){
			this.model = new EstadoColecao();
			this.ufselecionado = options.ufselecionado;
		},
		render: function() {
			var self = this;
			
			this.model.fetch({
				success: function(collection, response) {
					self.$el.html(_.template(template,{'colecao': collection}));
					self.$("#estado-"+self.ufselecionado).prop("selected", true);
	            },
	            error: $caixa.trataErro
			}, this);
			
			return this;
		},
	});
	return ListaEstadoControle;
});