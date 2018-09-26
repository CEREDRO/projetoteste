define([
	'text!servicos/risco/visao/confirmacao.html',
	'bootstrap',
	'ajaxStatus',
	'servicos/risco/modelo/ConfirmacaoModelo'
], function(template, Bootstrap, AjaxStatus,ConfirmacaoModelo) {
	var ConfirmacaoControle = Backbone.View.extend({
	
		initialize: function() {
			this.model = new ConfirmacaoModelo();
		},
		
		events: {
			"click #btnConfirmaMensagem": "ok"
		},
		render: function() {
			this.$el.html(_.template(template,this.model.attributes));
			return this;
		},
		exibeConfirmacao: function(){
			$('#divConfirmacao').html(this.render().el);
			$('#confirmacao').modal('show');
		},
		ok: function(){
			this.model = {
				titulo: null,
				conteudo: null
			};
			$('#confirmacao').modal('hide');
			this.$el.html('');
			this.trigger('ok');
		}
	});
	return ConfirmacaoControle;
});