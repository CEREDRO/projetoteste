define([
	'text!servicos/risco/simplificado/visao/pesquisaavancada.html',
	'bootstrap',
	'ajaxStatus',
	'servicos/risco/modelo/PesquisaAvancadaModelo',
	'servicos/risco/colecao/PesquisaAvancadaColecao',
	'servicos/risco/colecao/TipoPessoaColecao',
	'servicos/risco/controle/TipoPessoaControle',
	'servicos/risco/modelo/LocalizarPessoasModelo',
	'servicos/risco/simplificado/controle/PessoaFisicaControle',
	'servicos/risco/simplificado/controle/PessoaJuridicaControle',
	'servicos/risco/simplificado/controle/ConsultaAvaliacaoControle',
	'servicos/risco/simplificado/controle/SolicitaAvaliacaoControle',
	'servicos/risco/simplificado/controle/StatusAvaliacaoControle',
	'servicos/risco/modelo/AvaliarModelo',
	'servicos/risco/modelo/PermissaoModelo',
	'servicos/risco/colecao/PessoaConsultadaColecao'
], function(template, Bootstrap, AjaxStatus,PesquisaAvancadaModelo,PesquisaAvancadaColecao,TipoPessoaColecao,TipoPessoaControle,LocalizarPessoasModelo,PessoaFisicaControle,PessoaJuridicaControle,ConsultaAvaliacaoControle,SolicitaAvaliacaoControle,StatusAvaliacaoControle,AvaliarModelo,PermissaoModelo,PessoaConsultadaColecao,PessoaConsultadaControle) {
		var PesquisaAvancadaControle = Backbone.View.extend({
	
			tagName: 'div',
			
			initialize: function() {
				this.AjaxStatus = new AjaxStatus();
				this.pessoa = null;
				this.model = new PesquisaAvancadaModelo();
				this.collection = new PesquisaAvancadaColecao();
				this.view = null;
				this.verifica = 0;
			},
			
			render: function() {
				this.$el.html(_.template(template,{'collection': this.collection,'model' : this.model}));
				this.montarTipoPessoa();
				return this;
			},
			events: {
				"keyup #inpParamPesq": "localizaAutomatico",
				"click #btnPesqAvancOk" : "localizarPessoas",
				"click tr": "retornaPessoa"
			},
			montarTipoPessoa: function(){
				this.tipoPessoaColecao = new TipoPessoaColecao();
				this.tipoPessoaColecao.parametro = 0;
				reiniciaContadorSessao();
				this.tipoPessoaColecao.fetch({
		            success: function(collection, response) {
		            	this.tipoPessoa = new TipoPessoaControle();
		            	this.tipoPessoa.collection = collection;
		            	$('#selTipoPessoa').html(this.tipoPessoa.render().el);
		            },
		            error: function(collection, response) {
		            	console.log(response.responseText);
		            }
		        });
			},
			localizarPessoas: function(){
				$('#btnPesqAvancOk').attr('disabled','disabled');
				var self = this;
				this.collection.tipopessoaid = $("#seltipopessoa2").val();
				this.collection.cpfCnpj = $('#inpParamPesq').val().replace('.','').replace('.','').replace('-','').replace('/','').trim();;
				reiniciaContadorSessao();
				this.collection.fetch({
		            success: function(collection, response) {
		            	$('#pesquisaAvancada').modal('hide');
		            	if (collection.length != 1){
							self.collection = collection;
		            		self.render();
		            		$('#pesquisaAvancada').modal('show');
						}else{
							collection.each(function(data){
								self.AjaxStatus = new AjaxStatus();
						    	self.AjaxStatus.start();
								self.retornaUnico(data.get('codigo'),1);
							});
						}
		            },
		            error: function(collection, response) {
		            	console.log(response.responseText);
		            }
		        });
			},
			retornaPessoa: function(e){
				$('#' + e.currentTarget.id).attr('disabled','disabled');
				$('#divAvaliar').html('');
				this.AjaxStatus = new AjaxStatus();
		    	this.AjaxStatus.start();
				var id = e.currentTarget.id;
				id = id.substring(13,id.lenght);
				this.retornaUnico(id,1);
				
			},
			localizaAutomatico: function(e){
				var self = this;
				if (e.keyCode == 13){
		    		self.localizarPessoas();
				}
			},
			retornaUnico: function(cpfCnpj,tipo){
				var self = this;
				this.localizarPessoas = new LocalizarPessoasModelo();
				this.localizarPessoas.set('cpfCnpj',cpfCnpj);
		    	this.localizarPessoas.set('tipo',tipo);
		    	reiniciaContadorSessao();
		    	this.localizarPessoas.fetch({
		            success: function(model, response) {
		            	window.coPessoa = model.get('codigo');
		            	var tipo = model.get('tipo');
		            	self.pessoa = model;
		            	var permissao = new PermissaoModelo();
		            	permissao.url = "rest/risco/permissao/tipopessoa/" + tipo.codigo;
		    			permissao.fetch({
		    				success: function(permissao2, response) {
		    					if(permissao2.get('codigo') == 1){
		    						if (tipo.codigo == 1){
		    							self.pessoaFisica = new PessoaFisicaControle();
		    							self.pessoaFisica.model = model;
		    							self.listenTo(self.pessoaFisica, 'success', self.concluido);
		    		            		$('#divDadosGerais').html(self.pessoaFisica.render().el);
		    		            		$('#pesquisaAvancada').modal('hide');
		    		            	}else{
		    		            		self.pessoaJuridica = new PessoaJuridicaControle();
		    		            		self.pessoaJuridica.model = model;
		    		            		self.listenTo(self.pessoaJuridica, 'success', self.concluido);
		    		            		$('#divDadosGerais').html(self.pessoaJuridica.render().el);
		    		            		$('#pesquisaAvancada').modal('hide');
		    		            	}
		    					}else{
		    						alert('Você não possui acesso para a pessoa selecionada.');
		    						self.AjaxStatus.stop();
		    					}
		    				},
		    	            error: $caixa.trataErro
		            	});
		            },
		            error: function(model, response) {
		            	console.log(response.responseText);
		            	self.AjaxStatus.stop();
		            }
		        });
			},
		    concluido: function(){
		    	this.consultaAvaliacao = new ConsultaAvaliacaoControle();
	        	this.consultaAvaliacao.pessoa = this.pessoa;
	        	$('#divConsultaAvaliacao').html(this.consultaAvaliacao.render().el);
	        	this.consultaAvaliacao.carregaAvalicao();
	        	
	        	this.solicitaAvaliacao = new SolicitaAvaliacaoControle();
	        	this.solicitaAvaliacao.pessoa = this.pessoa;
	        	$('#divSolicitaAvaliacao').html(this.solicitaAvaliacao.render().el);
	        	this.solicitaAvaliacao.exibeAvaliar(null);
	        	$('#pessoasConsultadasteste').attr({class: "collapse", style: "heigth: 0;"});
	        	
	        	this.recarregaConsultados();
		    },
		    maisDeUm: function(tipopessoaid,cpfCnpj){
		    	$('#btnPesqAvancOk').attr('disabled','disabled');
				var self = this;
				this.collection.tipopessoaid = tipopessoaid;
				this.collection.cpfCnpj = cpfCnpj.replace('.','').replace('.','').replace('-','').replace('/','').trim();;
				reiniciaContadorSessao();
				this.collection.fetch({
		            success: function(collection, response) {
		            	if (collection.length != 1){
							self.collection = collection;
		            		self.render();
		            		$('#pesquisaAvancada').modal('show');
						}else{
							collection.each(function(data){
								self.AjaxStatus = new AjaxStatus();
						    	self.AjaxStatus.start();
								self.retornaUnico(data.get('codigo'),1);
							});
						}
		            },
		            error: function(collection, response) {
		            	console.log(response.responseText);
		            }
		        });
		    },
		    recarregaConsultados: function(){
		    	var self = this;
		    	var pessoasConsultadas = new PessoaConsultadaColecao();
				pessoasConsultadas.fetch({
		            success: function(collection, response) {
		            	if(self.view != null){
		            		self.view.collection = collection;
		            		if(self.verifica == 1){
		            			self.view.render();
							}else{
								$('#pessoasConsultadas').html(self.view.render().el);
							}
		            		$('#pessoasConsultadasteste').collapse('hide');
			            	self.AjaxStatus.stop();
		            	}
		            },
		            error: function(collection, response) {
		            	console.log(response.responseText);
		            }
		        });
		    }
		    
		});
		return PesquisaAvancadaControle;
	}
);
