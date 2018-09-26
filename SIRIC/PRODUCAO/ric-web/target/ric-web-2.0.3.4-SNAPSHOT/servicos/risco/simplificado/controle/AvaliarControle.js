define([
	'text!servicos/risco/simplificado/visao/avaliar.html',
	'bootstrap',
	'ajaxStatus',
	'servicos/risco/modelo/AvaliarModelo',
	'servicos/risco/controle/ConsultaAvaliacaoControle',
	'servicos/risco/modelo/PessoaModelo',
	'servicos/risco/modelo/ProvedorModelo',
	'servicos/risco/modelo/ControleProvedorModelo'
], function(template, Bootstrap, AjaxStatus,AvaliarModelo,ConsultaAvaliacaoControle,PessoaModelo,ProvedorModelo,ControleProvedorModelo) {
	var AvaliarControle = Backbone.View.extend({
	
		initialize: function() {
			this.exibir = 0;
			this.pessoa = null;
			this.modelo = null;
			this.modeloAvaliacaoColecao = null;
			this.model = new AvaliarModelo();
			this.count = 0;
		},
		
		render: function() {
			this.$el.html(_.template(template));
			return this;
		},
		
		events: {
			"click #btnAvaliar": "avaliar"
		},
		
		carregaAvaliacaoControle: function(){
			this.render();
		},
		
		avaliar: function(){
			$('#btnAvaliar').attr('disabled','disabled');
			var self = this;
			$('#divBtnAvaliar').remove();
			$('#formulario').hide();
			$('#exibeHintProcesso').removeClass('hide');
			var provedor = new ProvedorModelo();
			var cpfCnpj = '';
			if(this.pessoa.get('tipo').codigo == 1){
				cpfCnpj = this.pessoa.get('pessoaCpf');
				provedor.set('pessoaFisica',this.pessoa);
				provedor.set('pessoaJuridica',null);
			}else{
				cpfCnpj = this.pessoa.get('pessoaCnpj');
				provedor.set('pessoaFisica',null);
				provedor.set('pessoaJuridica',this.pessoa);
			}
			this.pessoa.unset("cpfCnpj", "silent");
			cpfCnpj = cpfCnpj.replace(".", "");
			cpfCnpj = cpfCnpj.replace(".", "");
			cpfCnpj = cpfCnpj.replace("-", "");
			cpfCnpj = cpfCnpj.replace("/", "");
			provedor.set('modeloAvaliacaos',this.modeloAvaliacaoColecao);
			provedor.url = "rest/risco/controleavaliacao/avaliar/" + cpfCnpj;
			reiniciaContadorSessao();
			provedor.save(undefined,{
				success: function(model, response) {
					self.exibeProgress('progressPesquisa');
					self.verificaStatus(model.get('codigo'));
				},
	            error: $caixa.trataErro
			});
		},
		exibeAvaliacaoConcluida: function(){
			if(window.coPessoa == this.model.get('codigoPessoa')){
				this.consultaAvaliacao = new ConsultaAvaliacaoControle();
				var pessoa = new PessoaModelo();
				pessoa.set('codigo',this.model.get('codigoPessoa'));
				this.consultaAvaliacao.pessoa = pessoa;
	        	$('#divConsultaAvaliacao').html(this.consultaAvaliacao.render().el);
	        	this.consultaAvaliacao.carregaAvalicao(1);
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
			var controleProvedor = new ControleProvedorModelo();
			controleProvedor.url = "rest/risco/controleavaliacao/verificaprovedor/" + codigo;
			reiniciaContadorSessao();
			controleProvedor.fetch({
				success: function(model, response) {
					var value = model.get('situacao');
					if (value == 1){
						self.porcessando("hintPesquisa");
						self.progress('progressPesquisa','66');
						self.verificaStatus(model.get('codigo'));
					}else if(value == 2){
						self.erroProcessamento("hintPesquisa");
						self.progress('progressPesquisa','100');
					}else if(value == 3 || value == 4){
						self.processado("hintPesquisa");
						self.progress('progressPesquisa','100');
						self.porcessando("hintAvaliacao");
						self.exibeProgress('progressAvaliacao');
						self.progress('progressAvaliacao','66');
						self.verificaStatus(model.get('codigo'));
					}else if(value == 5 || value == 7){
						self.erroProcessamento("hintAvaliacao");
						self.progress('progressPesquisa','100');
						self.progress('progressAvaliacao','100');
					}else if(value == 6){						
						self.exibeProgress('progressAvaliacao');
						self.progress('progressPesquisa','100');
						self.progress('progressAvaliacao','100');
						self.processado("hintAvaliacao");
						self.exibeAvaliacaoConcluida();
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
		}
	});
	return AvaliarControle;
});