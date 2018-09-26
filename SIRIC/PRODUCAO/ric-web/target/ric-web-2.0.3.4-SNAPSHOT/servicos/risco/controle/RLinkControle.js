define([
	'text!servicos/risco/visao/rlink.html',
	'bootstrap',
	'ajaxStatus',
	'servicos/risco/modelo/PessoaModelo',
	'servicos/risco/colecao/FormularioColecao',
	'servicos/risco/modelo/AjudaModelo',
	'servicos/risco/modelo/PessoaFisicaModelo',
	'servicos/risco/modelo/PessoaJuridicaModelo',
	'servicos/risco/modelo/PermissaoModelo',
	'servicos/risco/controle/OcorrenciaControle',
	'servicos/risco/controle/QuadroControle',
	'servicos/risco/controle/RelacionamentoControle',
	'servicos/risco/controle/AjudaControle',
	'servicos/risco/controle/ItemQuadroControle',
	'servicos/risco/modelo/ItemQuadroModelo',
	'servicos/risco/controle/PesquisaExternaControle',
	'servicos/risco/modelo/ItemDemonstrativoModelo',
	'servicos/risco/colecao/ItemDemonstrativoColecao',
	'servicos/risco/modelo/GradacaoOcorrenciaModelo',
	'servicos/risco/colecao/GradacaoOcorrenciaColecao',
	'servicos/risco/modelo/EstruturaModelo',
	'servicos/risco/modelo/ContaModelo',
	'servicos/risco/controle/FichaSocioPFControle',
	'servicos/risco/controle/FichaSocioPJControle',
	'servicos/risco/controle/FichaCadastroPessoaJuridicaControle',
	'servicos/risco/controle/FichaCadastroPessoaFisicaControle',
	'servicos/risco/colecao/PesquisaAvancadaColecao',
], function(template, Bootstrap, AjaxStatus,PessoaModelo,FormularioColecao,AjudaModelo,PessoaFisicaModelo,PessoaJuridicaModelo,PermissaoModelo,OcorrenciaControle,QuadroControle,RelacionamentoControle,AjudaControle,ItemQuadroControle,ItemQuadroModelo,PesquisaExternaControle,ItemDemonstrativoModelo,ItemDemonstrativoColecao,GradacaoOcorrenciaModelo,GradacaoOcorrenciaColecao,EstruturaModelo,ContaModelo,FichaSocioPFControle,FichaSocioPJControle,FichaCadastroPessoaJuridicaControle,FichaCadastroPessoaFisicaControle,PesquisaAvancadaColecao) {
	var RLinkControle = Backbone.View.extend({
	
		initialize: function() {
			this.pessoa = null;
			this.modelo = null;
			this.itemQvExibe = 0;
			this.itemQvTipo = null;
			this.itemQvValor = null;
			this.itemQvNovo = null;
			this.model = new PessoaModelo();
			this.collection = new FormularioColecao();
			this.verifica = null;
			this.codigoPessoa = 0;
			this.codigoRelacionado = 0;
			
			_viewRLink = this;
		},
		
		render: function() {
			this.$el.html(_.template(template,{'pessoa': this.pessoa, 'collection': this.collection, 'verifica': this.verifica}));
			return this;
		},
		
		events: {
			"click .btn-mini": "acao",
			"click .rlink": "carregarRLink",
			"click #btnCloseRlink": "closeRlink",
			"click #exibePesqExterna": "exibePesquisa",
			"click #exibeFichaCadastroPF": "exibeFichaCadastroPF",
            "click #exibeFichaCadastroPJ": "exibeFichaCadastroPJ",
		},
		
		carregaRlink: function(pessoa,model,relacionado){
			this.modelo = model;
			this.codigoPessoa = pessoa;
			this.codigoRelacionado = relacionado;
	    	this.consultar(relacionado);
		},
		consultar: function(codigo) {
			pesquisaavancada = new PesquisaAvancadaColecao();
			
			pesquisaavancada.setFormmatedValue({pessoaid: codigo});
			
			console.log(pesquisaavancada);
			
			pesquisaavancada.myfetch({
	            success: function(collection, response) {
	            	pessoa = new PessoaModelo(JSON.parse(JSON.stringify(collection.first())));
	            	
	            	pessoa.fetch({
	    	            success: function(model, response) {
	    	            	var tipo = model.get('tipo');
	    	            	if (tipo.codigo == 1){
	    	            		this.pessoaFisica = new PessoaFisicaModelo();
	    	            		this.pessoaFisica = model;
	    	            		_viewRLink.pessoa = this.pessoaFisica;
	    	            		_viewRLink.pessoa.set('cpfCnpj',self.pessoa.get('pessoaCpf'));
	    	            	}else if (tipo.codigo == 23){
	    	            		this.pessoaJuridica = new PessoaJuridicaModelo();
	    	            		this.pessoaJuridica = model;
	    	            		_viewRLink.pessoa = this.pessoaJuridica;
	    	            		_viewRLink.pessoa.set('cpfCnpj',self.pessoa.get('codigoPropriedade'));
	    	            	}else{
	    	            		this.pessoaJuridica = new PessoaJuridicaModelo();
	    	            		this.pessoaJuridica = model;
	    	            		_viewRLink.pessoa = this.pessoaJuridica;
	    	            		_viewRLink.pessoa.set('cpfCnpj',self.pessoa.get('pessoaCnpj'));
	    	            	}
	    	            	_viewRLink.montaRlink();
	    	            },
	    	            error: function(collection, response) {
	    	            	$caixa.util.adicionarMensagemNegocialContainer(response.responseJSON);
	    	            }         
	    	        });
	    
	            },
	            error: function(collection, response) {
	            	$caixa.util.adicionarMensagemNegocialContainer(response.responseJSON);
	            }
	        });
	    },
	    montaRlink: function(){
	    	var self = this;
			this.collection.pessoa = this.pessoa;
			this.collection.modeloAval = this.modelo;
			reiniciaContadorSessao();
			this.collection.fetch({
				success: function(collection, response) {
					collection.each(function(data){
	            		data.set('dataInicio',self.strToDate(data.get('dataInicio')));
	            		data.set('dataFim',self.strToDate(data.get('dataFim')));
	            	});
					var verifica = new AjudaModelo();
					verifica.url = 'rest/risco/solicitaavaliacao/verificaformulario/' + self.modelo;
					verifica.fetch({
						success: function(data, response) {
							self.verifica = data;
							self.collection = collection;
			            	$('#container').html(self.render().el);
						},
			            error: $caixa.trataErro
					});
	            	
	            },
	            error: $caixa.trataErro
			});
	    },
	    strToDate: function(date){
			if (date != null){
				date = date.substring(8,10) + "/" + date.substring(5,7) + "/" + date.substring(0,4);
			}else{
				date = "00/00/0000";
			}
			return date;
		},
		acao: function(e){
			var self = this;
			var tipo = $(e.target).data('tipo');
			var acao = $(e.target).data('acao');
			var inicio = $(e.target).data('inicio');
			var fim = $(e.target).data('fim');
			var valor = $(e.target).data('valor');
			var descricao = $(e.target).data('descricao');
			if (acao == "A"){
				var pergunta = $(e.target).data('pergunta');
				var codigoPergunta = $(e.target).data('codigo');
				this.ajuda(tipo,pergunta,codigoPergunta);
			}else{
				var permissao = new PermissaoModelo();
				if (tipo == "O"){
					var tipoOcorrencia = $(e.target).data('codigo');
					var dataOcorrencia = $(e.target).data('datacad');
					if (acao == "U"){				
						this.alteraOcorrencia(this.pessoa.get('codigo'),tipoOcorrencia,dataOcorrencia,inicio,fim);
					}else if (acao == "D"){
						this.excluiOcorrencia(this.pessoa.get('codigo'),tipoOcorrencia,dataOcorrencia);
					}else if (acao = "I"){
						permissao.url = "rest/risco/permissao/nova/1," + tipoOcorrencia + ",O,7";
						reiniciaContadorSessao();
						permissao.fetch({
							success: function(permissao, response) {
								if (permissao.get('codigo') == 0){
									alert('Usuário não possui permissão de acesso para incluir esta ocorrência');
								}else{
									self.insereOocorrencia(self.pessoa.get('codigo'),tipoOcorrencia,inicio,fim,descricao);
								}
							},
							error: $caixa.trataErro
						});
					}
				}else if (tipo == "V"){
					var modeloDemonstrativo = $(e.target).data('codigo');
					var codigoQuadro = $(e.target).data('quadro');
					if (acao == "U"){
						this.alteraQuadro(codigoQuadro);
					}else if (acao == "D"){
						this.excluiQuadro(codigoQuadro);
					}else if (acao == "I"){
						permissao.url = "rest/risco/permissao/nova/1," + modeloDemonstrativo + ",Q,7";
						reiniciaContadorSessao();
						permissao.fetch({
							success: function(permissao, response) {
								if (permissao.get('codigo') == 0){
									alert('Usuário não possui permissão de acesso para incluir este Quadro de Valor');
								}else{
									self.insereQuadro(self.pessoa.get('codigo'),modeloDemonstrativo,inicio,fim,descricao);
								}
							},
							error: $caixa.trataErro
						});
					}
				}else if (tipo == "R"){
					var codigoRelacionamento = $(e.target).data('relacionamento');
					var pergunta = $(e.target).data('codigo');
					if (acao == "U" || acao == "D"){
						permissao.url = "rest/risco/relacionamento/verifica/" + codigoRelacionamento;
						reiniciaContadorSessao();
						permissao.fetch({
							success: function(permissao, response) {
								if (permissao.get('codigo') == 0){
									if (acao == "U"){
										permissao.url = "rest/risco/permissao/antiga/0,11";
										permissao.fetch({
											success: function(permissao, response) {
												if(permissao.get('codigo') == 1){
													self.alteraRelacionamento(codigoRelacionamento,self.pessoa.get('codigo'),pergunta,inicio,fim,valor);
												}else{
													alert("Usuário não possui permissão de acesso para Atualizar este Relacionamento");
												}
											},
											error: $caixa.trataErro
										});
									}else if (acao == "D"){
										permissao.url = "rest/risco/permissao/antiga/0,12";
										permissao.fetch({
											success: function(permissao, response) {
												if(permissao.get('codigo') == 1){
													self.excluiRelacionamento(codigoRelacionamento,self.pessoa.get('codigo'));
												}else{
													alert("Usuário não possui permissão de acesso para Remover este Relacionamento");
												}
											},
											error: $caixa.trataErro
										});
									}
								}else{
									if (acao == "U"){
										self.alteraRelacionamento(codigoRelacionamento,self.pessoa.get('codigo'),pergunta,inicio,fim,valor);
									}else if (acao == "D"){
										self.excluiRelacionamento(codigoRelacionamento,self.pessoa.get('codigo'));
									}
								}
							},
							error: $caixa.trataErro
						});						
					}else{
						if (acao == "I"){
							var codigoNovo = $(e.target).data('numcodaddrel');
							permissao.url = "rest/risco/permissao/nova/1," + codigoNovo + ",R,7";
							reiniciaContadorSessao();
							permissao.fetch({
								success: function(permissao, response) {
									if (permissao.get('codigo') == 1){
										self.insereRelacionamento($(e.target).data('codigo'),self.pessoa.get('codigo'),inicio,fim,valor);
									}else{
										alert('Usuário não possui permissão de acesso ao para incluir este Relacionamento');
									}
									
								},
								error: $caixa.trataErro
							});
						}
					} 
				}else if (tipo == "S"){
					var itemQuadro = $(e.target).data('item');
					var pergunta = $(e.target).data('modelo');
					var relacionamento = $(e.target).data('relqv');
					this.exibeDetalhe(itemQuadro,this.pessoa,pergunta,relacionamento);
				}
			}
		},
		insereOocorrencia: function(codigoPessoa,codigoOcorrencia,inicio,fim,descricao){
			this.ocorrencia = new OcorrenciaControle();
			this.ocorrencia.acao = "I";
			this.ocorrencia.inicio = inicio;
			this.ocorrencia.fim = fim;
			this.ocorrencia.model.set('codigoPessoa',codigoPessoa);
			var tipoOcorrencia = {
		    		codigo: codigoOcorrencia,
		    		denominacao: descricao
		    	};
			this.ocorrencia.model.set('tipoOcorrencia',tipoOcorrencia);
	    	this.ocorrencia.model.set('tipoOcorrencia',tipoOcorrencia);
			var data = new Date().toJSON();
			data = data.replace('T',' ').replace('Z','');
			this.ocorrencia.model.set('dataCadastramento',data);
			this.listenTo(this.ocorrencia, 'success', this.concluido);
			$('#divOcorrencia').html(this.ocorrencia.render().el);
			this.ocorrencia.carregaDados();
		},
		alteraOcorrencia: function(codigoPessoa,codigoOcorrencia,dataCadastro,inicio,fim){
			this.ocorrencia = new OcorrenciaControle();
			this.ocorrencia.acao = "A";
			this.ocorrencia.inicio = inicio;
			this.ocorrencia.fim = fim;
			this.ocorrencia.model.set('codigoPessoa',codigoPessoa);
			var tipoOcorrencia = {
	    		codigo: codigoOcorrencia,
	    		denominacao: null
	    	};
			this.ocorrencia.model.set('tipoOcorrencia',tipoOcorrencia);
			this.ocorrencia.model.set('dataCadastramento',dataCadastro);
			this.listenTo(this.ocorrencia, 'success', this.concluido);
			$('#divOcorrencia').html(this.ocorrencia.render().el);
			this.ocorrencia.carregaDados();
		},
		excluiOcorrencia: function(codigoPessoa,codigoOcorrencia,dataCadastro){
			this.ocorrencia = new OcorrenciaControle();
			this.ocorrencia.model.set('codigoPessoa',codigoPessoa);
			var tipoOcorrencia = {
		    		codigo: codigoOcorrencia,
		    		denominacao: null
		    	};
				this.ocorrencia.model.set('tipoOcorrencia',tipoOcorrencia);
			this.ocorrencia.model.set('tipoOcorrencia',tipoOcorrencia);
			this.ocorrencia.model.set('dataCadastramento',dataCadastro);
			this.listenTo(this.ocorrencia, 'success', this.concluido);
			this.ocorrencia.remove();
		},
		insereQuadro: function(codigoPessoa,codigoModelo,inicio,fim,descricao){
			this.quadro = new QuadroControle();
			this.quadro.acao = "I";
			this.quadro.inicio = inicio;
			this.quadro.fim = fim;
			this.quadro.model.set('codigoPessoa',codigoPessoa);
			var modeloDemonstrativo = {
					codigo: codigoModelo,
					denominacao: descricao
		    	};
			this.quadro.model.set('modeloDemonstrativo',modeloDemonstrativo);
			var data = new Date().toJSON();
			data = data.replace('T',' ').replace('Z','');
			this.quadro.model.set('dataCadastramento',data);
			this.listenTo(this.quadro, 'success', this.concluido);
			$('#divQuadro').html(this.quadro.render().el);
			this.quadro.carregaDados();
		},
		alteraQuadro: function(codigo){
			this.quadro = new QuadroControle();
			this.quadro.acao = "A";
			this.quadro.model.set('codigo',codigo);
			var modeloDemonstrativo = {
				codigo: 0,
				denominacao: null
		    };
			this.quadro.model.set('modeloDemonstrativo',modeloDemonstrativo);
			this.listenTo(this.quadro, 'success', this.concluido);
			$('#divQuadro').html(this.quadro.render().el);
			this.quadro.carregaDados();
		},
		excluiQuadro: function(codigo){
			this.quadro = new QuadroControle();
			this.quadro.acao = "E";
			this.quadro.model.set('codigo',codigo);
			this.listenTo(this.quadro, 'success', this.concluido);
			this.quadro.remove();
		},
		insereRelacionamento: function(pergunta,codigoPessoa,inicio,fim,valor){
			this.relacionamento = new RelacionamentoControle();
			this.relacionamento.acao = "I";
			this.relacionamento.pergunta = pergunta;
			this.relacionamento.inicio = inicio;
			this.relacionamento.fim = fim;
			this.relacionamento.valor = valor;
			this.relacionamento.model.set('codigoPessoa',codigoPessoa);
			this.listenTo(this.relacionamento, 'success', this.concluido);
			$('#divRelacionamento').html(this.relacionamento.render().el);
			this.relacionamento.carregaDados();
		},
		alteraRelacionamento: function(codigoRelacionamento,codigoPessoa,pergunta,inicio,fim,valor){
			this.relacionamento = new RelacionamentoControle();
			this.relacionamento.acao = "A";
			this.relacionamento.pergunta = pergunta;
			this.relacionamento.inicio = inicio;
			this.relacionamento.fim = fim;
			this.relacionamento.valor = valor;
			this.relacionamento.model.set('codigo',codigoRelacionamento);
			this.relacionamento.model.set('codigoPessoa',codigoPessoa);
			this.listenTo(this.relacionamento, 'success', this.concluido);
			$('#divRelacionamento').html(this.relacionamento.render().el);
			this.relacionamento.carregaDados();
		},
		excluiRelacionamento: function(codigoRelacionamento,codigoPessoa){
			this.relacionamento = new RelacionamentoControle();
			this.relacionamento.model.set('codigo',codigoRelacionamento);
			this.relacionamento.model.set('codigoPessoa',codigoPessoa);
			this.listenTo(this.relacionamento, 'success', this.concluido);
			this.relacionamento.remove();
		},
		ajuda: function(tipo,pergunta,codigoPergunta){
			this.ajudas = new AjudaControle();
			this.ajudas.tipo = tipo;
			this.ajudas.pergunta = pergunta;
			this.ajudas.codigo = codigoPergunta;
			$('#divAjuda').html(this.ajudas.render().el);
			this.ajudas.carregaAjuda();
		},
		
		exibeDetalhe: function(value,pessoa,pergunta,relacionamento){
			var self = this;
			var permissao = new PermissaoModelo();
			permissao.url = "rest/risco/permissao/antiga/0,77";
			reiniciaContadorSessao();
			permissao.fetch({
				success: function(permissao, response) {
					if (permissao.get('codigo') == 1){
						self.itemQuadro = new ItemQuadroControle();
						self.itemQuadro.model.codigo = value;
						self.itemQuadro.pessoa = pessoa;
						self.itemQuadro.pergunta = pergunta;
						self.itemQuadro.relacionamento = relacionamento;
						self.listenTo(self.itemQuadro, 'success', self.concluido);
						$('#divItemQuadro').html(self.itemQuadro.render().el);
						self.itemQuadro.carregaDados();
					}else{
						alert('Usuário não possui permissão de acesso ao quadro de valor');
					}
				},
	            error: $caixa.trataErro
			});
		},
		concluido: function(tipo,valor,novo){
			if(tipo == "Q" || tipo == "R"){
				this.itemQvTipo = tipo;
				this.itemQvValor = valor;
				this.itemQvNovo = novo;
				this.itemQvExibe = 1;
			}
			this.stopListening();
			this.remontaRlink();
		},
		exibeItemQuadroRelQv: function(){
			var tipo = this.itemQvTipo;
			var valor = this.itemQvValor;
			var novo = this.itemQvNovo;
			if (novo == "N"){
				var self = this;
				this.itemQuadroModelo = new ItemQuadroModelo();
				this.itemQuadroModelo.url = 'rest/risco/itemquadro/novorelqv/' + this.pessoa.get('codigo') + ',' + tipo + ',' + valor;
				reiniciaContadorSessao();
				this.itemQuadroModelo.fetch({
					success: function(model, response) {
						self.itemQvExibe = 0;
						$('#quadro').modal('hide');
						if (model.get('listaItemDemonstrativo').length > 0){
							self.itemQuadro = new ItemQuadroControle();
							if (model.get('anoReferencia') != null){
								model.set('anoReferencia',self.strToDate(model.get('anoReferencia')));
							}
							
							var novo = 0;
							var velho = 1;
							var itemDemonstrativoColecao = new ItemDemonstrativoColecao();
							for (var i = 0; i < model.get('listaItemDemonstrativo').length; i++){
								var itemDemonstrativoModelo = new ItemDemonstrativoModelo();
								itemDemonstrativoModelo = model.get('listaItemDemonstrativo')[i];
								
								if (model.get('listaItemDemonstrativo')[i].estrutura.conta.gradacaoOcorrencia.tipoOcorrencia != null && model.get('listaItemDemonstrativo')[i].estrutura.conta.gradacaoOcorrencia.tipoOcorrencia != 0){
									var gradacaoOcorrenciaColecao = new GradacaoOcorrenciaColecao();
									for (var b = i; b < model.get('listaItemDemonstrativo').length; b++){
										novo = model.get('listaItemDemonstrativo')[b].estrutura.conta.codigo;
										if (novo == velho || velho == 1){
											var gradacaoOcorrenciaModelo = new GradacaoOcorrenciaModelo();
											gradacaoOcorrenciaModelo = model.get('listaItemDemonstrativo')[b].estrutura.conta.gradacaoOcorrencia;
											gradacaoOcorrenciaColecao.add(gradacaoOcorrenciaModelo);
										}else{
											break;
										}
										velho = novo;
									}
									i = b -1;
									
									var contaModelo = new ContaModelo();
									var conta = itemDemonstrativoModelo.estrutura.conta;
									
									contaModelo.codigo = conta.codigo;
									contaModelo.denominacao = conta.denominacao;
									contaModelo.unidade = conta.unidade;
									contaModelo.dataAtualizacao = conta.dataAtualizacao;
									contaModelo.gradacaoOcorrencia = null;
									contaModelo.listaGradacaoOcorrencia = gradacaoOcorrenciaColecao;
									contaModelo.mensagem = conta.mensagem;
									contaModelo.visivel = conta.visivel;
									
									var estruturaModelo = new EstruturaModelo();
									var estrutura = itemDemonstrativoModelo.estrutura;
									estruturaModelo.codigo = estrutura.codigo;
									estruturaModelo.modeloDemonstrativo = estrutura.modeloDemonstrativo;
									estruturaModelo.estruturaSintese = estrutura.estruturaSintese;
									estruturaModelo.estruturaResultado = estrutura.estruturaResultado;
									estruturaModelo.estruturaSequencia = estrutura.estruturaSequencia;
									estruturaModelo.estruturaSinal = estrutura.estruturaSinal;
									estruturaModelo.estruturaIndResultado = estrutura.estruturaIndResultado;
									estruturaModelo.dataAtualizacao = estrutura.dataAtualizacao;
									estruturaModelo.ordemApresentacao = estrutura.ordemApresentacao;
									estruturaModelo.indicaPai = estrutura.indicaPai;
									estruturaModelo.conta = contaModelo;
									
									itemDemonstrativoModelo.estrutura = estruturaModelo;
								}
								itemDemonstrativoColecao.add(itemDemonstrativoModelo);
							}
							
							model.set('listaItemDemonstrativo',itemDemonstrativoColecao);
							
							self.itemQuadro.model = model;
							if (tipo == 'Q'){
								self.itemQuadro.model.codigo = valor;
							}else{
								self.itemQuadro.model.codigo = 0;
								self.itemQuadro.relacionamento = valor;
								self.itemQuadro.pessoa = self.pessoa;
							}
							$('#divItemQuadro').html(self.itemQuadro.render().el);
							self.listenTo(self.itemQuadro, 'success', self.concluido);
							self.itemQuadro.mascara.loadMask();
							$('#itemQuadro').modal('show');
						}
					},error: $caixa.trataErro
				});
			}
		},
		carregarRLink: function(e){
			reiniciaContadorSessao();
			window.open(window.location.href + "?pessoa=" + _viewRLink.pessoa.get("codigo") + "&modelo=" + $(e.target).data('pergunta') + "&relacionado=" +  $(e.target).data('codigo'));
		},
		remontaRlink: function(){
	    	var self = this;
			this.collection.pessoa = this.pessoa;
			this.collection.modeloAval = this.modelo;
			reiniciaContadorSessao();
			this.collection.fetch({
				success: function(collection, response) {
					collection.each(function(data){
	            		data.set('dataInicio',self.strToDate(data.get('dataInicio')));
	            		data.set('dataFim',self.strToDate(data.get('dataFim')));
	            	});
	            	self.collection = collection;
	            	if(self.itemQvExibe == 1){
	            		self.exibeItemQuadroRelQv();
	            	}
	            	self.render();
	            },
	            error: $caixa.trataErro
			});
	    },
	    closeRlink: function(){
	    	window.close();
	    },
	    exibePesquisa:function(){
	    	this.pesquisaExterna = new PesquisaExternaControle();
			this.pesquisaExterna.pessoa = this.pessoa;
			$('#divPesquisaExterna').html(this.pesquisaExterna.render().el);
			this.pesquisaExterna.carregaPesquisaExterna();
	    },
	    verificaModulo3: function(){
	    	this.verificaExibeFichaSocio(1);
	    },
	    verificaModulo4: function(){
	    	this.verificaExibeFichaSocio(2);
	    },
	    
	    verificaExibeFichaSocio: function(parametro){
	    	var self = this;
	    	/*var verificaFicha = new AjudaModelo();
	    	verificaFicha.url = 'rest/risco/pessoas/verificafichasocio/' + this.codigoPessoa + "," + this.codigoRelacionado;
	    	verificaFicha.fetch({
				success: function(data, response) {
					if(data.get('descricao') == "OK"){*/
						if(parametro == 1){
							self.exibeModulo3();
				    	}else{
				    		self.exibeModulo4();
				    	}
					/*}else{
						alert(data.get('descricao'));
					}
				},
				 error: $caixa.trataErro
	    	});	 */   	
	    },
	    

		exibeFichaCadastroPJ: function(){
			this.fichaCadastroPessoaJuridica = new FichaCadastroPessoaJuridicaControle();
			this.fichaCadastroPessoaJuridica.codigo = this.model.get('codigo');
			this.listenTo(this.fichaCadastroPessoaJuridica, 'success', this.exibeFichaPJ);
			this.fichaCadastroPessoaJuridica.efetuaCarga();
		},
		exibeFichaPJ: function(conteudo){
			var LeftPosition = (screen.width) ? (screen.width-800)/2 : 0;
			var TopPosition = 50;
			var settings = 'height = 600 , width = 800, titlebar = no , location = no , directories = no , scrollbars=yes , top=' + TopPosition + ',left=' + LeftPosition + ',resizable';
			var myWindow = window.open("","",settings);
			myWindow.document.write('');
			myWindow.document.write("<!DOCTYPE html><html lang=\"pt-br\"><head><meta http-equiv=\"X-UA-Compatible\" content=\"IE=10; IE=9; IE=8; IE=7; IE=EDGE\" /><meta charset=\"utf-8\"><title>SIRIC - Sistema de Mensura&ccedil;&atilde;o de Risco de Cr&eacute;dito</title><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"><meta name=\"description\" content=\"\"><meta name=\"author\" content=\"\"><link rel=\"shortcut icon\" href=\"layout/img/Smiley16x16.ico\"/><link href=\"layout/css/bootstrap.css\" rel=\"stylesheet\"><link href=\"layout/css/bootstrap-responsive.css\" rel=\"stylesheet\"><link href=\"layout/css/bootstrap-datetimepicker.min.css\" rel=\"stylesheet\"><style type=\"text/css\">label{font-size:12px;}</style></head><body style=\"padding-top: 50px;padding-bottom: 50px;padding-left: 50px;padding-right: 50px;\">"  + this.fichaCadastroPessoaJuridica.render().el.innerHTML +  "</body></html>");
        	myWindow.focus();
        },
		exibeFichaCadastroPF: function(){
			this.fichaCadastroPessoaFisica = new FichaCadastroPessoaFisicaControle();
			this.fichaCadastroPessoaFisica.codigo = this.model.get('codigo');
			this.listenTo(this.fichaCadastroPessoaFisica, 'success', this.exibeFichaPF);
			this.fichaCadastroPessoaFisica.efetuaCarga();
		},
		exibeFichaPF: function(conteudo){
			var LeftPosition = (screen.width) ? (screen.width-800)/2 : 0;
			var TopPosition = 50;
			var settings = 'height = 600 , width = 800, titlebar = no , location = no , directories = no , scrollbars=yes , top=' + TopPosition + ',left=' + LeftPosition + ',resizable';
			var myWindow = window.open("","",settings);
			myWindow.document.write('');
			myWindow.document.write("<!DOCTYPE html><html lang=\"pt-br\"><head><meta http-equiv=\"X-UA-Compatible\" content=\"IE=10; IE=9; IE=8; IE=7; IE=EDGE\" /><meta charset=\"utf-8\"><title>SIRIC - Sistema de Mensura&ccedil;&atilde;o de Risco de Cr&eacute;dito</title><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"><meta name=\"description\" content=\"\"><meta name=\"author\" content=\"\"><link rel=\"shortcut icon\" href=\"layout/img/Smiley16x16.ico\"/><link href=\"layout/css/bootstrap.css\" rel=\"stylesheet\"><link href=\"layout/css/bootstrap-responsive.css\" rel=\"stylesheet\"><link href=\"layout/css/bootstrap-datetimepicker.min.css\" rel=\"stylesheet\"><style type=\"text/css\">label{font-size:12px;}</style></head><body style=\"padding-top: 50px;padding-bottom: 50px;padding-left: 50px;padding-right: 50px;\">"  + this.fichaCadastroPessoaFisica.render().el.innerHTML +  "</body></html>");
        	myWindow.focus();
		}
	});
	return RLinkControle;
});