define([
	'text!servicos/risco/visao/avaliacaoautomatica.html',
	'servicos/risco/controle/SIRICUtilsControle',
	'servicos/risco/controle/DetalheAvaliacaoAutomaticaControle',
	'servicos/risco/modelo/AvaliacaoAutomaticaModelo'
], function(template, SIRICUtilsControle, DetalheAvaliacaoAutomaticaControle, AvaliacaoAutomaticaModelo) {
	var AvaliacaoAutomaticaControle = Backbone.View.extend({
	
		initialize: function() {
			this.util = new SIRICUtilsControle();
		},
		
		render: function() {
			this.$el.html(_.template(template, {'colecao': this.model}));
			return this;
		},
		events: {
	        "click #detalheAvaliacaoAutomatica": "detalheAvaliacaoAutomatica",
	        "click #tipoConsulta": "carregaTipoConsulta",
	        "click #tipoParm": "carregaParametro",
	        "click #btn_imprimir_consulta": "imprimir"
	    },
	    detalheAvaliacaoAutomatica: function(e){
	    	var tipopessoa = $(e.currentTarget).data('tipopessoa');
	    	var cpfcnpj = $(e.currentTarget).data('cpfcnpj');
	    	var datamovimento = $(e.currentTarget).data('datamovimento');

	    	avaliacaoautomaticamodelo = new AvaliacaoAutomaticaModelo();
	    	avaliacaoautomaticamodelo.url = "rest/risco/avaliacaoautomatica/" + tipopessoa + "," + cpfcnpj + "," + datamovimento;
	    	
	    	avaliacaoautomaticamodelo.fetch({
	            success: function(model, response) {
	            	if (model) {
	            		var detalhe = new DetalheAvaliacaoAutomaticaControle({model: model});
		            	this.$('#detalheConsultaAvaliacaoAutomatica').html(detalhe.render().el);
		            	$('#detalheConsultaAvaliacaoAutomatica').modal('show');
	            	} else {
	            		alert("Nenhum registro encontrado.");
	            	}
	            },
	            error: function(collection, response) {
	            	console.log(response.responseText);
	            }
	        }, this);
		},
		imprimir: function(e){
			$("#cabecalho").removeClass("hidden");
			
			var LeftPosition = (screen.width) ? (screen.width-800)/2 : 0;
			var TopPosition = 50;
			var settings = 'height = 600 , width = 800, titlebar = no , directories = no , scrollbars=yes , top=' + TopPosition + ',left=' + LeftPosition + ',resizable';
	    	newWin = window.open("","", settings);
		    newWin.document.write($('head').html() + $('#resultadoConsultaAvaliacaoAutomatica').html());
		    newWin.focus();
		    newWin.moveTo(0, 0);
		    newWin.resizeTo(screen.width, screen.height);
		    setTimeout(function(){
		 	  newWin.print();
		      newWin.close();
		    }, 1000);
		    
		    $("#cabecalho").addClass("hidden");
		}
	});
	return AvaliacaoAutomaticaControle;
});
	
