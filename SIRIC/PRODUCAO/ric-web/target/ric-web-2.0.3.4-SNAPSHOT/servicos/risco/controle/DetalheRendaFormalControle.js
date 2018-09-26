define([
	'text!servicos/risco/visao/detalherendaformal.html',
	'bootstrap',
	'ajaxStatus',
	'servicos/risco/modelo/DetalheRendaFormalModelo'
], function(template, Bootstrap, AjaxStatus,DetalheRendaFormalModelo) {
	var DetalheRendaFormalControle = Backbone.View.extend({
	
		initialize: function() {
			this.codigo = null;
			this.model = new DetalheRendaFormalModelo();
		},
		
		render: function() {
			this.$el.html(_.template(template,{'model': this.model}));
			return this;
		},
		
		carregaDetalheRendaFormal: function(){
			var self = this;
			this.model.url = "rest/risco/rendas/formal/" + this.codigo;
			reiniciaContadorSessao();
			this.model.fetch({
	            success: function(model, response) {
	            	self.model = model;
	            	self.render();
	            	$('#detRendForm').modal('show');
	            },
	            error: $caixa.trataErro
			});
		}
	});
	return DetalheRendaFormalControle;
});