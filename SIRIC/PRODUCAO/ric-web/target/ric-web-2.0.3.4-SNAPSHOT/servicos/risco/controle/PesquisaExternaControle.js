define([
	'text!servicos/risco/visao/pesquisaexterna.html',
	'bootstrap',
	'ajaxStatus',
	'servicos/risco/modelo/PesquisaExternaModelo',
	'servicos/risco/controle/ConfirmacaoControle',
	'servicos/risco/modelo/RelatorioPesquisaModelo',
	'servicos/risco/controle/SIRICUtilsControle'
], function(template, Bootstrap, AjaxStatus,PesquisaExternaModelo,ConfirmacaoControle,RelatorioPesquisaModelo,SIRICUtilsControle) {
	var PesquisaExternaControle = Backbone.View.extend({
	
		initialize: function() {
			this.pessoa = null;
			this.model = new PesquisaExternaModelo();
			this.parametro = null;
			this.util = new SIRICUtilsControle();
		},
		
		render: function() {
			this.$el.html(_.template(template,{'model': this.model}));
			return this;
		},
		
		events: {
			"click #btnSolPesqCompleta": "retornoMensagem",
			"click #btnSolPesqRelacional": "retornoMensagem",
			"click #btnSolPesqCadastral": "retornoMensagem",
			"click #btnExibeRelPesqExt": "exibiRelatorio",
			"click #btnLiberaPesqExterna": "liberaPesquisa"
		},

		carregaPesquisaExterna: function(){
			var self = this;
			var pessoa = this.pessoa.get('codigo');
			this.model.url = "rest/risco/pesquisaexterna/" + this.pessoa.get('tipo').codigo + "," + this.pessoa.get('codigo');
			if (pessoa == '56621'){
				alert('O CNPJ da Caixa não deve ser pesquisado. ');
				return;
			}
			reiniciaContadorSessao();
			this.model.fetch({
	            success: function(model, response) {
	            	console.log("sucesso");
	        		self.model = model;
	            	self.render();
	            	$('#pesquisaExterna').modal('show');
	            },
	            error: $caixa.trataErro
			});
		},
		retornoMensagem: function(e){
			var self = this;
			this.parametro = $(e.target).data('acao'); 
			this.model.url = "rest/risco/pesquisaexterna/mensagem/" + this.pessoa.get('tipo').codigo + "," + this.pessoa.get('codigo') + "," + this.parametro;
			reiniciaContadorSessao();
			this.model.fetch({
	            success: function(data, response) {
	            	if (data.get('descricao') == "OK"){
	            		self.confirma();
	            	}else{
	            		self.exibeMensagem("Pesquisa Externa",data.get('descricao'));
	            	}
	            },
	            error: $caixa.trataErro
			});
		},
		
		
		exibeMensagem: function(titulo,descricao){
			this.confirmacao = new ConfirmacaoControle();
        	this.confirmacao.model.set('titulo',titulo);
        	this.confirmacao.model.set('conteudo',descricao);
			this.listenTo(this.confirmacao, 'ok', this.confirma);
			this.confirmacao.exibeConfirmacao();
			$('#confirmacao').css('z-index','1500');
			
		},
		
		
		confirma: function(){
			this.model.url = "rest/risco/pesquisaexterna/solicita/" + this.pessoa.get('tipo').codigo + "," + this.pessoa.get('codigo') + "," + this.parametro;
			reiniciaContadorSessao();
			this.model.fetch({
	            success: function(data, response) {
	            	alert(data.get('descricao'));
	            	$('#pesquisaExterna').modal('hide');
	            },
	            error: $caixa.trataErro
			});
		},
		exibiRelatorio: function(){
			reiniciaContadorSessao();
			var self = this;
			var relatorioPesquisa = new RelatorioPesquisaModelo();
			relatorioPesquisa.set('codigoPessoa',this.pessoa.get('codigo'));

			relatorioPesquisa.save(undefined,{
	            success: function(model, response) {
	            	var LeftPosition = (screen.width) ? (screen.width-800)/2 : 0;
	    			var TopPosition = 50;
	    			var settings = 'height = 600 , width = 800, titlebar = no , location = no , directories = no , scrollbars=yes , top=' + TopPosition + ',left=' + LeftPosition + ',resizable';
	    			var myWindow = window.open("","SIRIC",settings);
	            	myWindow.document.write(model.get("descricao"));
	            	myWindow.focus();
	            },
	            error: function(model, response){
	            	var options = {
	            		container: "errorsContainer",
	            		view: self,
	            		close: true
	            	};
	            	
	            	self.util.adicionarMensagemNegocialContainer(response.responseJSON, options);
	            }
			});
		},
		liberaPesquisa: function(){
			var self = this;
			this.model.url = "rest/risco/pesquisaexterna/libera/" + this.pessoa.get('codigo');
			reiniciaContadorSessao();
			this.model.fetch({
	            success: function(data, response) {
	            	$('#pesquisaExterna').modal('hide');
	            	self.carregaPesquisaExterna();
	            	alert(data.get('descricao'));
	            },
	            error: $caixa.trataErro
			});
		}
	});
	return PesquisaExternaControle;
});