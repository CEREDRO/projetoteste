define([
	'text!servicos/risco/visao/fichacadastropessoajuridica.html',
	'bootstrap',
	'ajaxStatus',
	'servicos/risco/modelo/FichaCadastroPessoaJuridicaModelo'
], function(template, Bootstrap, AjaxStatus,FichaCadastroPessoaJuridicaModelo) {
	var FichaCadastroPessoaJuridicaControle = Backbone.View.extend({
	
		initialize: function() {
			this.codigo = null;
			this.model = new FichaCadastroPessoaJuridicaModelo();
		},
		
		render: function() {
			this.$el.html(_.template(template,{'model': this.model}));
			return this;
		},
		
		efetuaCarga: function(){
			var self = this;
			this.model = new FichaCadastroPessoaJuridicaModelo();
			this.model.urlRoot = "rest/risco/pessoas/fichaCadastroPJ/" + this.codigo;
			this.model.fetch({
    			success: function(model, response) {
    				self.model = model;
    				self.trigger('success');
    			},
    			error: $caixa.trataErro
			});
		}
	});
	return FichaCadastroPessoaJuridicaControle;
});