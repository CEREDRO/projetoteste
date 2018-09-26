define([
	'text!servicos/risco/simplificado/visao/consultaavaliacao.html',
	'bootstrap',
	'ajaxStatus',
	'servicos/risco/colecao/ConsultaAvaliacaoColecao'
], function(template, Bootstrap, AjaxStatus,ConsultaAvaliacaoColecao) {
	var ConsultaAvaliacaoControle = Backbone.View.extend({
	
		tagName: 'div',
		
		initialize: function() {
			this.pessoa = null;
			this.avalicao = null;
			this.collection = new ConsultaAvaliacaoColecao();
		},
		
		
		render: function() {
			this.$el.html(_.template(template,{'collection': this.collection}));
			return this;
		},
		
		carregaAvalicao: function(v){
			var self = this;
			this.collection.url = "rest/risco/avaliacao/" + this.pessoa.get('codigo') + ",0";
			reiniciaContadorSessao();
			this.collection.fetch({
	            success: function(collection, response) {
	            	self.collection = collection;
	            	self.render();
	            	if (v != null && v == 1){
	            		$('#consultaAvaliacao').collapse('show');
	            	}
	            },
	            error: $caixa.trataErro
			});
		}
	});
	return ConsultaAvaliacaoControle;
});
