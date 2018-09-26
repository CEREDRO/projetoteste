define([
	'text!servicos/risco/visao/ajuda.html',
	'bootstrap',
	'ajaxStatus',
	'servicos/risco/modelo/AjudaModelo'
], function(template, Bootstrap, AjaxStatus,AjudaModelo) {
	var AjudaControle = Backbone.View.extend({
	
		initialize: function() {
			this.tipo = null;
			this.pergunta = null;
			this.codigo = null;
			this.model = new AjudaModelo();
		},
		
		render: function() {
			this.$el.html(_.template(template,{'model': this.model}));
			return this;
		},
		
		carregaAjuda: function(){
			var self = this;
			this.model.url = "rest/risco/ajuda/" + this.tipo + "," + this.pergunta + "," + this.codigo;
			reiniciaContadorSessao();
			this.model.fetch({
	            success: function(model, response) {
	        		self.model = model;
	            	self.render();
	            	$('#ajuda').modal('show');
	            },
	            error: $caixa.trataErro
			});
		}
	});
	return AjudaControle;
});