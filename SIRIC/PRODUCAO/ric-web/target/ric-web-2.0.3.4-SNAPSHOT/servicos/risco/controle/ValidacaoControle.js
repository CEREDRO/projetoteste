define([
	'text!servicos/risco/visao/validacao.html',
	'bootstrap',
	'ajaxStatus',
	'servicos/risco/modelo/ValidacaoModelo',
	'servicos/risco/colecao/ValidacaoColecao'
], function(template, Bootstrap, AjaxStatus,ValidacaoModelo,ValidacaoColecao) {
	var ValidacaoControle = Backbone.View.extend({
	
		initialize: function() {
			this.pessoa = null;
			this.model = new ValidacaoModelo();
			this.collection = new ValidacaoColecao();
		},
		
		render: function() {
			this.$el.html(_.template(template,{'collection': this.collection}));
			return this;
		},
		
		carregaValidacao: function(pessoa){
			var self = this;
			this.collection.url = "rest/risco/controleavaliacao/validacao/" + this.pessoa;
			reiniciaContadorSessao();
			this.collection.fetch({
	            success: function(collection, response) {
	            	self.collection = collection;
	            	self.render();
	            	$('#validacao').modal('show');
	            },
	            error: $caixa.trataErro
			});
		}
	});
	return ValidacaoControle;
});