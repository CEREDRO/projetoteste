define([
	'text!servicos/risco/visao/renda.html',
	'bootstrap',
	'ajaxStatus',
	'servicos/risco/modelo/RendaModelo',
	'servicos/risco/colecao/RendaColecao',
	'servicos/risco/controle/DetalheRendaFormalControle',
	'servicos/risco/controle/DetalheRendaInformalControle',
], function(template, Bootstrap, AjaxStatus,RendaModelo,RendaColecao,DetalheRendaFormalControle,DetalheRendaInformalControle) {
	var RendaControle = Backbone.View.extend({
	
		tagName: 'div',
		
		initialize: function() {
			this.model = new RendaModelo();
			this.collection = new RendaColecao();
		},	
		render: function() {
			this.$el.html(_.template(template,{'collection': this.collection, 'model' : this.model}));
			return this;
		},
		events: {
			"click tr": "exibeDetalhe"
		},
		exibeDetalhe: function(e){
			var tipo = $(e.currentTarget).data('tipo');
			var codigo = $(e.currentTarget).data('codigo');
			if (tipo == "F"){
				this.exibeDetalheRendaFormal(codigo);
			}else{
				this.exibeDetalheRendaInformal(codigo);
			}
		},
		exibeDetalheRendaFormal: function(codigo){
			this.detalheRendaFormal = new DetalheRendaFormalControle();
			this.detalheRendaFormal.codigo = codigo;
			$('#exibeDetalheRenda').html(this.detalheRendaFormal.render().el);
			this.detalheRendaFormal.carregaDetalheRendaFormal();
			$('#detRendForm').show();
		},
		exibeDetalheRendaInformal: function(codigo){
			this.detalheRendaInformal = new DetalheRendaInformalControle();
			this.detalheRendaInformal.codigo = codigo;
			$('#exibeDetalheRenda').html(this.detalheRendaInformal.render().el);
			this.detalheRendaInformal.carregaDetalheRendaInformal();
			$('#detRendForm').show();
		}
	});
	return RendaControle;
});