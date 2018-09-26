define([
	'text!servicos/risco/visao/pesquisaavancada.html',
	'servicos/risco/controle/PropriedadeRuralControle',
	'servicos/risco/modelo/PropriedadeRuralModelo',
	'servicos/risco/controle/ListaPesquisaAvancadaControle',
	'servicos/risco/modelo/PessoaModelo',
	'servicos/risco/controle/PessoaControle',
	'servicos/risco/controle/ListaPessoaConsultadaControle',
	'servicos/risco/modelo/ConsultaSICLIModelo',
], function(template,PropriedadeRuralControle,PropriedadeRuralModelo,ListaPesquisaAvancadaControle,PessoaModelo,PessoaControle,ListaPessoaConsultadaControle,ConsultaSICLIModelo) {
		var PesquisaAvancadaControle = Backbone.View.extend({
			initialize: function(options) {
				this.tiposPessoas = options.tiposPessoas;
				this.ultimasPessoasConsultadas = options.ultimasPessoasConsultadas;
				this.count = 1;
				this.consultasicli = new ConsultaSICLIModelo();
				
				_viewPesquisaAvancada = this;
			},
			events: {
				"keyup input": "localizarPessoas",
				"click #btnPesqAvancOk" : "localizarPessoas",
				"change #selTipoPessoa": "atualizaTipoPessoa",
				"click #btnCadPropriedade": "propriedadeRural",
				"click .retornaPessoaConsultada": "consultaCliente",
			},
			render: function() {
				apresentaMatricula = 0;
				if (this.model.filter(function (pessoa) { return pessoa.get("tipo").codigo === 23}).length > 0) {
					apresentaMatricula = 1;
				}
				
				this.$el.html(_.template(template,{
					'pessoasConsultadas': this.model,
					'tiposPessoas': this.tiposPessoas,
					'apresentaMatricula': apresentaMatricula
				}));
				
				this.model.each(function(pessoa){
					listapesquisaavancada = new ListaPesquisaAvancadaControle({apresentaMatricula: apresentaMatricula, model: pessoa});
					this.$('#tablePesqAvancada').append(listapesquisaavancada.render());
				}, this);
				
				this.ultimasPessoasConsultadas.each(function(pessoa, i){
					listaultimaspessoasconsultadas = new ListaPessoaConsultadaControle({model: pessoa, template: "pesq", view: _viewPesquisaAvancada});
					this.$('#tableUltimosConsultados').append(listaultimaspessoasconsultadas.render());
				}, this);

				$caixa.mask.loadMask(this);
				this.$('#pesquisaAvancada').modal('show');
				
				return this.$el;
			},
			reRender: function() {
				if (this.model.length > 1){
					this.$('#pesquisaAvancada').modal('hide');
					return this.render();
				} else if(this.model.length == 1){
            		pessoa = new PessoaModelo(JSON.parse(JSON.stringify(this.model.first())));
        			
        			pessoa.fetch({
        	            success: function(model, response) {
        	            	$('#pesquisaAvancada').modal('hide');
        	            	$caixa.util.limparDivsDashboard();
        	            	consultaPessoa = new PessoaControle({model: model});
        	            	$('#divDadosGerais').html(consultaPessoa.render());
        	            },
        	            error: function(model, response) {
        	            	$('#pesquisaAvancada').modal('hide');
        	            	$caixa.util.adicionarMensagemNegocialContainer(response.responseJSON);
        	            }
        	        });
				}else if(this.model.length == 0){
					/*
					 * Se a consulta foi realizada com CPF/CNPJ, verifico se o cliente existe no SICLI
					 */
					if (this.model.getNonFormmatedValue("cpfcnpj")  != null & !$caixa.permissoes.hasObjeto(202)){
						this.consultasicli.url = 'rest/risco/pessoas/atualizasicli/' + this.model.getNonFormmatedValue("cpfcnpj") + ',1';
						this.consultasicli.fetch({
			        		success: function(model, response){ 
			        			this.$('#pesquisaAvancada').modal('hide');
			        			$caixa.ajaxstatus.start();
			        			_viewPesquisaAvancada.timer = setInterval(_viewPesquisaAvancada.verificaTimer, 2000);
			        		},
			        		error: function(model, response) {
			 	            	$caixa.util.adicionarMensagemNegocialContainer(response.responseJSON);
			        		}
						});
					} else {
						alert('Cliente não encontrado, realize nova Consulta');
					}
				}
			},
			verificaTimer: function(){
				_viewPesquisaAvancada.consultasicli.url = 'rest/risco/pessoas/verificasicli/' + _viewPesquisaAvancada.model.getNonFormmatedValue("cpfcnpj");
				_viewPesquisaAvancada.consultasicli.fetch({
	        		success: function(model, response){  
	        			_viewPesquisaAvancada.count++;
	        			
	        			if(_viewPesquisaAvancada.count > 30 | _viewPesquisaAvancada.consultasicli.get("situacao") != 12){ 
	        				$caixa.ajaxstatus.stop();
	        				clearInterval(_viewPesquisaAvancada.timer);
	        				
	        				if (_viewPesquisaAvancada.count > 30){
	        					alert('Tempo de Consulta no Cadastro.Caixa Expirado.');
	        				} else if (_viewPesquisaAvancada.consultasicli.get("situacao") == 15) {        					
	        					_viewPesquisaAvancada.model.myfetch({
	        			            success: function(collection, response) {
	        			            	_viewPesquisaAvancada.reRender();
	        			            },
	        			            error: function(collection, response) {
	        			            	$caixa.util.adicionarMensagemNegocialContainer(response.responseJSON);
	        			            }
	        			        }, this);
	        				} else {
	        					alert(_viewPesquisaAvancada.consultasicli.get("mensagem"));
	        				}
	        				
	        				_viewPesquisaAvancada.count = 1;
	        			}
	        		},
	        		error: function(model, response) {
	        			clearInterval(_viewPesquisaAvancada.timer);
	 	            	$caixa.util.adicionarMensagemNegocialContainer(response.responseJSON);
	        		}
				});
			},
			localizarPessoas: function(e){
				/*
				 * Se o evento foi acionado por teclas, somente prosseguir quando for ENTER
				 */
				if (e.type == "keyup" & e.keyCode != 13){
					return
				}
				
				
				this.model.setFormmatedValue({
					paramconsulta: this.$('#inpParamPesq').val(),
					paramccirmat: this.$('#inpParamPesqRural').val(),
					pessoaid: this.$('#inpParamPessoaId').val()
				});

				this.model.myfetch({
		            success: function(collection, response) {
		            	_viewPesquisaAvancada.reRender();
		            },
		            error: function(collection, response) {
		            	options = {
		            		container: "errorsContainer",
		            		view: _viewPesquisaAvancada,
		            		close: true
				        };
		            	
		            	$caixa.util.adicionarMensagemNegocialContainer(response.responseJSON, options);
		            }
		        }, this);
			},
		    atualizaTipoPessoa: function(){
		    	tipopessoaselecionada = this.$('#selTipoPessoa').val();
		    	this.model.setFormmatedValue({tipopessoaid: tipopessoaselecionada});
		    	
		    	if(tipopessoaselecionada == 23){
		    		$('#exibeConsultaRural').show();
		    		$('#btnCadPropriedade').show();
		    	}else{
		    		$('#exibeConsultaRural').hide();
		    		$('#btnCadPropriedade').hide();
		    	}
		    },
		    propriedadeRural: function(){
		    	$('#pesquisaAvancada').modal('hide');
		    	var propriedaderuralmodelo = new PropriedadeRuralModelo();
		    	var propriedadeRural = new PropriedadeRuralControle({model: propriedaderuralmodelo, acao: "CADASTRAR"});
		    	$('#divPropriedadeRural').html(propriedadeRural.render().el);
		    	propriedadeRural.afterRender();
		    }
		});
		return PesquisaAvancadaControle;
	}
);