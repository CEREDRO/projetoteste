define([
	'text!servicos/risco/visao/pessoaconsultada.html',
	'bootstrap',
	'ajaxStatus',
	'servicos/risco/colecao/PessoaConsultadaColecao',
	'servicos/risco/simplificado/controle/PesquisaAvancadaControle'
], function(template, Bootstrap, AjaxStatus,PessoaConsultadaColecao,PesquisaAvancadaControleSimplificado) {
	var PessoaConsultadaControle = Backbone.View.extend({
	
		initialize: function() {
			this.AjaxStatus = new AjaxStatus();
			this.collection = null;
		},
		
		tagName: 'div',
			
		render: function() {
			this.$el.html(_.template(template,{'collection': this.collection}));
			return this;
		},
		events: {
			"click .retornaPessoaConsultada": "carrega"
		},
		carrega: function(e){	
			$('#divAvaliar').html('');  
			this.AjaxStatus.start();
			var id = $('#' + e.currentTarget.id).data('codigo');
			var pesquisaAvancada = new PesquisaAvancadaControleSimplificado();
			pesquisaAvancada.view = this;
			pesquisaAvancada.verifica = 1;
			pesquisaAvancada.retornaUnico(id,1);
		}
	});
	return PessoaConsultadaControle;
});
