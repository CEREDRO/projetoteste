define([
	'text!servicos/risco/visao/itemquadro.html',
	'bootstrap',
	'ajaxStatus',
	'servicos/risco/modelo/ItemQuadroModelo',
	'servicos/risco/modelo/PermissaoModelo',
	'servicos/risco/controle/AjudaControle',
	'servicos/risco/modelo/DemonstrativoRelacionamentoModelo',
	'comum/MascaraController',
	'servicos/risco/modelo/ItemDemonstrativoModelo',
	'servicos/risco/colecao/ItemDemonstrativoColecao',
	'servicos/risco/modelo/GradacaoOcorrenciaModelo',
	'servicos/risco/colecao/GradacaoOcorrenciaColecao',
	'servicos/risco/modelo/EstruturaModelo',
	'servicos/risco/modelo/ContaModelo'
], function(template, Bootstrap, AjaxStatus,ItemQuadroModelo,PermissaoModelo,AjudaControle,DemonstrativoRelacionamentoModelo,MascaraController,ItemDemonstrativoModelo,ItemDemonstrativoColecao,GradacaoOcorrenciaModelo,GradacaoOcorrenciaColecao,EstruturaModelo,ContaModelo) {
	var ItemQuadroControle = Backbone.View.extend({
	
		initialize: function() {
			this.pessoa = null;
			this.pergunta = null;
			this.relacionamento = null;
			this.mascara = new MascaraController();
			this.model = new ItemQuadroModelo();
		},
		
		render: function() {
			this.$el.html(_.template(template,{'model': this.model}));
			return this;
		},
		
		events: {
			"keyup .input-item-quadro": "verificaCaracter",
			"blur .indica-sintese": "efetuaSoma",
			"click #btnOkItemQv": "valida",
			"click .icon-question-sign": "exibeAjuda"
		},
		
		carregaDados: function(){
			var urls = "";
			if(this.model.codigo == 0){
				urls = "rest/risco/itemquadro/novo/" + this.pessoa.get('codigo') + "," + this.pergunta;
			}else{
				urls = "rest/risco/itemquadro/" + this.model.codigo;
			}
			var self = this;
			reiniciaContadorSessao();
			this.model.fetch({
				url: urls,
				success: function(model, response) {
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
									novo = 1;
									velho = 1;
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
							contaModelo.gradacaoOcorrencia = conta.gradacaoOcorrencia;
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
					
					self.model.set('listaItemDemonstrativo',itemDemonstrativoColecao);
					self.render();
					self.mascara.loadMask();
					$(".data").each(function(){
					   if ($(this).val() == null || $(this).val() == ""){
						   $(this).val("01/01/1900");
					   }
					});
					
					model.get('listaItemDemonstrativo').each(function(data){
						if (data.get('estrutura').conta.gradacaoOcorrencia.tipoOcorrencia != 0){
							$('#' + data.get('estrutura').codigo).val(data.get('valor'));
						}
					});
					
					$('#itemQuadro').modal('show');
				},
				error: $caixa.trataErro
			});
			
		},
		verificaCaracter: function(e){
			if($(e.currentTarget).hasClass('moeda') == false && $(e.currentTarget).hasClass('percent') == false && $(e.currentTarget).hasClass('data') == false){
				$(e.currentTarget).val($(e.currentTarget).val().replace('.','').replace('.','').replace(',','').replace(',',''));
				if((isNaN(parseFloat($(e.currentTarget).val())) == true && isFinite($(e.currentTarget).val()) == false) || (isNaN(parseFloat($(e.currentTarget).val())) == false && isFinite($(e.currentTarget).val()) == false)) {
					$(e.currentTarget).val('');
				}
			}
			
			/*console.log(String.fromCharCode(e.keyCode));
			if(e.keyCode == 190 || e.keyCode == 188 || e.keyCode == 110 || e.keyCode == 194){
				if($(e.currentTarget).hasClass('moeda') == false && $(e.currentTarget).hasClass('percent') == false && $(e.currentTarget).hasClass('data') == false){
					$(e.currentTarget).val($(e.currentTarget).val().replace('.','').replace('.','').replace(',','').replace(',',''));
					console.log($(e.currentTarget).val());
				}
			}*/
		},
		efetuaSoma: function(e){
			this.somar($(e.target).attr('id'), $(e.target).data('sintese'));
		},
		somar: function(id, sintese){
			var value = 0;
			var self = this;
			var count = 0;
			$('.indica-sintese').each(function(element){
				if(($(this).data('sintese') == sintese) && ($(this).data('sinal') != 0)){
					value = value + (self.numerico($('#' + $(this).attr('id')).val()));
					count = count + 1;
				}
			});
			$('#' + sintese).val(this.monetario(value/100));			
			if($('#' + sintese).data('sintese') != null){
				this.somar(sintese,$('#' + sintese).data('sintese'));
			}
		},
		numerico: function(valor){
			valor = valor.replace('.','').replace('.','').replace('.','').replace('.','').replace('.','').replace('.','').replace('.','').replace('.','');
			valor = valor.replace(',','.');
			if(valor.indexOf(".") == -1){
				valor = valor + ".00";
			}
			var len = valor.length;
			var indice = valor.indexOf('.');
			len = (len - indice) - 1;
			if(len < 2){
				valor = valor + "0";
			}
			valor = valor.replace('.','');
			
			var tmp = '';
			var f = false;
		      for (var i = 0; i < valor.length ; i++){
		        if (valor[i] != '0' || f == true) {
		          tmp = tmp + valor[i];
		          f = true;
		        }
		      } 
		      if (tmp != '')
		        valor = tmp;
		      else
		        valor = '0';

			
			
			var value = 0;
			value = parseInt(valor);
			return value;
		},
		monetario: function(valor){
			var len = 0;
			var value = valor + "";
			var indice = value.indexOf(".");
			if(indice > -1){
				len = value.length;
				len = (len - indice) - 1;
				if(len < 2){
					value = value + "0";
				}
			}else{
				value = value + ".00";
			}
			if(value.length - value.indexOf(".") > 3){
				value = value.substring(0,(value.indexOf(".") + 3));
			}
			value = value.replace(".",",");
			
			if(value.length > 6){
				len = value.length - 6;    
				var part1 = "";
				var part2 = value.substring(value.length - 6,value.length);
				for(var i = len; i > 0; i--){
				   if(i > 3){
				       part1 = value.substring(i-3,i) + "." + part1;
				       i = i-2;
				   }else{
				       part1 = value.substring(0,i) + "." + part1;
				       i = 0;
				   }
				}
				value = part1 + part2;
			}
			return value;
		},
		valida: function(e){
			$('#' + e.currentTarget.id).attr( "disabled", "disabled");
			var self = this;
			this.permissao = new PermissaoModelo();
			
			this.permissao.url = 'rest/risco/itemquadro/verifica/' + this.model.codigo;
			reiniciaContadorSessao();
			this.permissao.fetch({
				success: function(permissao, response) {
					if (permissao.get('codigo') == 0){
						self.permissao.url = 'rest/risco/permissao/antiga/0,34';
						self.permissao.fetch({
							success: function(permissao, response) {
								if(permissao.get('codigo') == 1){
									if(self.relacionamento != 0 && self.relacionamento != null){
										this.demonstrativoRelacionamento = new DemonstrativoRelacionamentoModelo();
										this.demonstrativoRelacionamento.pessoa = self.pessoa;
										this.demonstrativoRelacionamento.set('codigoRelacionamento',self.relacionamento);
										this.demonstrativoRelacionamento.fetch({
											success: function(data, response) {
												self.model.codigo = data.get('codigoDemonstrativo');
												self.perciste(e);
											},error: $caixa.trataErro
										});
									}else{
										self.perciste(e);
									}
								}else{
									alert('Usuário não possui permissão de cadastrar itens do quadro de valores.');
								}
							},
							error: $caixa.trataErro
						});
					}else{
						if(self.relacionamento != 0 && self.relacionamento != null){
							this.demonstrativoRelacionamento = new DemonstrativoRelacionamentoModelo();
							this.demonstrativoRelacionamento.pessoa = self.pessoa;
							this.demonstrativoRelacionamento.set('codigoRelacionamento',self.relacionamento);
							this.demonstrativoRelacionamento.fetch({
								success: function(data, response) {
									self.model.codigo = data.get('codigoDemonstrativo');
									self.perciste(e);
								},error: $caixa.trataErro
							});
						}else{
							self.perciste(e);
						}
					}
				},
				error: $caixa.trataErro
			});
		},
		
		perciste: function(e){
			var self = this;
			var count = 0;
			//var valida = 0;
			var listaItemDemonstrativo = [];
			var codigo = this.model.codigo;
			
			$("#estruturaMontada input").each(function(){
				var demonstrativoAplicadoPessoa = {
						codigo: null,
						data: null,
						anoReferencia: null, 
						modeloDemonstrativo: null,
						codigoPessoa: null,
						tipo: null,
						usuarioHomologacao: null, 
						dataHomologacao: null,
						dataCadastramento: null,
						dataCancelamento: null,
						usuarioCancelamento: null,
						situacao: null
				};

				demonstrativoAplicadoPessoa.codigo = codigo;

				var estrutura = {
						codigo: null, 
						modeloDemonstrativo: null,
						conta: null,
						estruturaSintese: null,
						estruturaResultado: null,
						estruturaSequencia: null,
						estruturaSinal: null,
						estruturaIndResultado: null,
						dataAtualizacao: null,
						ordemApresentacao: null,
						indicaPai: null
				};

				var itemDemonstrativo = {
						demonstrativoAplicadoPessoa : demonstrativoAplicadoPessoa,
						estrutura: estrutura,
						valor: null	
				};
				
				estrutura.codigo = $(this).attr('id');
				itemDemonstrativo.estrutura = estrutura; 
				if ($('#' + $(this).attr('id')).hasClass('data')){
					itemDemonstrativo.valor = $('#' + $(this).attr('id')).val().replace('/','').replace('/','');
				}else if ($('#' + $(this).attr('id')).hasClass('moeda')){
					itemDemonstrativo.valor = $('#' + $(this).attr('id')).val().replace('.','').replace('.','').replace('.','').replace('.','').replace('.','').replace('.','').replace(',','.');
				}else if ($('#' + $(this).attr('id')).hasClass('percent')){
					itemDemonstrativo.valor = $('#' + $(this).attr('id')).val().replace(',','.');
				}else{
					itemDemonstrativo.valor = $('#' + $(this).attr('id')).val().replace('.','').replace('.','').replace('.','').replace('.','').replace('.','').replace('.','').replace(',','.');
				}
				listaItemDemonstrativo[count] = itemDemonstrativo;
				count += 1;
			});
			
			$("#estruturaMontada select").each(function(){
				if ($('#' + $(this).attr('id')).val() != 0){
					
					var demonstrativoAplicadoPessoa = {
							codigo: null,
							data: null,
							anoReferencia: null, 
							modeloDemonstrativo: null,
							codigoPessoa: null,
							tipo: null,
							usuarioHomologacao: null, 
							dataHomologacao: null,
							dataCadastramento: null,
							dataCancelamento: null,
							usuarioCancelamento: null,
							situacao: null
					};

					demonstrativoAplicadoPessoa.codigo = codigo;

					var estrutura = {
							codigo: null, 
							modeloDemonstrativo: null,
							conta: null,
							estruturaSintese: null,
							estruturaResultado: null,
							estruturaSequencia: null,
							estruturaSinal: null,
							estruturaIndResultado: null,
							dataAtualizacao: null,
							ordemApresentacao: null,
							indicaPai: null
					};

					var itemDemonstrativo = {
							demonstrativoAplicadoPessoa : demonstrativoAplicadoPessoa,
							estrutura: estrutura,
							valor: null	
					};
					
					estrutura.codigo = $(this).attr('id');
					itemDemonstrativo.estrutura = estrutura; 
					itemDemonstrativo.valor = $('#' + $(this).attr('id')).val();
					listaItemDemonstrativo[count] = itemDemonstrativo;
					count += 1;
				}
			});
			
			if (listaItemDemonstrativo.length > 0){
				this.model.set('listaItemDemonstrativo',listaItemDemonstrativo);
				this.model.set('anoReferencia',this.dateToStr(this.model.get('anoReferencia')));
				this.model.url = "rest/risco/itemquadro";
				this.model.save(undefined,{
		            success: function(model, response) {
		            	$('#itemQuadro').modal('hide');
		            	self.trigger('success');
		            },
		            error: $caixa.trataErro
				});
			}else{
				$('#itemQuadro').modal('hide');
			}
			
		},
		strToDate: function(value){
			if (value != null){
				return value.substring(8,10) + "/" + value.substring(5,7) + "/" + value.substring(0, 4);
			}else{
				return value;
			}
			
		},
		dateToStr: function(value){
			if (value != null && value != ""){
				return value.substring(6,10) + '-' + value.substring(3,5) + '-' + value.substring(0,2);
			}else{
				return "1900-01-01";
			}
			
		},
		exibeAjuda: function(e){
			this.ajuda = new AjudaControle();
			var modelo = {'descricao' : null};
			modelo.descricao = $(e.target).data('mensagem');
			this.ajuda.model = modelo;
			$('#divAjuda').html(this.ajuda.render().el);
			$('#ajuda').modal('show');
		}
	});
	return ItemQuadroControle;
});