define([
	'text!servicos/risco/visao/fichasociopf.html',
	'bootstrap',
	'ajaxStatus',
	'servicos/risco/modelo/FichaSocioPFModelo'
], function(template, Bootstrap, AjaxStatus,FichaSocioPFModelo) {
	var FichaSocioPFControle = Backbone.View.extend({
	
		initialize: function() {
			this.codigo = null;
			this.empresa = null;
			this.model = new FichaSocioPFModelo();
		},
		
		render: function() {
			this.$el.html(_.template(template,{'model': this.model}));
			return this;
		},
		
		efetuaCarga: function(){
			var self = this;
			this.model = new FichaSocioPFModelo();
			this.model.urlRoot = "rest/risco/pessoas/fichasociopf/" + this.codigo + "," + this.empresa;
			this.model.fetch({
    			success: function(model, response) {
    				self.model = model;
    				self.trigger('success');
    			},
    			error: $caixa.trataErro
			});
		}
	});
	return FichaSocioPFControle;
});