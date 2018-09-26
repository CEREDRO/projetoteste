define([
	'text!servicos/risco/visao/detalherendainformal.html',
	'bootstrap',
	'ajaxStatus',
	'servicos/risco/modelo/DetalheRendaInformalModelo'
], function(template, Bootstrap, AjaxStatus,DetalheRendaInformalModelo) {
	var DetalheRendaInformalControle = Backbone.View.extend({
	
		initialize: function() {
			this.codigo = null;
			this.model = new DetalheRendaInformalModelo();
		},
		
		render: function() {
			this.$el.html(_.template(template,{'model': this.model}));
			return this;
		},
		
		carregaDetalheRendaInformal: function(){
			var self = this;
			this.model.url = "rest/risco/rendas/informal/" + this.codigo;
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
	return DetalheRendaInformalControle;
});