define([
	'text!servicos/risco/visao/mensageminformativo.html',
	'bootstrap',
	'ajaxStatus',
	'servicos/risco/modelo/MensagemInformativaModelo',
	'servicos/risco/colecao/MensagemInformativaColecao'
], function(template, Bootstrap, AjaxStatus, MensagemInformativaModelo, MensagemInformativaColecao) {
	var MensagemInformativoControle = Backbone.View.extend({
	
		initialize: function() {
			this.model = new MensagemInformativaModelo();
			this.collection = new MensagemInformativaColecao();
		},
		render: function() {
			this.$el.html(_.template(template,{'collection': this.collection}));
			return this.$el;
		},
		afterRender: function(){
			var self = this;
			setTimeout(function(){
				$('#frameMensagem').contents().find('body').html(self.collection.at(0).get('mensagem'));
				self.collection.index = 0;
				$('#mensagemInformativo').modal('show');
		    }, 500);			
		},
		
		events: {
			"click .exibe-mensagem": "exibeMensagem",
			"click #mensagemAnterior" : "mensagemAnterior",
			"click #proximaMensagem" : "proximaMensagem"
		},		
		exibeMensagem: function(e){
			this.collection.each(function(model){
				if(model.get('codigoMensagem') == $(e.currentTarget).data('codigo')){
					$('#frameMensagem').contents().find('body').html(model.get('mensagem'));
					this.collection.index = $(e.currentTarget).data('posicao') - 1;
					console.log(this.collection.index);
				}
			}, this);
		},
		mensagemAnterior: function(e){
			if (this.collection.index > 0){
				this.collection.index = this.collection.index - 1;
			}
			
			$('#frameMensagem').contents().find('body').html(this.collection.at(this.collection.index).get('mensagem'));
		},
		proximaMensagem: function(e){
			if (this.collection.index < (this.collection.length - 1)){
				this.collection.index = this.collection.index + 1;
			}
			
			$('#frameMensagem').contents().find('body').html(this.collection.at(this.collection.index).get('mensagem'));
		}
	});
	return MensagemInformativoControle;
});