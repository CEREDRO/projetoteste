define([
	'text!servicos/risco/visao/fichacadastropessoafisica.html',
	'bootstrap',
	'ajaxStatus',
	'servicos/risco/modelo/FichaCadastroPessoaFisicaModelo'
], function(template, Bootstrap, AjaxStatus,FichaCadastroPessoaFisicaModelo) {
	var FichaCadastroPessoaFisicaControle = Backbone.View.extend({
	
		initialize: function() {
			this.codigo = null;
			this.model = new FichaCadastroPessoaFisicaModelo();
		},
		
		render: function() {
			this.$el.html(_.template(template,{'model': this.model}));
			return this;
		},
		
		efetuaCarga: function(){
			var self = this;
			this.model = new FichaCadastroPessoaFisicaModelo();
			this.model.urlRoot = "rest/risco/pessoas/fichaCadastroPF/" + this.codigo;
			this.model.fetch({
    			success: function(model, response) {
    				self.model = model;
    				self.trigger('success');
    			},
    			error: $caixa.trataErro
			});
		}
	});
	return FichaCadastroPessoaFisicaControle;
});