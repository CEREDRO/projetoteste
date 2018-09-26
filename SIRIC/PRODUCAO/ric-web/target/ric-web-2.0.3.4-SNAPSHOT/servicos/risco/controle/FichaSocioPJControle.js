define([
	'text!servicos/risco/visao/fichasociopj.html',
	'bootstrap',
	'ajaxStatus',
	'servicos/risco/modelo/FichaSocioPJModelo'
], function(template, Bootstrap, AjaxStatus,FichaSocioPJModelo) {
	var FichaSocioPJControle = Backbone.View.extend({
	
		initialize: function() {
			this.codigo = null;
			this.empresa = null;
			this.model = new FichaSocioPJModelo();
		},
		
		render: function() {
			this.$el.html(_.template(template,{'model': this.model}));
			return this;
		},
		
		efetuaCarga: function(){
			var self = this;
			this.model = new FichaSocioPJModelo();
			this.model.urlRoot = "rest/risco/pessoas/fichasociopj/" + this.codigo + "," + this.empresa;
			this.model.fetch({
    			success: function(model, response) {
    				self.model = model;
    				console.log(model);
    				self.trigger('success');
    			},
    			error: $caixa.trataErro
			});
		}
	});
	return FichaSocioPJControle;
});