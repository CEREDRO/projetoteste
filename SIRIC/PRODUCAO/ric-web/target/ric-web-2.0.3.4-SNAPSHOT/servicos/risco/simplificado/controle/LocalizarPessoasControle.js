define([
	'text!servicos/risco/simplificado/visao/localizarpessoas.html',
	'bootstrap',
	'ajaxStatus',
	'servicos/risco/modelo/LocalizarPessoasModelo',
	'servicos/risco/modelo/PermissaoModelo',
	'servicos/risco/simplificado/controle/PessoaFisicaControle',
	'servicos/risco/simplificado/controle/PessoaJuridicaControle',
	'servicos/risco/simplificado/controle/ConsultaAvaliacaoControle',
	'servicos/risco/simplificado/controle/SolicitaAvaliacaoControle',
	'servicos/risco/simplificado/controle/StatusAvaliacaoControle',
	'servicos/risco/simplificado/controle/PesquisaAvancadaControle',
	'servicos/risco/modelo/AvaliarModelo',
	'servicos/risco/colecao/PessoaConsultadaColecao',
	'servicos/risco/simplificado/controle/PessoaConsultadaControle'
], function(template, Bootstrap, AjaxStatus,LocalizarPessoasModelo,PermissaoModelo,PessoaFisicaControle,PessoaJuridicaControle,ConsultaAvaliacaoControle,SolicitaAvaliacaoControle,StatusAvaliacaoControle,PesquisaAvancadaControle,AvaliarModelo,PessoaConsultadaColecao,PessoaConsultadaControle) {
	var LocalizarPessoasControle = Backbone.View.extend({
	
		initialize: function() {
			this.pessoa = null;
			this.cpfcnpj = null;
			this.model = new LocalizarPessoasModelo();
		},
		
		events: {
			"click #btnPesqAvanc": "exibePesquisaAvancada",
	        "click #btnLocalizar": "onClickPesquisa",
	        "keydown #nuCpfCnpj": "mascara"
	    },
	    
	    render: function() {
			this.$el.html(_.template(template,{'model' : this.model}));
			return this;
		},
	    
		onClickPesquisa: function(e){
			e.preventDefault();
			this.consultar();
		},
		
	    /*consultar: function() {
	    	$('#divAvaliar').html('');
	    	
	    	if ($('#nuCpfCnpj').val() == ""){
	    		return;
	    	}
	    	
	    	this.cpfcnpj = $('#nuCpfCnpj').val().replace('.','').replace('.','').replace('-','').replace('/','').trim();
	    	
	    	this.model.set('cpfCnpj',this.cpfcnpj);
	    	this.model.set('tipo',0);
	    	
	    	this.AjaxStatus = new AjaxStatus();
	    	
	    	var self = this;
	    	this.AjaxStatus.start();
	    	
	    	var permissao = new PermissaoModelo();
        	permissao.url = "rest/risco/permissao/antiga/0,3";
        	reiniciaContadorSessao();
			permissao.fetch({
				success: function(permissao, response) {
					if(permissao.get('codigo') == 1){
						self.model.fetch({
				            success: function(model, response) {
				            	var tipo = model.get('tipo');
				            	self.pessoa = model;
				            	permissao.url = "rest/risco/permissao/tipopessoa/" + tipo.codigo;
				    			permissao.fetch({
				    				success: function(permissao2, response) {
				    					if(permissao2.get('codigo') == 1){
				    						if (tipo.codigo == 1){
							            		self.pessoaFisica = new PessoaFisicaControle();
							            		self.pessoaFisica.model = model;
							            		self.listenTo(self.pessoaFisica, 'success', self.concluido);
							            		$('#divDadosGerais').html(self.pessoaFisica.render().el);
							            	}else{
							            		self.pessoaJuridica = new PessoaJuridicaControle();
							            		self.pessoaJuridica.model = model;
							            		self.listenTo(self.pessoaJuridica, 'success', self.concluido);
							            		$('#divDadosGerais').html(self.pessoaJuridica.render().el);
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
				            	var string = response.responseText;
				    			eval('var obj='+string);
				    			console.log(obj);
								alert('Cliente Inexistente, efetuar cadastrado via Cadastro.Caixa');
								$('#divDadosGerais').html('');
								$('#divConsultaAvaliacao').html('');
								$('#divSolicitaAvaliacao').html('');
				            	self.AjaxStatus.stop();
				            }
				        });
					}else{
						alert("O usuário não possui permissão para atualizar uma pessoa.");
						self.AjaxStatus.stop();
					}
				},
				error: $caixa.trataErro
			});
	    },*/
		consultar: function() {
	    	$('#divAvaliar').html('');
	    	
	    	if ($('#nuCpfCnpj').val() == ""){
	    		return;
	    	}
	    	
	    	this.cpfcnpj = $('#nuCpfCnpj').val().replace('.','').replace('.','').replace('-','').replace('/','').trim();
	    	
	    	this.model.set('cpfCnpj',this.cpfcnpj);
	    	this.model.set('tipo',0);
	    	
	    	this.AjaxStatus = new AjaxStatus();
	    	
	    	var self = this;
	    	this.AjaxStatus.start();
	    	
	    	var permissao = new PermissaoModelo();
        	permissao.url = "rest/risco/permissao/antiga/0,3";
        	reiniciaContadorSessao();
			permissao.fetch({
				success: function(permissao, response) {
					if(permissao.get('codigo') == 1){
						self.model.fetch({
				            success: function(model, response) {
				            	var permissao = new PermissaoModelo();
				            	if(model.get('qtPessoa') > 1){
				                	permissao.url = "rest/risco/permissao/antiga/0,3";
				        			permissao.fetch({
				        				success: function(permissao, response) {
				        					if(permissao.get('codigo') == 1){
				        						var pesquisaAvancada = new PesquisaAvancadaControle();
				        						$('#pesquisasAvancadas').html(pesquisaAvancada.render().el);
				        						self.AjaxStatus.stop();
				        						pesquisaAvancada.maisDeUm(0,self.cpfcnpj);
				        					}else{
				        						alert("O usuário não possui permissão para atualizar uma pessoa.");
				        					}
				        				},error: $caixa.trataErro
				        	    	});
				            	}else{
				            		window.coPessoa = model.get('codigo');
				            		var tipo = model.get('tipo');
					            	self.pessoa = model;
					            	permissao.url = "rest/risco/permissao/tipopessoa/" + tipo.codigo;
					    			permissao.fetch({
					    				success: function(permissao2, response) {
					    					if(permissao2.get('codigo') == 1){
					    						if (tipo.codigo == 1){
								            		self.pessoaFisica = new PessoaFisicaControle();
								            		self.pessoaFisica.model = model;
								            		self.listenTo(self.pessoaFisica, 'success', self.concluido);
								            		$('#divDadosGerais').html(self.pessoaFisica.render().el);
								            	}else{
								            		self.pessoaJuridica = new PessoaJuridicaControle();
								            		self.pessoaJuridica.model = model;
								            		self.listenTo(self.pessoaJuridica, 'success', self.concluido);
								            		$('#divDadosGerais').html(self.pessoaJuridica.render().el);
								            	}
					    					}else{
					    						alert('Você não possui acesso para a pessoa selecionada.');
					    						self.AjaxStatus.stop();
					    					}
					    				},
					    	            error: $caixa.trataErro
					            	});
				            	}
				            },
				            error: function(model, response) {
				            	var string = response.responseText;
				    			eval('var obj='+string);
				    			console.log(obj);
								alert('Cliente Inexistente, efetuar cadastrado via Cadastro.Caixa');
								$('#divDadosGerais').html('');
								$('#divConsultaAvaliacao').html('');
								$('#divSolicitaAvaliacao').html('');
				            	self.AjaxStatus.stop();
				            }
				        });
					}else{
						alert("O usuário não possui permissão para atualizar uma pessoa.");
						self.AjaxStatus.stop();
					}
				},
				error: $caixa.trataErro
			});
	        //return false;
	    },
	    mascara : function(e){
	    	if (e.keyCode == 13)
	    	{
	    		e.preventDefault();
	    		$('#divDadosGerais').html('');
	    		this.consultar();
	    	}
	    	else if (e.keyCode != 8)
	    	{
	    		var value = $(e.currentTarget).val();
	        	value = value.replace('.','').replace('.','').replace('-','').replace('/','');
	        	var len = parseInt(value.length);
	        	if (len <= 11){
	        		if (len == 3){
	        			value += ".";
	        		}else if (len > 3 && len < 6){
	        			value = value.substring(0,3) + "." + value.substring(3,value.length);
	        		}else if (len == 6){
	        			value = value.substring(0,3) + "." + value.substring(3,6) + ".";
	        		}else if (len > 6 && len < 9){
	        			value = value.substring(0,3) + "." + value.substring(3,6) + "." + value.substring(6,value.length);
	        		}else if (len == 9){
	        			value = value.substring(0,3) + "." + value.substring(3,6) + "." + value.substring(6,9) + "-";
	        		}else if (len > 9 && len < 12){
	        			value = value.substring(0,3) + "." + value.substring(3,6) + "." + value.substring(6,9) + "-" + value.substring(9,value.length);
	        		}
	        	}else if (len > 11){
	        		if (len > 11 && len < 13){
	        			value = value.substring(0,2) + "." + value.substring(2,5) + "." + value.substring(5,8) + "/" + value.substring(8,value.length);
	        		}else if (len >= 13){
	        			value = value.substring(0,2) + "." + value.substring(2,5) + "." + value.substring(5,8) + "/" + value.substring(8,12) + "-" + value.substring(12,14);
	        		}
	        	}
	        	$(e.currentTarget).val(value);
	        	$('#nuCpfCnpj').focus();
	    	}
	    },
	    localizaRlink: function(value){
	    	var self = this;
	    	this.ajuda = new AjudaModelo();
	    	this.ajuda.url = "rest/risco/pessoas/retornacpfCnpj/" + value;
	    	reiniciaContadorSessao();
	    	this.ajuda.fetch({
	            success: function(ajuda, response) {
	            	$('#nuCpfCnpj').val(ajuda.get('descricao'));
	            	self.consultar();
	            },error: $caixa.trataErro
	    	});
	    },
	    exibePesquisaAvancada: function(){
	    	var permissao = new PermissaoModelo();
        	permissao.url = "rest/risco/permissao/antiga/0,3";
        	reiniciaContadorSessao();
			permissao.fetch({
				success: function(permissao, response) {
					if(permissao.get('codigo') == 1){
						var pesquisaAvancada = new PesquisaAvancadaControle();
						var pessoaConsultada = new PessoaConsultadaControle();
						pesquisaAvancada.view = pessoaConsultada;
						$('#pesquisasAvancadas').html(pesquisaAvancada.render().el);
						$('#pesquisaAvancada').modal('show');
					}else{
						alert("O usuário não possui permissão para atualizar uma pessoa.");
					}
				},error: $caixa.trataErro
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
        	
        	this.recarregaConsultados();
	    },
	    recarregaConsultados: function(){
	    	var self = this;
	    	var pessoasConsultadas = new PessoaConsultadaColecao();
			pessoasConsultadas.fetch({
	            success: function(collection, response) {
	            	var pessoaConsultada = new PessoaConsultadaControle();
	            	pessoaConsultada.collection = collection;
	            	$('#pessoasConsultadas').html(pessoaConsultada.render().el);
	            	$('#pessoasConsultadasteste').collapse('hide');
	            	self.AjaxStatus.stop();
	            },
	            error: function(collection, response) {
	            	console.log(response.responseText);
	            }
	        });
	    }
	});
	return LocalizarPessoasControle;
});
