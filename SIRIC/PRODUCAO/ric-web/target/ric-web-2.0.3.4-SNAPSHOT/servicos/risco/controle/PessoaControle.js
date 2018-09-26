define([
	'text!servicos/risco/visao/pessoa.html',
	'servicos/risco/modelo/AvaliarModelo',
	'servicos/risco/colecao/GerenciadorLimiteColecao',
	'servicos/risco/controle/ConsultaAvaliacaoControle',
	'servicos/risco/controle/SolicitaAvaliacaoControle',
	'servicos/risco/controle/PessoaFisicaControle',
	'servicos/risco/controle/PessoaJuridicaControle',
	'servicos/risco/controle/PessoaRuralControle',
	'servicos/risco/controle/StatusAvaliacaoControle',
	'servicos/risco/modelo/ConsultaSICLIModelo',
], function(template, AvaliarModelo, GerenciadorLimiteColecao, ConsultaAvaliacaoControle, SolicitaAvaliacaoControle, PessoaFisicaControle, PessoaJuridicaControle, PessoaRuralControle, StatusAvaliacaoControle, ConsultaSICLIModelo) {
	var PessoaControle = Backbone.View.extend({
		initialize: function() {
			_viewPessoa = this;
			this.listenTo(this.model, 'change', this.render);
		},
		render: function() {
			this.$el.html(_.template(template,this.model.attributes));
			
			/*
			 * Ghomma, pois o código anterior setava essa variavel global... na reescrita eu não removi pois ocorre erro em outras funcionalidades
			 * que utilizam esse valor.
			 * 
			 * TODO: Analisar como retirar essa ghomma.
			 */
			window.coPessoa = this.model.get('codigo');
			
			if (_viewPessoa.model.get("tipo").codigo != 23){
				consultasicli = new ConsultaSICLIModelo();
				consultasicli.url = 'rest/risco/pessoas/verificasicli/' + _viewPessoa.model.getNonFormmatedValue("cpfcnpj");
				consultasicli.fetch({
					success: function(siclimodelo, response){       			
	        			if (_viewPessoa.model.get("tipo").codigo == 1){
	        				pf = new PessoaFisicaControle({model: _viewPessoa.model, siclimodelo: siclimodelo});
	        				_viewPessoa.$('#dadosPessoa').html(pf.render());
	        			} else {
	        				pr = new PessoaJuridicaControle({model: _viewPessoa.model, siclimodelo: siclimodelo});
	        				_viewPessoa.$('#dadosPessoa').html(pr.render());
	        			}
	        		},
	        		error: function(model, response) {
	 	            	$caixa.util.adicionarMensagemNegocialContainer(response.responseJSON);
	 	            }
	        	});
			} else {
				rural = new PessoaRuralControle({model: _viewPessoa.model});
				_viewPessoa.$('#dadosPessoa').html(rural.render());
			}
			
			this.GerenciadorLimiteColecao = new GerenciadorLimiteColecao();
        	this.GerenciadorLimiteColecao.pessoa = this.model;
        	this.GerenciadorLimiteColecao.fetch({
        		success: function(colecao, response){
        			colecao.each(function(gerenciadorlimite){
        				var gerenciadorlimitecontrole = new GerenciadorLimiteControle({model: gerenciadorlimite});
        				$('#divGerenciadorLimites').html(gerenciadorlimitecontrole.render().el);
        			});
        		},
        		error: function(model, response) {
 	            	$caixa.util.adicionarMensagemNegocialContainer(response.responseJSON);
 	            }	
        	});
        	
        	
	    	this.consultaAvaliacao = new ConsultaAvaliacaoControle();
        	this.consultaAvaliacao.pessoa = this.model;
        	$('#divConsultaAvaliacao').html(this.consultaAvaliacao.render().el);
        	this.consultaAvaliacao.carregaAvalicao();
	    	
	    	this.solicitaAvaliacao = new SolicitaAvaliacaoControle();
        	this.solicitaAvaliacao.pessoa = this.model;
        	$('#divSolicitaAvaliacao').html(this.solicitaAvaliacao.render().el);
        	this.solicitaAvaliacao.carregaPeguntaAvaliacao();
        	$('#pessoasConsultadasteste').attr({class: "collapse", style: "heigth: 0;"});
        	var self = this;
        	this.avaliarModelo = new AvaliarModelo();
        	this.avaliarModelo.url = "rest/risco/controleavaliacao/verifica/" + this.model.get('codigo');
        	reiniciaContadorSessao();
        	this.avaliarModelo.fetch({
        		success: function(data, response) {
        			//self.recarregaConsultados();
        			if (data.get('codigo') != 0){
        				if (data.get('situacao') == 7){
        					self.consultaAvaliacao.carregaAvalicao(1);
        				}
        				self.statusAvaliacao = new StatusAvaliacaoControle();
        				self.statusAvaliacao.pessoa = self.model;
        				self.statusAvaliacao.model = data;
    					$('#divAvaliar').html(self.statusAvaliacao.render().el);
    					$('#exibeHintProcesso').removeClass('hide');
    					self.statusAvaliacao.verificaStatus(data.get('codigoPessoa'));
        			}
        			
        		},
        		error: function(model, response) {
 	            	$caixa.util.adicionarMensagemNegocialContainer(response.responseJSON);
 	            }
        	});
        	
			return this.$el;
		}
	});
	return PessoaControle;
});