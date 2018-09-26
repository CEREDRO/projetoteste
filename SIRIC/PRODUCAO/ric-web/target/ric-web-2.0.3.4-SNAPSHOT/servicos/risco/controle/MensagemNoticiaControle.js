define([
	'text!servicos/risco/visao/mensagemnoticia.html',
	'bootstrap',
	'ajaxStatus',
	'servicos/risco/modelo/MensagemInformativaModelo',
	'servicos/risco/colecao/MensagemInformativaColecao',
	'servicos/risco/controle/SIRICUtilsControle'
], function(template, Bootstrap, AjaxStatus, MensagemInformativaModelo, MensagemInformativaColecao, SIRICUtilsControle) {
	var MensagemInformativoControle = Backbone.View.extend({
	
		initialize: function() {
			this.model = new MensagemInformativaModelo();
			this.collection = new MensagemInformativaColecao();
			this.util = new SIRICUtilsControle();
		},
		events: {
		    "click #esconderContainer": "esconderContainer",
		    "click #mensagemnoticiatitulo": "visualizarMensagem",
		},
		render: function() {
			this.$el.html(_.template(template,{'collection': this.collection}));
			return this.$el;
		},
		esconderContainer: function (id) {
			this.util.limparContainer('divMensagemNoticia');
		},
		visualizarMensagem: function(e){
			var modelo = this.collection.find(function(model){
				return model.get("codigoMensagem") == $(e.target).data('codigo');
			});
			
			$('#modalMensagemNoticiaTitulo').html(modelo.get("titulo"));
			$('#frameMensagem').contents().find('body').html(modelo.get("mensagem"));
			$('#mensagemnoticiatexto').modal('show');
		}
	});
	return MensagemInformativoControle;
});