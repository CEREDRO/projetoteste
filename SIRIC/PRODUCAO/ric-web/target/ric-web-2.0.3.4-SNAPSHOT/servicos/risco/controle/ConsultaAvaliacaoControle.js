define([
	'text!servicos/risco/visao/consultaavaliacao.html',
	'bootstrap',
	'ajaxStatus',
	'servicos/risco/modelo/ConsultaAvaliacaoModelo',
	'servicos/risco/colecao/ConsultaAvaliacaoColecao',
	'servicos/risco/controle/DetalheAvaliacaoControle',
	'servicos/risco/modelo/RelatorioAvaliacaoModelo',
	'servicos/risco/controle/ConfirmacaoControle',
	'servicos/risco/controle/ItemAvaliacaoControle',
	'servicos/risco/modelo/PermissaoModelo',
	'servicos/risco/colecao/GerenciadorLimiteColecao',
	'servicos/risco/controle/GerenciadorLimiteControle',
	'servicos/risco/controle/SIRICUtilsControle'
], function(template, Bootstrap, AjaxStatus,ConsultaAvaliacaoModelo,ConsultaAvaliacaoColecao,DetalheAvaliacaoControle,RelatorioAvaliacaoModelo,ConfirmacaoControle,ItemAvaliacaoControle,PermissaoModelo,GerenciadorLimiteColecao,GerenciadorLimiteControle,SIRICUtilsControle) {
	var ConsultaAvaliacaoControle = Backbone.View.extend({
	
		tagName: 'div',
		
		initialize: function() {
			this.pessoa = null;
			this.avalicao = null;
			this.model = new ConsultaAvaliacaoModelo();
			this.collection = new ConsultaAvaliacaoColecao();
			this.icStatusPesquisa = 0;
			this.util = new SIRICUtilsControle();
		},
		
		events: {
			"click .detalhe-avaliacao" : "exibeDetalhe",
			"click .relatorio-avaliacao": "exibeRelatorio",
			"click .cancela-avaliacao": "confirmaCancelamento",
			"click .alcada-avaliacao": "confirmaAlcada",
			"click .renda-avaliacao": "confirmaRenda",
			"click .tomador-bloqueado": "confirmaTomador",
			"click .item-avaliacao": "exibeItem",
			"change #exibeAvalCanc": "exibeAvaliacoes",
			"click #btnhistaval": "acessoBaseHistorica",
			"click .item-avaliacao-hist": "exibeItemHistorica",
			"click .detalhe-avaliacao-hist": "exibeDetalheHistorico"
		},
		
		render: function() {
			this.$el.html(_.template(template,{'collection': this.collection}));
			this.verificaObjeto();
			this.verificaObjetoBaseHistorica(); 
			return this;
		},
		
		carregaAvalicao: function(v){
			var self = this;
			this.collection.url = "rest/risco/avaliacao/" + this.pessoa.get('codigo') + ",0";
			reiniciaContadorSessao();
			this.collection.fetch({
	            success: function(collection, response) {
	            	self.collection = collection;
	            	self.render();
	            	//$('#btnhistaval').hide();
			          $('#consultaAvaliacao').collapse('show');

	            	/*if (v != null && v == 1){
	            		$('#consultaAvaliacao').collapse('show');
	            	}*/
	            },
	            error: $caixa.trataErro
			});
		},
		exibeDetalhe: function(e){
			this.detalheAvaliacao = new DetalheAvaliacaoControle();
			this.detalheAvaliacao.pessoaModel = this.pessoa; 
			this.detalheAvaliacao.model.codigo = $(e.target).data('codigo');
			this.detalheAvaliacao.carregaDetalhe();
		},
		exibeDetalheHistorico: function(e){
			this.detalheAvaliacao = new DetalheAvaliacaoControle();
			this.detalheAvaliacao.model.codigo = $(e.target).data('codigo');
			this.detalheAvaliacao.carregaDetalhe(1);
		},
		exibeRelatorio: function(e){
			reiniciaContadorSessao();
			var self = this;
			var relatorioAvaliacao = new RelatorioAvaliacaoModelo();
			relatorioAvaliacao.set('codigoAvaliacao',$(e.target).data('codigo'));
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
	            error: function(model, response) {
	            	console.log(response);
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
		confirmaCancelamento: function(e){
			this.avalicao = $(e.target).data('codigo');
			this.confirmacao = new ConfirmacaoControle();
			this.confirmacao.model.set('titulo','Atenção!');
			this.confirmacao.model.set('conteudo','Tem certeza que deseja cancelar a avaliacao: ' + $(e.target).data('codigo') + "?");
			this.listenTo(this.confirmacao, 'ok', this.reConfirma);
			this.confirmacao.exibeConfirmacao();
		},
		reConfirma: function(){
			this.confirmacao = new ConfirmacaoControle();
			this.confirmacao.model.set('titulo','Atenção!');
			this.confirmacao.model.set('conteudo','O cancelamento INDEVIDO de avaliação de risco de crédito gera sérios problemas operacionais e institucionais para a CAIXA . O cancelamento de uma avaliação é irreversível . Confirma este cancelamento ?');
			this.listenTo(this.confirmacao, 'ok', this.cancelaAvaliacao);
			this.confirmacao.exibeConfirmacao();
		},
		
		cancelaAvaliacao: function(){
			var self = this;
			this.model.url = "rest/risco/avaliacao/cancela/" + this.avalicao;
			reiniciaContadorSessao();
			this.model.fetch({
	            success: function(model, response) {
	            	self.carregaAvalicao();
	            	
	            	this.GerenciadorLimiteColecao = new GerenciadorLimiteColecao();
		        	this.GerenciadorLimiteColecao.pessoa = self.pessoa;
		        	this.GerenciadorLimiteColecao.fetch({
		        		success: function(colecao, response){
		        			$('#divGerenciadorLimites').html('');
		        			colecao.each(function(gerenciadorlimite){
		        				var gerenciadorlimitecontrole = new GerenciadorLimiteControle({model: gerenciadorlimite});
		        				$('#divGerenciadorLimites').html(gerenciadorlimitecontrole.render().el);
		        			});
		        		},
		        		error: $caixa.trataErro
		        		
		        	});
	            },
	            error: function(model,response){
	            	var mensagemErro1 = JSON.parse(response.responseText).mensagemErro;
	            	var mensagemErro = mensagemErro1.toString();
	            	alert(mensagemErro.substring(mensagemErro.indexOf(':') + 1));
	            }
			});
		},
		confirmaTomador: function(e){
			this.avalicao = $(e.target).data('codigo');
			this.confirmacao = null;
			this.confirmacao = new ConfirmacaoControle();
			this.confirmacao.model.set('titulo','Atenção!');
			this.confirmacao.model.set('conteudo',"A avaliação " + $(e.target).data('codigo') + " será desbloqueada. Confirma o desbloqueio ?");
			this.listenTo(this.confirmacao, 'ok', this.liberaTomador);
			this.confirmacao.exibeConfirmacao();
		},
		liberaTomador: function(){
			var self = this;
			this.model.url = "rest/risco/avaliacao/desbloqueia/" + this.avalicao + ",T";
			reiniciaContadorSessao();
			this.model.fetch({
	            success: function(model, response) {
	            	self.carregaAvalicao();
	            },
	            error: function(model,response){
	            	var mensagemErro1 = JSON.parse(response.responseText).mensagemErro;
	            	var mensagemErro = mensagemErro1.toString();
	            	alert(mensagemErro.substring(mensagemErro.indexOf(':') + 1));
	            }
			});
		},
		confirmaAlcada: function(e){
			this.avalicao = $(e.target).data('codigo');
			this.confirmacao = null;
			this.confirmacao = new ConfirmacaoControle();
			this.confirmacao.model.set('titulo','Atenção!');
			this.confirmacao.model.set('conteudo',"A avaliação : " + $(e.target).data('codigo') + ", será desbloqueada por alçada. Confirma o desbloqueio ?");
			this.listenTo(this.confirmacao, 'ok', this.liberaAlcada);
			this.confirmacao.exibeConfirmacao();
		},
		liberaAlcada: function(){
			var self = this;
			this.model.url = "rest/risco/avaliacao/desbloqueia/" + this.avalicao + ",A";
			reiniciaContadorSessao();
			this.model.fetch({
	            success: function(model, response) {
	            	self.carregaAvalicao();
	            },
	            error: function(model, response) {
	            	console.log(response);
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
		confirmaRenda: function(e){
			this.avalicao = $(e.target).data('codigo');
			this.confirmacao = null;
			this.confirmacao = new ConfirmacaoControle();
			this.confirmacao.model.set('titulo','Atenção!');
			this.confirmacao.model.set('conteudo',"A avaliação: " + $(e.target).data('codigo') + ", será desbloqueada por renda presumida. Confirma o desbloqueio?");
			this.listenTo(this.confirmacao, 'ok', this.liberaRenda);
			this.confirmacao.exibeConfirmacao();
		},
		liberaRenda: function(){
			var self = this;
			this.model.url = "rest/risco/avaliacao/desbloqueia/" + this.avalicao + ",R";
			reiniciaContadorSessao();
			this.model.fetch({
	            success: function(model, response) {
	            	self.carregaAvalicao();
	            },
	            error: $caixa.trataErro
			});
		},
		exibeItem: function(e){
			this.itemAvaliacao = new ItemAvaliacaoControle();
			this.itemAvaliacao.carregaItem($(e.target).data('codigo'));
		},
		exibeItemHistorica: function(e){
			this.itemAvaliacao = new ItemAvaliacaoControle();
			this.itemAvaliacao.carregaItemHistorico($(e.target).data('codigo'));
		},
		exibeAvaliacaoCancelada: function(){
			var self = this;
			this.collection.url = "rest/risco/avaliacao/" + this.pessoa.get('codigo') + ",1";
			reiniciaContadorSessao();
			this.collection.fetch({
	            success: function(collection, response) {
	            	self.collection = collection;
	            	self.render();
	            	$('#consultaAvaliacao').collapse('show');
	            },
	            error: $caixa.trataErro
			});
		},
		acessoBaseHistorica: function(){
			var self = this;
			this.collection.url = "rest/risco/avaliacao/basehistorica/" + this.pessoa.get('codigo') + ",1";
			reiniciaContadorSessao();
			this.collection.fetch({
	            success: function(collection, response) {
	            	self.collection = collection;
	            	self.render();
	            	$('#consultaAvaliacao').collapse('show');
	            	$('.item-avaliacao').removeClass('item-avaliacao').addClass('item-avaliacao-hist');
	            	$('.detalhe-avaliacao').removeClass('detalhe-avaliacao').addClass('detalhe-avaliacao-hist');
	            },
	            error: $caixa.trataErro
			});
		},
		verificaObjeto: function(){
			var self = this;
			this.permissao = new PermissaoModelo();
			this.permissao.url = "rest/risco/permissao/antiga/0,69";
			reiniciaContadorSessao();
			this.permissao.fetch({
				success: function(permissao, response) {
					if (permissao.get('codigo') != 1){
						if ($("#exibeAvalCanc option[value='2']").val() != undefined){
							$("#exibeAvalCanc option[value='2']").remove();
						}
					}
					if (self.icStatusPesquisa == 2)
						$('#exibeAvalCanc').val(self.icStatusPesquisa);
					},
				error: $caixa.trataErro
			});
		},
		verificaObjetoBaseHistorica: function(){
			var self = this;
			this.permissao = new PermissaoModelo();
			reiniciaContadorSessao();
			this.permissao.url = "rest/risco/permissao/antiga/0,197";
			this.permissao.fetch({
				success: function(permissao, response) {
					if (permissao.get('codigo') != 1){
						if ($("#exibeAvalCanc option[value='3']").val() != undefined){
							$("#exibeAvalCanc option[value='3']").remove();
						}
					}
					if (self.icStatusPesquisa == 3)
						$('#exibeAvalCanc').val(self.icStatusPesquisa);
				},
				error: $caixa.trataErro
			});
		},
		exibeAvaliacoes: function(){
			if($('#exibeAvalCanc').val() == 1){
				this.icStatusPesquisa = 1;
				this.carregaAvalicao();
			}else if($('#exibeAvalCanc').val() == 2){
				this.icStatusPesquisa = 2;
				this.exibeAvaliacaoCancelada();
			}else if($('#exibeAvalCanc').val() == 3){
				this.icStatusPesquisa = 3;
				this.acessoBaseHistorica();
			}else{
				return;
			}			
		}
	});
	return ConsultaAvaliacaoControle;
});