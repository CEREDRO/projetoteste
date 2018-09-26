define([
	'text!dashboard.html',
	'bootstrap',
	'ajaxStatus',
	'global',
	'verificaSessao',
], function(template, Bootstrap, AjaxStatus,global,VerificaSessao) {
	
		var SIRICUtilsControle = Backbone.View.extend({
	
			initialize: function() {
			},
			
			events:	{
			},	
			
			render: function() {
				return this;
			},
		
		    callVersao: function () {
		    },
		    
		    /**
		     * Limpa a apresentação de todas as div's que estão no dashboard.html. Limpa a tela.
		     */
		    limparDivsDashboard: function () {
		    	$('#nuCpfCnpj').val('');
		    	this.limparContainer('divMensagemNoticia');
				this.limparContainer('pessoasConsultadas');
				this.limparContainer('divMensagemInformativo');
				this.limparContainer('divDadosGerais');
				this.limparContainer('divGerenciadorLimites');
				this.limparContainer('divConsultaAvaliacao');
				this.limparContainer('divSolicitaAvaliacao');
				this.limparContainer('divConfirmacao');
				this.limparContainer('divAvaliar');
				this.limparContainer('divPropriedadeRural');
				this.limparContainer('divMensagemInformativo');
				this.limparContainer('AvaliacaoAutomatica');
				
		    },
		    
			/**
			 * Limpa um container, retirando sua apresentação
			 */
			limparContainer: function (id) {
	        	$('#'+id).html('');
			},
			
			/**
			 * Adiciona um container que deverá ser o único na tela. Realiza a limpeza da tela e a apresentação do conteudo HTML
			 */
			adicionarContainerStandAlone: function (id, elementoHtml) {
				this.limparDivsDashboard();
				this.adicionarContainer(id, elementoHtml);
			},
			
			/**
			 * Adiciona o conteudo de um container para exibição, não limpa os demais containers da tela
			 */
			adicionarContainer: function (id, elementoHtml) {
	        	$('#'+id).html(elementoHtml);
			},
			/*
			 *  - Adiciona as mensagens recebidas no container de mensagens.
			 *  - OPTIONS:
			 *  	- Container: DIV que as mensagens serão adicionadas.
			 *  	- View: View que possui a DIV do container.
			 *  	- Close: Adicionar o botão para retirar a mensagens da tela.
			 *  	- Full: Especifica se o container deve ocupar todo o espaço da linha.
			 */
			adicionarMensagemNegocialContainer: function(MensagemError, options) {
				if (!options){
					options = {
	            		container: "errorsContainer",
	            		view: window,
	            		close: true,
	            		full: true
		            };
				}
				
				//Definicao para apresentar as mensagens em container
				if (options.container){
					var msghtml = "";
					
					//Definicao para apresentar botao fechar 
					if (options.close){
						options.view.$('#' + options.container).html("<div id='errorsbody' class='row-fluid'><div class='span10' id='errors'></div><button type='button' class='close span2' data-dismiss='alert'>&times;</button></div>");
					} else {
						options.view.$('#' + options.container).html("<div id='errorsbody' class='row-fluid'><div class='span12' id='errors'></div></div>");
					}
					
					//Verifica se define o tamanho da div
					if (!options.full){
						options.view.$('#' + options.container + '> #errorsbody').addClass("span12");
					}
					
					
					//Verifica se foi erro, apresentar mensagem PADRAO e com a classe alert-error 
					if (MensagemError.mensagemErro.length > 0) {
						options.view.$('#' + options.container + '> #errorsbody').addClass("alert alert-error");
						msghtml = "<p>Ocorreu um erro interno no sistema.</p>";
						options.view.$('#' + options.container + '> #errorsbody > #errors').append(msghtml);
						console.log(MensagemError);
						
					//Verifica se foi mensagem negocial
					} else if (MensagemError.mensagemNegocial.length > 0) {
						
						//Verificar a class do container 
						switch (MensagemError.severidade){
							case 'SUCCESS':
								options.view.$('#' + options.container + '> #errorsbody').addClass("alert alert-success");
								break;
							case 'INFO':
								options.view.$('#' + options.container + '> #errorsbody').addClass("alert alert-info");
								break;
							case 'WARN':
								options.view.$('#' + options.container + '> #errorsbody').addClass("alert");
								break;
							case 'ERROR':
								options.view.$('#' + options.container + '> #errorsbody').addClass("alert alert-error");
						}
						
						//Adiciona as mensagens
						$.each(MensagemError.mensagemNegocial, function(i, msg) {
							msghtml = "<p>" + msg + "</p>";
							options.view.$('#' + options.container + '> #errorsbody > #errors').append(msghtml);
						});	
					}
				} //if options.container
			},
			/*
			 *  - Adiciona mensagem no container padrão de mensagens
			 *  - Para adicionar a mensagem em outro container, especificar no OPTIONS
			 *  - Severidade Padrão: ERROR
			 */
			adicionarMensagemPadrao: function(msg, severidade, options) {
				severidade = severidade ? severidade : "ERROR";
				
				MensagemError = {
					"mensagemNegocial":[msg],
					"mensagemErro":[],
					"severidade": severidade
				};
				
				this.adicionarMensagemNegocialContainer(MensagemError, options);
			},
			isNumber: function(evt) {
				var id = $(evt.target).attr('id');
				var value = $('#' + id).val();
				value = value.replace(/\D/g,"");
			    $('#' + id).val(value);			
			},
			isData: function (data) {
				  var expReg = /^((0[1-9]|[12]\d)\/(0[1-9]|1[0-2])|30\/(0[13-9]|1[0-2])|31\/(0[13578]|1[02]))\/(19|20)?\d{2}$/;
				  var aRet = true;
				  
				  if ((data) && (data.match(expReg)) && (data != '')) {
					var dia = data.substring(0,2);
					var mes = data.substring(3,5);
					var ano = data.substring(6,10);
					if (mes == 4 || mes == 6 || mes == 9 || mes == 11 && dia > 30) 
					  aRet = false;
					else 
					  if ((ano % 4) != 0 && mes == 2 && dia > 28) 
						aRet = false;
					  else
						if ((ano%4) == 0 && mes == 2 && dia > 29)
						  aRet = false;
				  }  else {
					  aRet = false;   
				  }
					
				  
				  return aRet;
			},
			isCPF: function (numero) {
				var i;

				if (numero.length != 11) {
					return false;
				}

				var tudoIgual = true;
				for (i = 0; i < 11; i++){
					if (numero.charAt(0)!=numero.charAt(i)) {
						tudoIgual = false;
					}
				}
				if (tudoIgual) {
					return false;
				}

				s = numero;
				c = s.substr(0,9);
				var dv = s.substr(9,2);
				var d1 = 0;

				for (i = 0; i < 9; i++){
					d1 += c.charAt(i)*(10-i);
				}

				if (d1 == 0){
					return false;
				}

				d1 = 11 - (d1 % 11);
				if (d1 > 9) d1 = 0;

				if (dv.charAt(0) != d1){
					return false;
				}

				d1 *= 2;
				for (i = 0; i < 9; i++){
					d1 += c.charAt(i)*(11-i);
				}

				d1 = 11 - (d1 % 11);
				if (d1 > 9) d1 = 0;

				if (dv.charAt(1) != d1){
					return false;
				}

				return true;
			},
			isCNPJ: function (numero) {
				var i;

				if (numero.length != 14) {
					return false;
				}

				s = numero;

				c = s.substr(0,12);
				var dv = s.substr(12,2);
				var d1 = 0;

				for (i = 0; i < 12; i++){
					d1 += c.charAt(11-i)*(2+(i % 8));
				}

				if (d1 == 0){
					return false;
				}
				d1 = 11 - (d1 % 11);

				if (d1 > 9) d1 = 0;

				if (dv.charAt(0) != d1){
					return false;
				}

				d1 *= 2;
				for (i = 0; i < 12; i++){
					d1 += c.charAt(11-i)*(2+((i+1) % 8));
				}

				d1 = 11 - (d1 % 11);
				if (d1 > 9) d1 = 0;

				if (dv.charAt(1) != d1){
					return false;
				}
				return true;
			},
			formataCPF: function formatCPF_CNPJ(value){
				if(value){
					value = value.substring(0,3) + '.' + value.substring(3,6) + "." + value.substring(6,9) + "-" + value.substring(9,11);
				}
				return value;
			},
			formataCNPJ: function formatCPF_CNPJ(value){
				if(value){
					value = value.substring(0,2) + '.' + value.substring(2,5) + '.' + value.substring(5,8) + '/' + value.substring(8,12) + '-' + value.substring(12,14);
				}
				return value;
			},
			formataCCIR: function formatCCIR(value){
				if(value){
					value = value.substring(0,3) + '.' + value.substring(3,6) + '.' + value.substring(6,9) + '.' + value.substring(9,12) + '-' + value.substring(12,13);
				}
				return value;
			},
			scrollTo: function (target, offset, speed, container) {

			    if (isNaN(target)) {

			        if (!(target instanceof jQuery))
			            target = $(target);

			        target = parseInt(target.offset().top);
			    }

			    container = container || "html, body";
			    if (!(container instanceof jQuery))
			        container = $(container);

			    speed = speed || 500;
			    offset = offset || 0;

			    container.animate({
			        scrollTop: target + offset
			    }, speed);
			}
		});
		
		return SIRICUtilsControle;
	}
);