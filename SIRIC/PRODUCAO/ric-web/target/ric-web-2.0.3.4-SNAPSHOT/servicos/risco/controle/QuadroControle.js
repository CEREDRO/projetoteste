define([
	'text!servicos/risco/visao/quadro.html',
	'bootstrap',
	'ajaxStatus',
	'servicos/risco/modelo/QuadroModelo',
	'comum/MascaraController',
	'servicos/risco/modelo/PermissaoModelo',
	'servicos/risco/modelo/AjudaModelo',
	'servicos/risco/modelo/MensagemInformativaModelo'
], function(template, Bootstrap, AjaxStatus,QuadroModelo,MascaraController,PermissaoModelo,AjudaModelo,MensagemInformativaModelo) {
	var QuadroControle = Backbone.View.extend({
	
		initialize: function() {
			this.mascara = new MascaraController();
			this.pessoa = null;
			this.acao = null;
			this.inicio = null;
			this.fim = null;
			this.pergunta = 0;
			this.exibeDataInicio = 0;
			this.exibeDataFim = 0;
			this.model = new QuadroModelo();
			this.mensagem = new MensagemInformativaModelo();
		},
		
		render: function() {
			if (this.acao == "A"){
				template = "servicos/risco/visao/quadroaltera.html";
			}else{
				template = "servicos/risco/visao/quadro.html";
			}
			this.$el.html(_.template(this.carregaTemplate(template),{'model': this.model,'incio': this.inicio, 'fim' : this.fim}));
			return this;
		},
		
		events: {
			"click #btnOkQv": "perciste"
		},
		
		carregaDados: function(){
			if (this.acao == "I"){
				if (this.model.get('codigo') == null){
					this.model.set('codigo',0);
				}
				if (this.model.get('modeloDemonstrativo') == null){
					var modelo = {
						codigo: null,
						denominacao: null
					};
					this.model.set('modeloDemonstrativo',modelo);
				}
				if (this.model.get('tipo') == null){
					this.model.set('tipo',0);
				}
				if (this.model.get('anoReferencia') == null){
					this.model.set('anoReferencia',this.getDate());
				}
				if (this.model.get('data') == null){
					this.model.set('data',this.getDate());
				}
				if (this.model.get('dataCadastramento') == null){
					this.model.set('dataCadastramento',this.getDate());
				}
				this.render();
				this.mascara.loadMask();
				$('#quadro').modal('show');
			}else{
				var self = this;
				reiniciaContadorSessao();
				this.model.fetch({
					success: function(model, response) {
						model.set('anoReferencia',self.strToDate(model.get('anoReferencia')));
						model.set('data',self.strToDate(model.get('data')));
						self.model = model;
						var permissao = new PermissaoModelo();
						permissao.url = "rest/risco/permissao/antiga/0,30";
						permissao.fetch({
							success: function(permissao, response) {
									self.render();
									self.mascara.loadMask();
									if(permissao.get('codigo') == 1){
										$('#divAlteraSalvarComoQv').show();
									}
									$('#quadro').modal('show');
								},
								error: $caixa.trataErro
							});
					},
					error: $caixa.trataErro
				});
			}
		},
		
		perciste: function(e){
			$('#btnOkQv').attr('disabled','disabled');
			var self = this;
			var novo = "V";
			if (this.model.get('codigo') == null || this.model.get('codigo') == 0){
				novo = "N";
			}
			if ($('#optionsRadios2').is(':checked')){
				
				reiniciaContadorSessao();
				if(this.model.get('modeloDemonstrativo').codigo==645){
					this.mensagem.url = "rest/risco/quadro/consulta645/" + this.model.get('codigoPessoa');
					this.mensagem.fetch({
	        			success: function(mensagem, response) {
	        				if(mensagem.get('codigoMensagem')==1){
	        					alert(mensagem.get('titulo')+mensagem.get('mensagem'));
	        					$('#quadro').modal('hide');
	        					return;
	        				}
	        				else{
		        				if(confirm(mensagem.get('titulo')+mensagem.get('mensagem'))){
		        					self.copiaQuadro(self,novo);
		    					}else{
		    						$('#quadro').modal('hide');
		    						return;
		    					}
	        				}
	        			},
	        			error: $caixa.trataErro
	    			});
				}
				else{
					self.copiaQuadro(self,novo);
				}
			}else{
				reiniciaContadorSessao();
				if(this.model.get('modeloDemonstrativo').codigo==645){
					this.mensagem.url = "rest/risco/quadro/consulta645/" + this.model.get('codigoPessoa');
					this.mensagem.fetch({
	        			success: function(mensagem, response) {
	        				if(mensagem.get('codigoMensagem')==1){
	        					alert(mensagem.get('titulo')+mensagem.get('mensagem'));
	        					$('#quadro').modal('hide');
	        					return;
	        				}
	        				else{
		        				if(confirm(mensagem.get('titulo')+mensagem.get('mensagem'))){
		        					self.salvaQuadro(self,novo);
		    					}else{
		    						$('#quadro').modal('hide');
		    						return;
		    					}
	        				}
	        			},
	        			error: $caixa.trataErro
	    			});
				}
				else{
					self.salvaQuadro(self,novo);
				}
			}
		},
		remove: function(){
			var self = this;
			reiniciaContadorSessao();
			this.model.fetch({
				 success: function(model, response) {
					 self.model.url = "rest/risco/quadro/" + model.get('codigo');
					 self.model.save(undefined,{
						 success: function() {
							 self.trigger('success');
						 },
						 error:  $caixa.trataErro
					 });
		         },
		         error: $caixa.trataErro
			});
		},
		getDate: function(){
			var data = new Date();
			var dia = data.getDate() + "";
			if(dia.length == 1){
				dia = "0" + dia;
			}
			var mes = (data.getMonth() + 1) + "";
			if(mes.length == 1){
				mes = "0" + mes;
			}
			return dia + "/" + mes + "/" + data.getFullYear();
		},
		strToDate: function(value){
			if (value != null){
				return value.substring(8,10) + "/" + value.substring(5,7) + "/" + value.substring(0, 4);
			}else{
				return value;
			}
			
		},
		dateToStr: function(value){
			if (value == null || value == "" || value == undefined){
				value = this.getDate();
			}
			return value.substring(6,10) + '-' + value.substring(3,5) + '-' + value.substring(0,2);
		},
		carregaTemplate: function(path) {
			var template = null;
			
			$.ajax({url: path, async: false}).done(function(html){
				template = html;
			});
			
			return template;
		},
		salvaQuadro: function(self,novo){
			this.model.set('anoReferencia',this.dateToStr($('#dtReferencia').val()));
			this.model.set('data',this.dateToStr($('#dtInclusao').val()));
			this.model.url = 'rest/risco/quadro';
			this.model.save(undefined,{
	            success: function(model, response) {
	            	$('#quadro').modal('hide');
		            self.trigger('success','Q',model.get('codigo'),novo);	
	            },
	            error: function(model,response){
	            	var mensagemErro1 = JSON.parse(response.responseText).mensagemErro;
	            	var mensagemErro = mensagemErro1.toString();
	            	alert(mensagemErro.substring(mensagemErro.indexOf(':') + 1));
	            	$('#quadro').modal('hide');
	            }
			});
		},
		copiaQuadro: function(self,novo){
			var ajudaModelo = new AjudaModelo();
			ajudaModelo.url = "rest/risco/quadro/copia/" + this.model.get('codigo') + "," + this.pergunta;
			ajudaModelo.fetch({
    			success: function(ajuda, response) {
    					$('#quadro').modal('hide');
		            	self.trigger('success','Q',self.model.get('codigo'),novo);
    			},
    			error: function(model,response){
            	var mensagemErro1 = JSON.parse(response.responseText).mensagemErro;
            	var mensagemErro = mensagemErro1.toString();
            	alert(mensagemErro.substring(mensagemErro.indexOf(':') + 1));
            	$('#quadro').modal('hide');
            	}
			});
		}
	});
	return QuadroControle;
});