define([
	'text!servicos/risco/visao/avaliar.html',
	'bootstrap',
	'ajaxStatus',
	'servicos/risco/modelo/AvaliarModelo',
	'servicos/risco/modelo/RelatorioPesquisaModelo',
	'servicos/risco/controle/ValidacaoControle',
	'servicos/risco/controle/PesquisaExternaControle',
	'servicos/risco/controle/ConsultaAvaliacaoControle',
	'servicos/risco/modelo/PessoaModelo',
	'servicos/risco/colecao/GerenciadorLimiteColecao',
	'servicos/risco/controle/GerenciadorLimiteControle',
	'servicos/risco/modelo/PermissaoModelo',
	'servicos/risco/controle/SIRICUtilsControle'
], function(template, Bootstrap, AjaxStatus,AvaliarModelo,RelatorioPesquisaModelo,ValidacaoControle,PesquisaExternaControle,ConsultaAvaliacaoControle,PessoaModelo,GerenciadorLimiteColecao,GerenciadorLimiteControle,PermissaoModelo,SIRICUtilsControle) {
	var AvaliarControle = Backbone.View.extend({
	
		initialize: function() {
			this.exibir = 0;
			this.pessoa = null;
			this.modelo = null;
			this.model = new AvaliarModelo();
			this.util = new SIRICUtilsControle();
		},
		
		render: function() {
			this.$el.html(_.template(template,{'pessoa': this.pessoa}));
			return this;
		},
		
		events: {
			"click #btnAvaliar": "avaliar",
			"click #solErroValidacao": "exibeErroValidacao",
			"click #solRelPesquisa": "exibeRelatiorioPesquisa",
			"click #exibePesqExterna": "exibePesquisaExterna"
		},
		
		carregaAvaliacaoControle: function(){
			this.render();
			var pessoa = this.pessoa.get('codigo');

			if (pessoa == '56621'){
				$('#btnAvaliar').hide();
				return;
			}

		},
		
		avaliar: function(){
			var self = this;
			var permissao = new PermissaoModelo();
            permissao.url = "rest/risco/permissao/antiga/0,203";
            reiniciaContadorSessao();
            permissao.fetch({
            	success: function(permissao, response) {
            		$('#btnAvaliar').attr('disabled','disabled');
            		$('#divBtnAvaliar').hide();
        			$('#formulario').hide();
            		if (permissao.get('codigo') != 1){
            			$("#limites").remove();
            			$("#exibeHintProcesso div.span3").each(function(){
            				$("#" + $(this).attr('id')).removeClass("span3");
            				$("#" + $(this).attr('id')).addClass("span4");
            			});            			
                   	}
            		$('#exibeHintProcesso').show();
            		self.model.url = "rest/risco/controleavaliacao/" + self.pessoa.get('codigo') + "," + self.modelo;
        			reiniciaContadorSessao();
        			self.model.fetch({
        				success: function(model, response) {
        					self.exibeProgress('progressPesquisa');
        					self.verificaStatus(model.get('codigo'));
        					self.count = 0;
        				},
        	            error: $caixa.trataErro
        			});
                },
                error: $caixa.trataErro
            });
		},
		exibePesquisaExterna: function(){
			this.pesquisaExterna = new PesquisaExternaControle();
			this.pesquisaExterna.pessoa = this.pessoa;
			$('#divPesquisaExterna').html(this.pesquisaExterna.render().el);
			this.pesquisaExterna.carregaPesquisaExterna();
		},
		exibeRelatiorioPesquisa: function(){
			reiniciaContadorSessao();
			var self = this;
			var relatorioPesquisa = new RelatorioPesquisaModelo();
			relatorioPesquisa.set('codigoPessoa',this.pessoa.get('codigo'));
			relatorioPesquisa.save(undefined,{
	            success: function(model, response) {
	            	var LeftPosition = (screen.width) ? (screen.width-800)/2 : 0;
	    			var TopPosition = 50;
	    			var settings = 'height = 600 , width = 800, titlebar = no , location = no , directories = no , scrollbars=yes , top=' + TopPosition + ',left=' + LeftPosition + ',resizable';
	    			var myWindow = window.open("","",settings);
	            	myWindow.document.write(model.get("descricao"));
	            	myWindow.focus();
	            },
	            error: function(model, response){
	            	var options = {
	            		container: "errorsContainer",
	            		view: this,
	            		close: true,
	            		full: true
	            	};
	            	
	            	self.util.adicionarMensagemNegocialContainer(response.responseJSON, options);
	            }
			});
		},
		exibeErroValidacao: function(){
			this.validacao = new ValidacaoControle();
			this.validacao.pessoa = this.pessoa.get('codigo');
			$('#exibeValidacao').html(this.validacao.render().el);
			this.validacao.carregaValidacao();
			$('#formulario').show();
		},
		exibeAvaliacaoConcluida: function(){
			if(window.coPessoa == this.model.get('codigoPessoa')){
				
				this.GerenciadorLimiteColecao = new GerenciadorLimiteColecao();
	        	this.GerenciadorLimiteColecao.pessoa = this.pessoa;
	        	this.GerenciadorLimiteColecao.fetch({
	        		success: function(colecao, response){
	        			colecao.each(function(gerenciadorlimite){
	        				var gerenciadorlimitecontrole = new GerenciadorLimiteControle({model: gerenciadorlimite});
	        				$('#divGerenciadorLimites').html(gerenciadorlimitecontrole.render().el);
	        			});
	        		},
	        		error: $caixa.trataErro
	        		
	        	});
				
				this.consultaAvaliacao = new ConsultaAvaliacaoControle();
				var pessoa = new PessoaModelo();
				pessoa.set('codigo',this.model.get('codigoPessoa'));
				this.consultaAvaliacao.pessoa = pessoa;
	        	$('#divConsultaAvaliacao').html(this.consultaAvaliacao.render().el);
	        	this.consultaAvaliacao.carregaAvalicao(1);
	        	$('#formulario').show();
			}
		},
		exibeAvaliacaoProcesso: function(){
			if (this.exibir == 0){
				this.exibir = 1;
				this.consultaAvaliacao = new ConsultaAvaliacaoControle();
				var pessoa = new PessoaModelo();
				pessoa.set('codigo',this.model.get('codigoPessoa'));
				this.consultaAvaliacao.pessoa = pessoa;
	        	$('#divConsultaAvaliacao').html(this.consultaAvaliacao.render().el);
	        	this.consultaAvaliacao.carregaAvalicao(1);
			}
		},
		verificaStatus: function(codigo){
			if(this.pessoa.get('codigo') == window.coPessoa){
				var self = this;
				setTimeout(function(){
					if(self.count < 300){
						self.verifica(codigo);
					}
					self.count = self.count + 1;
			    }, 1000);
			}
		},
		verifica: function(codigo){
			var self = this;
			this.model.url = "rest/risco/controleavaliacao/status/" + codigo;
			reiniciaContadorSessao();
			this.model.fetch({
				success: function(model, response) {
					var value = model.get('situacao');
					if (value == 1 || value == 2){
						self.porcessando("hintPesquisa");
						self.progress('progressPesquisa','66');
						self.verificaStatus(model.get('codigo'));
					}else if(value == 22 || value == 3){
						self.erroProcessamento("hintPesquisa");
						self.progress('progressPesquisa','100');
					}else if(value == 4 || value == 5){
						self.processado("hintPesquisa");
						self.exibeProgress('progressPesquisa');
						self.progress('progressPesquisa','100');
						self.porcessando("hintValidacao");
						self.exibeProgress('progressValidacao');
						self.progress('progressValidacao','66');
						self.verificaStatus(model.get('codigo'));
					}else if(value == 6){
						self.exibeProgress('progressPesquisa');
						self.progress('progressPesquisa','100');
						self.exibeProgress('progressValidacao');
						self.erroProcessamento("hintValidacao");
						self.progress('progressValidacao','100');
	            		$('#btnAvaliar').removeAttr('disabled');
	            		$('#divBtnAvaliar').show();
						self.exibeErroValidacao();
					}else if(value == 33){
						self.exibeProgress('progressPesquisa');
						self.progress('progressPesquisa','100');
						self.processado("hintPesquisa");
						self.exibeProgress('progressValidacao');
						self.progress('progressValidacao','100');
						self.processado("hintValidacao");
						self.exibeProgress('progressAvaliacao');
						self.progress('progressAvaliacao','100');
						self.processado("hintAvaliacao");
						self.exibeProgress('progressLimites');
						self.progress('progressLimites','66');
						self.porcessando("hintLimites");
						self.verificaStatus(model.get('codigo'));
					}else if(value == 7 || value == 8 || value == 26){
						self.exibeProgress('progressPesquisa');
						self.progress('progressPesquisa','100');
						self.processado("hintPesquisa");
						self.exibeProgress('progressValidacao');
						self.progress('progressValidacao','100');
						self.processado("hintValidacao");
						self.exibeProgress('progressAvaliacao');
						self.progress('progressAvaliacao','66');
						self.porcessando("hintAvaliacao");
						if (value == 7){
							self.processado("hintValidacao");
							self.verificaStatus(model.get('codigo'));
							self.exibeAvaliacaoProcesso();
						}
						else if (value == 8){
							self.progress('progressAvaliacao','100');
							self.processado("hintAvaliacao");
							self.exibeProgress('progressLimites');
							self.progress('progressLimites','100');
							self.processado("hintLimites");
							self.exibeAvaliacaoConcluida();
						}else if(value == 26){
							self.erroProcessamento("hintAvaliacao");
							self.progress('progressAvaliacao','100');
						}
					}
				},
	            error: $caixa.trataErro
			});
		},
		processado: function(id){
			$('#' + id).removeClass().addClass( "bs-callout bs-callout-success" );
		},
		porcessando: function(id){
			$('#' + id).removeClass().addClass( "bs-callout bs-callout-warning" );
		},
		erroProcessamento: function(id){
			$('#' + id).removeClass().addClass( "bs-callout bs-callout-danger" );
		},
		progress: function(id,processo){
			var style = "";
			if (parseInt(processo) == 100){
				$('#' + id + '2').removeClass('active');
			}
			style = processo + "%";
			$('#' + id).css('width',style);
		},
		exibeProgress: function(id){
			$('#' + id + "3").removeClass('hide');
		},
		remontaFormulario: function(){
			
		}
	});
	return AvaliarControle;
});