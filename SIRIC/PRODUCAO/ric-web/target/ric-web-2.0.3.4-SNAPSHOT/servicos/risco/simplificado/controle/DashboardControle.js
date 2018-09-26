define([
	'text!dashboard.html',
	'bootstrap',
	'ajaxStatus',
	'global',
	'verificaSessao',
	'servicos/risco/simplificado/controle/LocalizarPessoasControle',
	'servicos/risco/simplificado/controle/PesquisaAvancadaControle',
	'servicos/risco/colecao/PessoaConsultadaColecao',
	'servicos/risco/simplificado/controle/PessoaConsultadaControle'
], function(template, Bootstrap, AjaxStatus,global,VerificaSessao,LocalizarPessoasSimplificado,PesquisaAvancadaSimplificado,PessoaConsultadaColecao,PessoaConsultadaControle) {
		var DashboardControle = Backbone.View.extend({
	
			el: $('#container'),
			
			events:	{
				"click #btn_versao" : "callVersao",
			},	
			
			render: function() {
				this.AjaxStatus = new AjaxStatus();
				try {
					this.AjaxStatus.start();
					
					this.verificaSessao = new VerificaSessao();
					this.verificaSessao.inicializaContador();
					
					// Using Underscore we can compile our template with data
					var data = {};
					var compiledTemplate = _.template(template, data);
					this.$el.html(compiledTemplate);
					
					this.localizarSimplificado = new LocalizarPessoasSimplificado();
					$('#localizarPessoas').html(this.localizarSimplificado.render().el);
					
					this.pesquisaSimplificado = new PesquisaAvancadaSimplificado();
					$('#pesquisasAvancadas').html(this.pesquisaSimplificado.render().el);
					
					this.carregaPessoas();
					
				} catch (e) {
					alert(e.message);
				} finally {
					this.AjaxStatus.stop();
				}
			},
			
			carregaPessoas: function(){
				this.pessoaConsultadaColecao = new PessoaConsultadaColecao();
				this.pessoaConsultadaColecao.fetch({
		            success: function(collection, response) {
		            	var pessoaConsultada = new PessoaConsultadaControle();
		            	pessoaConsultada.collection = collection;
		            	$('#pessoasConsultadas').html(pessoaConsultada.render().el);
		            },
		            error: function(collection, response) {
		            	console.log(response.responseText);
		            }
		        });
			},
		
		    callVersao: function () {
		    	console.log("headerControle --> callVersao");
		    	var versao = new SolicitaVersaoModel();
		    	$('#container').html(new SolicitaVersaoView({model : versao}).el);
		    },
		});
		return DashboardControle;
	}
);
