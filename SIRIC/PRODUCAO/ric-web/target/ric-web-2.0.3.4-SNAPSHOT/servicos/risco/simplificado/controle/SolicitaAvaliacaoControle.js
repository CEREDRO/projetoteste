define([
	'text!servicos/risco/simplificado/visao/solicitaavaliacao.html',
	'bootstrap',
	'ajaxStatus',
	'servicos/risco/modelo/ModeloAvaliacaoModelo',
	'servicos/risco/colecao/ModeloAvaliacaoColecao',
	'servicos/risco/simplificado/controle/StatusAvaliacaoControle',
	'servicos/risco/modelo/ControleProvedorModelo',
	'servicos/risco/simplificado/controle/AvaliarControle'
], function(template, Bootstrap, AjaxStatus,ModeloAvaliacaoModelo,ModeloAvaliacaoColecao,StatusAvaliacaoControle,ControleProvedorModelo,AvaliarControle) {
	var SolicitaAvaliacaoControle = Backbone.View.extend({
	
		initialize: function() {
			this.pessoa = null;
			this.model = new ModeloAvaliacaoModelo();
			this.collection = new ModeloAvaliacaoColecao();
		},
		
		
		render: function() {
			this.$el.html(_.template(template,{'collection': this.collection, 'model': this.model}));
			return this;
		},
		
		events: {
			"click .check-produtos": "selecionaModelo"
		},
		
		selecionaModelo: function(e){
	    	var produtos = new Array();
	    	$('.check-produtos').each(function(){
	    		if($('#' + $(this).attr('id')).is(':checked') == true){
	    			produtos.push($(this).attr('id'));
	    		}
			});
	    	if(produtos.length > 0){
	    		var modeloAvaliacaoColecao = new ModeloAvaliacaoColecao();
	    		for(var i = 0; i < produtos.length; i++){
	    			var codigo = 0;
	    			switch(produtos[i]) {
		    		    case 'crot':
		    		    	codigo = 195;
		    		        break;
		    		    case 'cartao':
		    		    	codigo = 796;
		    		        break;
		    		    case 'CDC':
		    		    	codigo = 400;
		    		        break;
		    		}
	    			var modeloAvaliacao = new ModeloAvaliacaoModelo();
	    			modeloAvaliacao.set('codigo',codigo);
	    			modeloAvaliacaoColecao.add(modeloAvaliacao);
	    		}
	    		this.exibeAvaliar(modeloAvaliacaoColecao);
	    	}else{
	    		$('#divAvaliar').html('');
	    	}
	    },
	    exibeAvaliar: function(modeloAvaliacaoColecao){
	    	var self = this;
        	this.controleProvedor = new ControleProvedorModelo();
        	this.controleProvedor.url = "rest/risco/controleavaliacao/verificaprovedor/" + this.pessoa.get('codigo');
        	reiniciaContadorSessao();
        	this.controleProvedor.fetch({
        		success: function(data, response) {
        			if (data.get('processo') != null && data.get('processo') != ''){
        				if (data.get('situacao') == 7){
        					self.consultaAvaliacao.carregaAvalicao(1);
        				}
        				self.statusAvaliacao = new StatusAvaliacaoControle();
        				self.statusAvaliacao.pessoa = self.pessoa;
        				self.statusAvaliacao.model = data;
    					$('#divAvaliar').html(self.statusAvaliacao.render().el);
    					$('#exibeHintProcesso').removeClass('hide');
    					self.statusAvaliacao.verificaStatus(data.get('codigoPessoa'));
        			}else{
        				if(modeloAvaliacaoColecao != null){
        					var avaliar = new AvaliarControle();
            				avaliar = new AvaliarControle();
        					avaliar.pessoa = self.pessoa;
        					avaliar.modelo = self.modelo;
        					avaliar.modeloAvaliacaoColecao = modeloAvaliacaoColecao;
    	            		$('#divAvaliar').html(avaliar.render().el);
    	            		avaliar.carregaAvaliacaoControle();
        				}
        			}
        		},
	            error: $caixa.trataErro
        	});
	    }
	});
	return SolicitaAvaliacaoControle;
});
