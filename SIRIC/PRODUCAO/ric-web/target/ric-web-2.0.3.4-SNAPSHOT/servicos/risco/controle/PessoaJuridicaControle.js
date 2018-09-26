define([
	'text!servicos/risco/visao/pessoajuridica.html',
	'ajaxStatus',
	'servicos/risco/modelo/PessoaJuridicaModelo',
	'servicos/risco/modelo/RelatorioAvaliacaoModelo',
	'servicos/risco/modelo/AjudaModelo',
	'servicos/risco/controle/ValidacaoControle',
	'servicos/risco/controle/PesquisaExternaControle',
	'servicos/risco/modelo/PermissaoModelo',
	'servicos/risco/controle/FichaCadastroPessoaJuridicaControle',
	'servicos/risco/controle/DadosCanceladosControle',
	'servicos/risco/controle/ConsultaSICLIControle',
	'servicos/risco/modelo/ConsultaSICLIModelo',
], function(template, AjaxStatus,PessoaJuridicaModelo,RelatorioAvaliacaoModelo,AjudaModelo,ValidacaoControle,PesquisaExternaControle,PermissaoModelo,FichaCadastroPessoaJuridicaControle,DadosCanceladosControle,ConsultaSICLIControle,ConsultaSICLIModelo) {
	var PessoaJuridicaControle = Backbone.View.extend({
		initialize: function(options) {
			this.siclimodelo = options.siclimodelo;
			this.AjaxStatus = new AjaxStatus();
			this.count = 0;
			this.pessoa = null;		
			
			_viewPessoaJuridica = this;
		},
		render: function() {
			this.$el.html(_.template(template,this.model.attributes));
			
			consultasicli = new ConsultaSICLIControle({model: this.siclimodelo, pessoa: this.model});
			this.$('#containerSICLI').html(consultasicli.render());
			
			return this.$el;
		},
		
		events: {
			"click #btnPjRelAvaliacao": "exibeRelatorio",
			"click #atualizaPjSICLI": "atualizaSICLI",
			"click #pjDesbloqPessoa": "desbloqueiaPessoa",
			"click #pjExibePesquisaExterna": "exibePesquisaExterna",
			"click #pjExibeRelatorioValidacao": "exibeRelatorioValidacao",
			"click #exibeFichaCadastroPJ": "exibeFichaCadastro",
			"click #exibeInfCanc": "exibeCancelados"
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
			desbloqueio = new PessoaJuridicaModelo();
			desbloqueio.url = "rest/risco/pessoas/desbloqueio/" + this.model.get('codigo');
			desbloqueio.fetch({
				success: function(data, response) {
					if (data.get('descricao') == "Desbloqueio efetuado com sucesso."){
						_viewPessoaJuridica.model.set({procBatch: 0});
					}else{
						alert(data.get('descricao'));
					}
	            },
	            error: $caixa.trataErro
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
			$('#exibeValidacaoPj').html(validacao.render().el);
			validacao.carregaValidacao();
			$('#formulario').show();
		},
		exibeFichaCadastro: function(){
			this.fichaCadastroPessoaJuridica = new FichaCadastroPessoaJuridicaControle();
			this.fichaCadastroPessoaJuridica.codigo = this.model.get('codigo');
			this.listenTo(this.fichaCadastroPessoaJuridica, 'success', this.exibeFicha);
			this.fichaCadastroPessoaJuridica.efetuaCarga();
		},
		exibeFicha: function(conteudo){
			var LeftPosition = (screen.width) ? (screen.width-800)/2 : 0;
			var TopPosition = 50;
			var settings = 'height = 600 , width = 800, titlebar = no , location = no , directories = no , scrollbars=yes , top=' + TopPosition + ',left=' + LeftPosition + ',resizable';
			var myWindow = window.open("","",settings);
			myWindow.document.write('');
			myWindow.document.write("<!DOCTYPE html><html lang=\"pt-br\"><head><meta http-equiv=\"X-UA-Compatible\" content=\"IE=10; IE=9; IE=8; IE=7; IE=EDGE\" /><meta charset=\"utf-8\"><title>SIRIC - Sistema de Mensura&ccedil;&atilde;o de Risco de Cr&eacute;dito</title><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"><meta name=\"description\" content=\"\"><meta name=\"author\" content=\"\"><link rel=\"shortcut icon\" href=\"layout/img/Smiley16x16.ico\"/><link href=\"layout/css/bootstrap.css\" rel=\"stylesheet\"><link href=\"layout/css/bootstrap-responsive.css\" rel=\"stylesheet\"><link href=\"layout/css/bootstrap-datetimepicker.min.css\" rel=\"stylesheet\"><style type=\"text/css\">label{font-size:12px;}</style></head><body style=\"padding-top: 50px;padding-bottom: 50px;padding-left: 50px;padding-right: 50px;\">"  + this.fichaCadastroPessoaJuridica.render().el.innerHTML +  "</body></html>");
        	myWindow.focus();
		},
		exibeCancelados: function(){
			this.dadosCancelados = new DadosCanceladosControle();
			this.dadosCancelados.pessoa = this.model.get('codigo');
			$('#divDadosCancelados').html(this.dadosCancelados.render().el);
			this.dadosCancelados.carregaDadosCancelados();
		}
	});
	return PessoaJuridicaControle;
});
