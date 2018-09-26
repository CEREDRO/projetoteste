define([
	'text!menu.html',
	'servicos/risco/controle/PesquisaAvancadaControle',
	'servicos/risco/colecao/MensagemInformativaColecao',
	'servicos/risco/controle/ConsultaAvaliacaoAutomaticaControle',
	'servicos/risco/modelo/ConsultaAvaliacaoAutomaticaModelo',
	'servicos/risco/controle/MensagemNoticiaControle',
	'servicos/risco/colecao/TipoPessoaColecao',
	'servicos/risco/colecao/PesquisaAvancadaColecao',
], function(template, PesquisaAvancadaControle,MensagemInformativaColecao,ConsultaAvaliacaoAutomaticaControle, ConsultaAvaliacaoAutomaticaModelo,MensagemNoticiaControle,TipoPessoaColecao,PesquisaAvancadaColecao) {
	var MenuControle = Backbone.View.extend({
	
		initialize: function(options) {
			this.pessoasConsultadas = options.pessoasConsultadas;
			_viewMenu = this;
		},
		
		events: {
	        "click #carregarNoticias": "carregarNoticias",
	        "click #consultaAvaliacaoAutomatica": "consultaAvaliacaoAutomatica",
			"click #btnPesqAvanc": "efetuaPesquisa",
	        "click #btnLocalizar": "efetuaPesquisa",
	        "keyup #nuCpfCnpj": "efetuaPesquisa"
	    },
	    
	    render: function() {
			this.$el.html(_.template(template));
			
			$caixa.mask.loadMask(this);
			return this;
		},
		/**
		 * Realiza a consulta das mensagens informativos
		 */
		carregarNoticias: function(e) {
	    	var colecaonoticia = new MensagemInformativaColecao();
	    	colecaonoticia.url = 'rest/risco/mensageminformativa/1,2';
	    	colecaonoticia.fetch({
	            success: function(data, response) {
			    	var mensagemNoticia = new MensagemNoticiaControle();
			    	mensagemNoticia.collection = data;
			    	$('#divMensagemNoticia').html(mensagemNoticia.render());
	            },
	            error: function(collection, response) {
	            	console.log(response.responseText);
	            }
	        });
		},
		/**
		 * Realiza a consulta das últimas pessoas que acessaram o sistema
		 */
		consultaAvaliacaoAutomatica: function(e) {
			var consultaavaliacaoautomaticamodelo = new ConsultaAvaliacaoAutomaticaModelo();
			
			consultaavaliacaoautomaticamodelo.fetch({
				success: function(model, response) {
					$caixa.util.adicionarContainerStandAlone('AvaliacaoAutomatica', new ConsultaAvaliacaoAutomaticaControle({model: consultaavaliacaoautomaticamodelo}).render().el);
					$caixa.mascara.loadMask();
				},
				error: function(collection, response) {
	            	console.log(response.responseText);
	            }
        	}, this);
		},
		
		/**
		 * ação para exibir a tela de consulta avancada
		 */
		efetuaPesquisa: function(e) {  
			e.preventDefault();
			
			/*
			 * Se o evento foi acionado por teclas, somente prosseguir quando for ENTER
			 */
			if (e.type == "keyup" & e.keyCode != 13){
				return
			}
			
	    	if ($caixa.permissoes.hasObjeto(3)){
	    		/*
				 * Recupero a lista de tipos de pessoas
				 */
				tiposPessoas = new TipoPessoaColecao();
				tiposPessoas.fetch({
		            success: function(listaTiposPessoas, response) {
		            	
		            	/*
		            	 * Verifico se foi solicitada a pesquisa direta ou abertura da tela de pesquisa avançada
		            	 */
		            	pesquisaavancada = new PesquisaAvancadaColecao();
		            	
		            	if (e.currentTarget.id == "btnLocalizar" | e.currentTarget.id == "nuCpfCnpj") {
		            		/*
		            		 * Valido o CPF/CNPJ
		            		 */
		            		value = _viewMenu.$('#nuCpfCnpj').val().replace(/[^0-9]/g,'').trim();
		            		
		            		if (!$caixa.util.isCPF(value) & !$caixa.util.isCNPJ(value)){
								alert("Favor preencher o campo com CPF ou CNPJ válido.");
								e.preventDefault();
								return false;
							}
		            		
		            		pesquisaavancada.setFormmatedValue({paramconsulta: _viewMenu.$('#nuCpfCnpj').val()});
		       
		            		pesquisaavancada.myfetch({
		    		            success: function(collection, response) {
		    		            	pesquisaAvancada = new PesquisaAvancadaControle({
		    		            		model: pesquisaavancada,
		    		            		tiposPessoas: listaTiposPessoas, 
		    		            		ultimasPessoasConsultadas: _viewMenu.pessoasConsultadas
		    		            	});
		    		            	$caixa.util.adicionarContainer('pesquisasAvancadas', pesquisaAvancada.reRender());
		    		    
		    		            },
		    		            error: function(collection, response) {
		    		            	$caixa.util.adicionarMensagemNegocialContainer(response.responseJSON);
		    		            }
		    		        });
		            	} else {
		            		pesquisaAvancada = new PesquisaAvancadaControle({
    		            		tiposPessoas: listaTiposPessoas, 
    		            		ultimasPessoasConsultadas: _viewMenu.pessoasConsultadas,
    		            		model: pesquisaavancada
    		            	});
		            		
		            		$caixa.util.adicionarContainer('pesquisasAvancadas', pesquisaAvancada.render());
		            	}
		            },
		            error: function(collection, response) {
		            	$caixa.util.adicionarMensagemNegocialContainer(response.responseJSON);
		            }
		        }, this);
	    	} else {
	            $caixa.util.adicionarMensagemPadrao("O usuário não possui permissão para atualizar uma pessoa.");
	    	}
	    },
	});
	return MenuControle;
});