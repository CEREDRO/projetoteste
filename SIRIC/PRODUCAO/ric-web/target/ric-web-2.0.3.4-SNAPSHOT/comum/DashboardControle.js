define([
	'text!dashboard.html',
	'bootstrap',
	'ajaxStatus',
	'global',
	'verificaSessao',
	'servicos/risco/controle/PesquisaAvancadaControle',
	'servicos/risco/controle/RLinkControle',
	'servicos/risco/colecao/PessoaConsultadaColecao',
	'servicos/risco/controle/PessoaConsultadaControle',
	'servicos/risco/modelo/UsuarioModelo',
	'servicos/risco/controle/MensagemInformativoControle',
	'servicos/risco/colecao/MensagemInformativaColecao',
	'servicos/risco/controle/MenuControle',
	'servicos/risco/controle/MensagemNoticiaControle',
	'servicos/risco/controle/SIRICUtilsControle',
	'servicos/risco/modelo/PerfilModelo',
	'comum/MascaraController',
], function(template, Bootstrap, AjaxStatus,global,VerificaSessao,PesquisaAvancadaControle,RLinkControle,PessoaConsultadaColecao,PessoaConsultadaControle,UsuarioModelo,MensagemInformativoControle,MensagemInformativaColecao,MenuControle,MensagemNoticiaControle,SIRICUtilsControle, PerfilModelo, MascaraController) {
		var DashboardControle = Backbone.View.extend({
	
			el: $('#container'),
			
			initialize: function() {
				/*
				 * Instância da API de utilidade do sistema
				 */
				$caixa.util = new SIRICUtilsControle();
				
				
				/*
				 * Recupero as permissões do usuário
				 */
				perfil = new PerfilModelo();
				perfil.fetch({
		            success: function(model, response) {
		            	$caixa.permissoes = model;
		            },
		            error: function(model, response){            	
		            	$caixa.util.adicionarMensagemNegocialContainer(response.responseJSON);
		            }
		        });
				
				/*
				 * Instância da API de mascaras
				 */
				$caixa.mask = new MascaraController();
				$caixa.ajaxstatus = new AjaxStatus();
			},
			
			events:	{
				"click #btn_versao" : "callVersao",
			},	
			
			render: function() {
				this.AjaxStatus = new AjaxStatus();
				try {
					this.lerUsuario();
					var url = window.location.href;
					url = url.replace('#dashboard','');
					var vars = url.split("&");
					var parm1 = vars[0].split("=");
					
					if (parm1.length > 1){
						var parm2 = vars[1].split("=");
						var parm3 = vars[2].split("=");
						this.rLink = new RLinkControle();
						this.rLink.carregaRlink(parm1[1],parm2[1],parm3[1]);
					}else{
						this.AjaxStatus.start();
						
						this.verificaSessao = new VerificaSessao();
						this.verificaSessao.inicializaContador();
						
						// Using Underscore we can compile our template with data
						var data = {};
						var compiledTemplate = _.template(template, data);
						this.$el.html(compiledTemplate);
								
						ultimasPessoasConsultadas = new PessoaConsultadaColecao();
						ultimasPessoasConsultadas.fetch({
				            success: function(collection, response) {
				            	listaUltimasPessoasConsultadas = new PessoaConsultadaControle({model: collection});
				            	$('#pessoasConsultadas').html(listaUltimasPessoasConsultadas.render());
				            },
				            error: function(collection, response) {
				            	$caixa.util.adicionarMensagemNegocialContainer(response.responseJSON);
				            }
				        });
						
						this.opcoesMenu = new MenuControle({pessoasConsultadas: ultimasPessoasConsultadas});
						$('#opcoesMenu').html(this.opcoesMenu.render().el);
					}
					
				} catch (e) {
					alert(e.message);
				} finally {
					this.AjaxStatus.stop();
				}
			},
		    callVersao: function () {
		    	console.log("headerControle --> callVersao");
		    	var versao = new SolicitaVersaoModel();
		    	$('#container').html(new SolicitaVersaoView({model : versao}).el);
		    },
		    lerUsuario: function(){
		    	var self = this;
		    	var usuario = new UsuarioModelo();
		    	usuario.fetch({
		            success: function(model, response) {
		            	$('#usuario').html(model.get('nome'));
		            	$('#matricula').html(model.get('lotacao'));
		            	self.exibeMensagem();
		            },
		            error: function(collection, response) {
		            	console.log(response.responseText);
		            }
		        });
		    },
		    exibeMensagem: function(){
		    	var colecao = new MensagemInformativaColecao();
		    	colecao.fetch({
		            success: function(data, response) {
		            	if (data.length > 0) {
					    	var mensagemInformativo = new MensagemInformativoControle();
					    	mensagemInformativo.collection = data;
					    	$('#divMensagemInformativo').html(mensagemInformativo.render());
					    	mensagemInformativo.afterRender();
		            	}
		            },
		            error: function(collection, response) {
		            	console.log(response.responseText);
		            }
		        });
		    	
		    	var colecaonoticia = new MensagemInformativaColecao();
		    	colecaonoticia.url = 'rest/risco/mensageminformativa/1,2';
		    	colecaonoticia.fetch({
		            success: function(data, response) {
		            	if (data.length > 0) {
					    	var mensagemNoticia = new MensagemNoticiaControle();
					    	mensagemNoticia.collection = data;
					    	$('#divMensagemNoticia').html(mensagemNoticia.render());
		            	}
		            },
		            error: function(collection, response) {
		            	console.log(response.responseText);
		            }
		        });
		    }
		});
		return DashboardControle;
	}
);