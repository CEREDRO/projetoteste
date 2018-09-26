define([
], function() {
	var AjaxStatus = Backbone.View.extend({
		/**
		 * Construtor
		 * 
		 * @param id Id do componente visual. Se nao for informado o id default sera ajaxStatus
		 */
		initialize: function() {
			this.id = 'ajaxStatus';
		},
		
		/**
		 * Exibe o ajax status.
		 */
		start: function() {
			$('#'+this.id).modal('show');
		},
		
		/**
		 * Define uma mensagem a ser exibida para informar o usuario
		 * sobre o que esta sendo realizado.
		 */
		exibeMensagem: function(mensagem) {
			var ident = '#'+this.id+'Message';
			$(ident).html(mensagem);
		},
		
		/**
		 * Fecha o ajax status.
		 */
		stop: function() {
			$('#'+this.id).modal('hide');
			$('#'+this.id+'Message').html('');
		}
	});
	return AjaxStatus;
});

