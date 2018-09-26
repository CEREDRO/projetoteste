define([
	'text!servicos/risco/visao/solicitaavaliacao.html',
	'bootstrap',
	'ajaxStatus',
	'servicos/risco/modelo/PesquisaAvaliacaoModelo',
	'servicos/risco/colecao/PesquisaAvaliacaoColecao',
	'servicos/risco/controle/FormularioControle',
	'servicos/risco/modelo/PermissaoModelo',
	'servicos/risco/modelo/AjudaPDFModelo',
	'servicos/risco/controle/AjudaPdfControle',
	'servicos/risco/modelo/AjudaModelo'
], function(template, Bootstrap, AjaxStatus,PesquisaAvaliacaoModelo,PesquisaAvaliacaoColecao,FormularioControle,PermissaoModelo,AjudaPDFModelo,AjudaPdfControle,AjudaModelo) {
	var SolicitaAvaliacaoControle = Backbone.View.extend({
	
		initialize: function() {
			this.pessoa = null;
			this.model = new PesquisaAvaliacaoModelo();
			this.collection = new PesquisaAvaliacaoColecao();
		},
		
		render: function() {
			this.$el.html(_.template(template,{'collection': this.collection, 'model': this.model}));
			//this.verificaObjecto();
			return this;
		},
		
		events: {
	        "change #selModAvaliacao": "montaFormulario",
	        "click #btnAjudaPdf": "exibeAjudaPDF"
	    },
		
		carregaPeguntaAvaliacao: function(){
			var self = this;
			this.collection.pessoa = this.pessoa;
			reiniciaContadorSessao();
			this.collection.fetch({
	            success: function(collection, response) {
	            	self.collection = collection;
	            	self.render();
	            	self.permitePergunta();
	            },
	            error: function(collection, response) {
	            	console.log(response.responseText);
	            }
			});
		},
		montaFormulario: function(){
			var numero = parseInt($('#selModAvaliacao').val());
			if (numero == 0){
				$('#formulario').html('');
				$('#divAvaliar').html('');
			}else{
				this.formulario = new FormularioControle();
				this.formulario.pessoa = this.pessoa;
				this.formulario.modelo = numero;
				$('#formulario').html(this.formulario.render().el);
				this.formulario.montaFormulario();
				var self = this;
				this.ajudaPDFModelo = new AjudaPDFModelo();
				this.ajudaPDFModelo.url = "rest/risco/ajuda/verificapdf/" + numero;
				reiniciaContadorSessao();
				this.ajudaPDFModelo.fetch({
					success: function(model, response) {
						if (model.get('codigo') != 0){
							self.carregaAjudaPdf(model);
						}else{
							$('#ajudaPDF').html('');
						}
					},
		            error: $caixa.trataErro
				});
			}
		},
		carregaAjudaPdf: function(data){
			this.ajudaPdfControle = new AjudaPdfControle();
			this.ajudaPdfControle.model = data;
			$('#ajudaPDF').html(this.ajudaPdfControle.render().el.innerHTML);
		},
		exibeAjudaPDF: function(e){
			reiniciaContadorSessao();
			var url = 'rest/risco/ajuda/pdf/' + $(e.target).data('codigo');
			var LeftPosition = (screen.width) ? (screen.width-800)/2 : 0;
			var TopPosition = 50;
			var settings = 'height = 600 , width = 800, titlebar = no , location = no , directories = no , scrollbars=yes , top=' + TopPosition + ',left=' + LeftPosition + ',resizable';
			var myWindow = window.open(url,"SIRIC",settings);
        	myWindow.focus();
		},
		permitePergunta: function(){
			var ajuda = new AjudaModelo();
    		ajuda.url = "rest/risco/controleavaliacao/exibepergunta/" + this.pessoa.get('codigo');
    		reiniciaContadorSessao();
    		ajuda.fetch({
    			success: function(ajuda, response) {
    				if(ajuda.get('descricao') != "OK"){
    					$('#selModAvaliacao').attr('disabled','disabled');
    				}
    			},
    			error: $caixa.trataErro
			});
		}
	});
	return SolicitaAvaliacaoControle;
});