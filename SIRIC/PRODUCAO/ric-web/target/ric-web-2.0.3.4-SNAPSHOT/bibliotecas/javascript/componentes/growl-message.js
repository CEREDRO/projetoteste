/************************************************************************
 * Classe GrowlMessage													*
 ************************************************************************
 * Exibe mensagens do tipo INFO, WARN e ERROR num container (div)		*
 * de mensagem no formato grow											*
 ************************************************************************
 * @author eduardo														*
 ************************************************************************
 * Dependencias: prototype.js [1.7.1], plugin grow, message.js			*
 * Utilizacao:															*
 * 																		*
 * var msg = new GrowMessage;											*
 * msg.processMessage(data);											*
 * msg.processMessage(msg.warnMessage('Mensagem de aviso'));			*
 ************************************************************************/

var GrowlMessage = Backbone.View.extend(Message, {

	initialize: function($super) {
		$super.call();
	},
	
	/**
	 * Exibe uma unica mensagem.
	 * 
	 * @param msg Objeto de mensagem
	 * @param append false indica que a div de container para mensagens sera sobrescrita e true indica que sera adicionado 
	 * @returns {Message}
	 */
	singleMessage: function(msg) {
		this.countId++;
		var messageId = this.containerId + "_" + this.countId;
		
		/*if (msg.global) {
			var class_div = '';
			
			if (msg.severity == 'ERROR') {
				class_div = 'alert alert-error';
			} else if (msg.severity == 'WARN') {
				class_div = 'alert alert-warn';
			} else if (msg.severity == 'INFO') {
				class_div = 'alert alert-info';
			}
			
			if (append) {
				$('<div id="' + messageId + '" class="' + class_div + '" style="display:none"><button type="button" class="close" onclick="$caixa.message.close();" data-dismiss="alert">&times;</button>'+msg.summary+'</div>').appendTo('#'+this.containerId);
			} else {
				$('#'+this.containerId).html(
					'<div id="' + messageId + '" class="' + class_div + '" style="display:none"><button type="button" class="close" onclick="$caixa.message.close();" data-dismiss="alert">&times;</button>'+msg.summary+'</div>');
			}
			
			$('#'+messageId).fadeIn();
		} */
		alert(msg.summary);

		return this;
	}
});

