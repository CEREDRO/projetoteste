define([
	'text!servicos/risco/visao/pessoarural.html',
	'bootstrap',
	'ajaxStatus',
	'servicos/risco/modelo/PessoaRuralModelo',
	'servicos/risco/modelo/PermissaoModelo',
	'servicos/risco/controle/PropriedadeRuralControle',
	'servicos/risco/modelo/PropriedadeRuralModelo',
	'servicos/risco/controle/ValidacaoControle',
	'servicos/risco/controle/DadosCanceladosControle',
	'servicos/risco/modelo/FilaValidacaoModelo'
], function(template, Bootstrap, AjaxStatus,PessoaRuralModelo,PermissaoModelo,PropriedadeRuralControle,PropriedadeRuralModelo,ValidacaoControle,DadosCanceladosControle,FilaValidacaoModelo) {
	var PessoaRuralControle = Backbone.View.extend({
			
		tagName: 'div',
		
		initialize: function() {
			this.AjaxStatus = new AjaxStatus();
			
			_viewPessoaRural = this;
		},
		
		render: function() {
			
			this.$el.html(_.template(template,this.model.attributes));
			this.trigger('success');
			return this.$el;
		},
		
		events: {
			"click #prDesbloqPessoa"                    : "desbloqueiaPessoa",
			"click #prAlterarPessoa"                    : "alterarPessoa",
			"click #pesRuralMatrExibeRelatorioValidacao": "exibeRelatorioValidacao",
			"click #reparaDados"                        : "reparaDados",
			"click #exibeInfCanc"                       : "exibeCancelados"
		},
		desbloqueiaPessoa: function(){
			desbloqueio = new PessoaRuralModelo();
			desbloqueio.url = "rest/risco/pessoas/desbloqueio/" + this.model.get('codigo');
			desbloqueio.fetch({
				success: function(data, response) {
					if (data.get('descricao') == "Desbloqueio efetuado com sucesso."){
						_viewPessoaRural.model.set({procBatch: 0});
					}else{
						alert(data.get('descricao'));
					}
					
	            },
	            error: $caixa.trataErro
			});
		},
		alterarPessoa: function(){
				var self = this;
		    	var propriedaderuralmodelo = new PropriedadeRuralModelo();
		    	
		    	propriedaderuralmodelo.url = propriedaderuralmodelo.urlRoot + this.model.get('codigo');
		    	propriedaderuralmodelo.fetch({
		            success: function(model, response) {
		            	var propriedadeRural = new PropriedadeRuralControle({model: model, acao: "ALTERAR"});
		            	propriedadeRural.view = self;
				    	$('#divPropriedadeRural').html(propriedadeRural.render().el);
				    	propriedadeRural.afterRender();
		            },
		            error: $caixa.trataErro
		        });
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
		exibeRelatorioValidacao: function(){
			var validacao = new ValidacaoControle();
			validacao.pessoa = this.model.get('codigo');
			$('#exibeValidacaoPessoaRural').html(validacao.render().el);
			validacao.carregaValidacao();
			$('#formulario').show();
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
	return PessoaRuralControle;
});