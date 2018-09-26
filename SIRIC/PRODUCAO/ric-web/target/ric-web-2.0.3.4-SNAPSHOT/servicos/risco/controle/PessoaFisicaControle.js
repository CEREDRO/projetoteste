define([
	'text!servicos/risco/visao/pessoafisica.html',
	'ajaxStatus',
	'servicos/risco/modelo/PessoaFisicaModelo',
	'servicos/risco/colecao/RendaColecao',
	'servicos/risco/controle/RendaControle',
	'servicos/risco/modelo/RelatorioAvaliacaoModelo',
	'servicos/risco/modelo/AjudaModelo',
	'servicos/risco/controle/ValidacaoControle',
	'servicos/risco/controle/PesquisaExternaControle',
	'servicos/risco/modelo/PermissaoModelo',
	'servicos/risco/controle/FichaCadastroPessoaFisicaControle',
	'servicos/risco/controle/DadosCanceladosControle',
	'servicos/risco/modelo/FilaValidacaoModelo',
	'servicos/risco/controle/ConsultaSICLIControle',
	'servicos/risco/modelo/ConsultaSICLIModelo',
], function(template, AjaxStatus,PessoaFisicaModelo,RendaColecao,RendaControle,RelatorioAvaliacaoModelo,AjudaModelo,ValidacaoControle,PesquisaExternaControle,PermissaoModelo,FichaCadastroPessoaFisicaControle,DadosCanceladosControle,FilaValidacaoModelo,ConsultaSICLIControle,ConsultaSICLIModelo) {
	var PessoaFisicaControle = Backbone.View.extend({
		initialize: function(options) {
			this.siclimodelo = options.siclimodelo;
			this.AjaxStatus = new AjaxStatus();
			this.count = 0;
			this.pessoa = null;
			
			_viewPessoaFisica = this;
		},
		render: function() {
			this.$el.html(_.template(template,this.model.attributes));
			
			consultasicli = new ConsultaSICLIControle({model: this.siclimodelo, pessoa: this.model});
			this.$('#containerSICLI').html(consultasicli.render());
			
			return this.$el;
		},
		
		events: {
			"click #spanRendaTotal": "exibeRendas",
			"click #btnRelAvaliacao": "exibeRelatorio",
			"click #pfDesbloqPessoa": "desbloqueiaPessoa",
			"click #pfExibePesquisaExterna": "exibePesquisaExterna",
			"click #pfExibeRelatorioValidacao": "exibeRelatorioValidacao",
			"click #exibeFichaCadastroPF": "exibeFichaCadastro",
			"click #exibeInfCanc": "exibeCancelados",
			"click #reparaDados": "reparaDados"
		},
		exibeRendas: function(){
			this.rendaColecao = this.rendaColecao || new RendaColecao();
			this.rendaColecao.pessoa = this.model;
			reiniciaContadorSessao();
			this.rendaColecao.fetch({
	            success: function(collection, response) {
	            	if (this.renda != null){
	        			$(this.renda).remove();
	        		}
	            	this.renda = new RendaControle();
	            	this.renda.collection = collection;
	            	$('#rendaTotal').html(this.renda.render().el);
	            	this.renda.render();
	            },
	            error: function(collection, response) {
	            	console.log(response.responseText);
	            }
			});
		},
		exibeRelatorio: function(e){
			if ($(e.target).data('avaliacaoid') == 0){
				alert("Não Possui Avaliação");
			}else{
				reiniciaContadorSessao();
				var self = this;
				var relatorioAvaliacao = new RelatorioAvaliacaoModelo();
				relatorioAvaliacao.set('codigoAvaliacao',$(e.target).data('avaliacaoid'));
				
				relatorioAvaliacao.save(undefined,{
		            success: function(model, response) {
		            	var LeftPosition = (screen.width) ? (screen.width-800)/2 : 0;
						var TopPosition = 50;
						var settings = 'height = 600 , width = 800, titlebar = no , location = no , directories = no , scrollbars=yes , top=' + TopPosition + ',left=' + LeftPosition + ',resizable';
						var myWindow = window.open("","",settings);
						myWindow.document.write("<script>setTimeout(function(){var olv = document.body.getAttribute('onload'); eval(olv);}, 1000);</script>");
		            	myWindow.document.write(model.get("descricao"));
		            	myWindow.focus();
		            },
		            error: function(model, response){
		            	$caixa.util.adicionarMensagemNegocialContainer(response.responseJSON);
		            }
				});
			}	
		},
		desbloqueiaPessoa: function(){
			desbloqueio = new PessoaFisicaModelo();
			desbloqueio.url = "rest/risco/pessoas/desbloqueio/" + this.model.get('codigo');
			desbloqueio.fetch({
				success: function(data, response) {
					if (data.get('descricao') == "Desbloqueio efetuado com sucesso."){
						_viewPessoaFisica.model.set({procBatch: 0});
					}else{
						alert(data.get('descricao'));
					}
	            },error: function(model, response) {
	            	console.log(response.responseText);
	            }
			});
		},
		exibePesquisaExterna: function(){
			var pesquisaExterna = new PesquisaExternaControle();
			pesquisaExterna.pessoa = this.model;
			$('#divModal').html(pesquisaExterna.render().el);
			pesquisaExterna.carregaPesquisaExterna();
		},
		
		exibeRelatorioValidacao: function(){
			var validacao = new ValidacaoControle();
			validacao.pessoa = this.model.get('codigo');
			$('#exibeValidacaoPf').html(validacao.render().el);
			validacao.carregaValidacao();
			$('#formulario').show();
		},
		exibeFichaCadastro: function(){
			this.fichaCadastroPessoaFisica = new FichaCadastroPessoaFisicaControle();
			this.fichaCadastroPessoaFisica.codigo = this.model.get('codigo');
			this.listenTo(this.fichaCadastroPessoaFisica, 'success', this.exibeFicha);
			this.fichaCadastroPessoaFisica.efetuaCarga();
		},
		exibeFicha: function(conteudo){
			var LeftPosition = (screen.width) ? (screen.width-800)/2 : 0;
			var TopPosition = 50;
			var settings = 'height = 600 , width = 800, titlebar = no , location = no , directories = no , scrollbars=yes , top=' + TopPosition + ',left=' + LeftPosition + ',resizable';
			var myWindow = window.open("","",settings);
			myWindow.document.write('');
			myWindow.document.write("<!DOCTYPE html><html lang=\"pt-br\"><head><meta http-equiv=\"X-UA-Compatible\" content=\"IE=10; IE=9; IE=8; IE=7; IE=EDGE\" /><meta charset=\"utf-8\"><title>SIRIC - Sistema de Mensura&ccedil;&atilde;o de Risco de Cr&eacute;dito</title><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"><meta name=\"description\" content=\"\"><meta name=\"author\" content=\"\"><link rel=\"shortcut icon\" href=\"layout/img/Smiley16x16.ico\"/><link href=\"layout/css/bootstrap.css\" rel=\"stylesheet\"><link href=\"layout/css/bootstrap-responsive.css\" rel=\"stylesheet\"><link href=\"layout/css/bootstrap-datetimepicker.min.css\" rel=\"stylesheet\"><style type=\"text/css\">label{font-size:12px;}</style></head><body style=\"padding-top: 50px;padding-bottom: 50px;padding-left: 50px;padding-right: 50px;\">"  + this.fichaCadastroPessoaFisica.render().el.innerHTML +  "</body></html>");
        	myWindow.focus();
		},
		exibeCancelados: function(){
			this.dadosCancelados = new DadosCanceladosControle();
			this.dadosCancelados.pessoa = this.model.get('codigo');
			$('#divDadosCancelados').html(this.dadosCancelados.render().el);
			this.dadosCancelados.carregaDadosCancelados();
		},
		reparaDados: function(){
			this.ajaxStatus = new AjaxStatus();
	    	this.ajaxStatus.start();
			reiniciaContadorSessao();
			var self = this;
			var filaValidacao = new FilaValidacaoModelo();
			filaValidacao.set('codigoPessoa',this.model.get('codigo'));
			filaValidacao.set('modeloAvaliacao',1420);
			filaValidacao.save(undefined,{
	            success: function(model, response) {
	            	if(model.get('situacao') != 3 && model.get('situacao') != 4){
	            		self.recuperaValidacao();
	            	}else{
	            		self.finalizaRecuperacao();
	            	}
	            },
	            error: $caixa.trataErro
			});
		},
		recuperaValidacao: function(){
			var self = this;
			setTimeout(function(){
				reiniciaContadorSessao();
				var filaValidacao = new FilaValidacaoModelo();
				filaValidacao.url = "rest/risco/pessoas/retornavalidacao/" + self.model.get('codigo');
				filaValidacao.fetch({
	    			success: function(model, response) {
	    				if(model.get('situacao') != 3 && model.get('situacao') != 4){
		            		self.recuperaValidacao();
		            	}else{
		            		self.finalizaRecuperacao();
		            	}
	    			},
	    			error: $caixa.trataErro
				});
		    }, 1000);
		},
		finalizaRecuperacao: function(){
			this.ajaxStatus.stop();
			this.exibeRelatorioValidacao();
		}
	});
	return PessoaFisicaControle;
});