define([
	'text!servicos/risco/visao/itemavaliacao.html',
	'bootstrap',
	'ajaxStatus',
	'servicos/risco/modelo/ItemAvaliacaoModelo',
	'servicos/risco/colecao/ItemAvaliacaoColecao'
], function(template, Bootstrap, AjaxStatus,ItemAvaliacaoModelo,ItemAvaliacaoColecao) {
	var ItemAvaliacaoControle = Backbone.View.extend({
	
		initialize: function() { 
			this.model = new ItemAvaliacaoModelo();
			this.collection = new ItemAvaliacaoColecao();
		},
		
		render: function() {
			this.$el.html(_.template(template,{'collection': this.collection}));
			return this;
		},
		
		carregaItem: function(codigo){
			var self = this;
			this.collection.url = "rest/risco/avaliacao/item/" + codigo;
			reiniciaContadorSessao();
			this.collection.fetch({
	            success: function(collection, response) {
	            	self.collection = collection;
	            	$('#divItemAvaliacao').html(self.render().el);
	            	$('#itemAvaliacao').modal('show');
	            },
	            error: $caixa.trataErro
			});
		},
		carregaItemHistorico: function(codigo){
			var self = this;
			this.collection.url = "rest/risco/avaliacao/itemhist/" + codigo;
			reiniciaContadorSessao();
			this.collection.fetch({
	            success: function(collection, response) {
	            	self.collection = collection;
	            	$('#divItemAvaliacao').html(self.render().el);
	            	$('#itemAvaliacao').modal('show');
	            },
	            error: $caixa.trataErro
			});
		}
	});
	return ItemAvaliacaoControle;
});