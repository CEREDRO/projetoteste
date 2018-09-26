/*******************************************************************************
 * Classe Message *
 * *********************************************************************** Exibe
 * mensagens do tipo INFO, WARN e ERROR num container (div) * de mensagem. Por
 * default o container deve ter o id='messageContainer *
 * ***********************************************************************
 * 
 * @author eduardo *
 *         ***********************************************************************
 *         Dependencias: prototype.js 1.7.1 * Utilizacao: * * var msg = new
 *         Message; * msg.processMessage(data); *
 *         msg.processMessage(msg.warnMessage('Mensagem de aviso')); *
 ******************************************************************************/

var Message = Backbone.View.extend({

			/**
			 * Construtor.
			 * 
			 * @returns {$caixa.Message}
			 */
			initialize : function() {
				this.containerId = 'messageContainer';
				this.countId = 0;
			},

			/**
			 * Fecha mensagem.
			 */
			close : function() {
				$('#' + this.containerId).html('');

				return this;
			},

			/**
			 * Exibe mensagens (ou mensagem).
			 * 
			 * @param msg
			 *            Objeto de mensagem.
			 */
			processMessage : function(msg) {
				this.countId = 0;

				if (msg.messages) {
					$('#' + this.containerId).html('');
					for ( var i = 0; i < msg.messages.length; i++) {
						console.log("mensagem de erro: " + msg.messages[i]);
						if (msg.messages[i].origemErro != null) {
							this.multipleMessage(msg.messages[i]);
						} else {
							this.singleMessage(msg.messages[i], true);
						}
					}
				} else {
					this.singleMessage(msg, false);
				}

				return this;
			},

			/**
			 * Exibe uma unica mensagem.
			 * 
			 * @param msg
			 *            Objeto de mensagem
			 * @param append
			 *            false indica que a div de container para mensagens
			 *            sera sobrescrita e true indica que sera adicionado
			 * @returns {Message}
			 */
			singleMessage : function(msg, append) {
				this.countId++;
				var messageId = this.containerId + "_" + this.countId;

				if (msg.global) {
					var class_div = '';

					if (msg.severity == 'ERROR') {
						class_div = 'alert alert-error';
					} else if (msg.severity == 'WARN') {
						class_div = 'alert alert-warn';
					} else if (msg.severity == 'INFO') {
						class_div = 'alert alert-info';
					}

					if (append) {
						$(
								'<div id="'
										+ messageId
										+ '" class="'
										+ class_div
										+ '" style="display:none"><button type="button" class="close" onclick="$caixa.message.close();" data-dismiss="alert">&times;</button>'
										+ msg.summary + '</div>').appendTo(
								'#' + this.containerId);
					} else {
						$('#' + this.containerId)
								.html(
										'<div id="'
												+ messageId
												+ '" class="'
												+ class_div
												+ '" style="display:none"><button type="button" class="close" onclick="$caixa.message.close();" data-dismiss="alert">&times;</button>'
												+ msg.summary + '</div>');
					}

					$('#' + messageId).fadeIn();
				}

				return this;
			},

			multipleMessage : function(msg) {
				if (msg.messages) {
					for (i = 0; i < msg.messages.length; i++) {
						this.showMessage(msg.messages[i]);
					}
				} else {
					this.showMessage(msg);
				}
			},
			
			/**
			 * Exibe uma várias mensagens.
			 * 
			 * @param msg
			 *            Objeto de mensagemJSON
			 * @param append
			 *            false indica que a div de container para mensagens
			 *            sera sobrescrita e true indica que sera adicionado
			 * @returns {Message}
			 */
			showMessage : function(msg) {

					console.log('Entrei na função: ' + msg);
					console.log(msg);

					this.countId++;
					var messageId = this.containerId + "_" + this.countId;
					var class_div = '';

					if (msg.severidade == '0' || msg.severidade == '1'
							|| msg.severidade == '') {
						class_div = 'alert alert-error';

						$('#' + this.containerId)
								.append(
										'<div id="'
												+ messageId
												+ '" class="alert alert-block '
												+ class_div
												+ ' fade in" style="display:none">'
												+ '<button type="button" class="close pull-right" onclick="$("#'+messageId+').close();" data-dismiss="alert">&times;</button>'
												+ '<p>Ocorreu um erro na aplicação. Favor informar o detalhamento abaixo para a CEATI.</p>'
												+ '<h3 class="alert-heading">Sistema: '
												+ msg.sistema
												+ '</h3>'
												+ '<h3 class="alert-heading">Mensagens</h3><ul id="'+messageId+'_listaMsg"></ul>'
												+ '<h3 class="alert-heading">Erros</h3>'
												+ '<ul>'
												+ '<li>Origem do erro: '
												+ msg.origemErro
												+ '</li>'
												+ '<li>Paragráfo do erro: '
												+ msg.paragrafoErro
												+ '</li>'
												+ '<li>Categoria do erro: '
												+ msg.categoriaErro
												+ '</li>'
												+ '<li>Código do erro: '
												+ msg.codigoErro
												+ '</li>'
												+ '<li>Informações Adicionais: '
												+ msg.informacoesAdicionais
												+ '</li>' + '</ul>' + '</div>');

						$(msg.mensagemErro).each(function(key, val) {
							var mark = '<li>' + val + '</li>';
							$(mark).appendTo('#'+messageId+'_listaMsg');
						});

						$(msg.mensagemNegocial).each(function(key, val) {
							var markup = '<li>' + val + '</li>';
							$(markup).appendTo('#'+messageId+'_listaMsg');
						});
					} else if (msg.severidade == '2') {
						class_div = 'alert alert-warn';

						$('#' + this.containerId)
								.append(
										'<div id="'
												+ messageId
												+ '" class="'
												+ class_div
												+ '" style="display:none"><button type="button" class="close" onclick="$("#'+messageId+').close();" data-dismiss="alert">&times;</button>'
												+ msg.mensagemNegocial[0]
												+ '</div>');
					} else if (msg.severidade == '3') {
						class_div = 'alert alert-info';

						$('#' + this.containerId)
								.append(
										'<div id="'
												+ messageId
												+ '" class="'
												+ class_div
												+ '" style="display:none"><button type="button" class="close" onclick="$("#'+messageId+').close();" data-dismiss="alert">&times;</button>'
												+ msg.mensagemNegocial[0]
												+ '</div>');
					} else if (msg.severidade == '4') {
						class_div = 'alert alert-success';

						$('#' + this.containerId)
								.append(
										'<div id="'
												+ messageId
												+ '" class="'
												+ class_div
												+ '" style="display:none"><button type="button" class="close" onclick="$("#'+messageId+').close();" data-dismiss="alert">&times;</button>'
												+ msg.mensagemNegocial[0]
												+ '</div>');
					}
				
				$('#' + messageId).fadeIn();

				return this;
			},
			
			createMessage: function(error, tag){
				var msg = {
						sistema : "SIFEC",
						origemErro : tag,
						paragrafoErro : "String JSON mal formatada",
						categoriaErro : "",
						codigoErro : "",
						informacoesAdicionais : "",
						mensagemErro : [error],
						severidade : "0"
				}
				
				this.multipleMessage(msg);
			},

			/**
			 * Cria mensagem de aviso.
			 * 
			 * @param summary
			 *            Texto da mensagem
			 * @returns Objeto de mensagem
			 */
			warnMessage : function(summary) {
				var msg = {
					global : true,
					severity : "WARN",
					summary : summary
				};

				return msg;
			},

			/**
			 * Cria mensagem de erro.
			 * 
			 * @param summary
			 *            Texto da mensagem
			 * @returns Objeto de mensagem
			 */
			errorMessage : function(summary) {
				var ret = {
					global : true,
					summary : summary,
					severity : "ERROR"
				};

				return ret;
			},

			/**
			 * Cria mensagem de informacao.
			 * 
			 * @param summary
			 *            Texto da mensagem
			 * @returns Objeto de mensagem
			 */
			infoMessage : function(summary) {
				var ret = {
					global : true,
					summary : summary,
					severity : "INFO"
				};

				return ret;
			}
		});
