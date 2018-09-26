define([
	'text!servicos/risco/visao/detalheavaliacaoautomatica.html',
	'servicos/risco/controle/SIRICUtilsControle',
	'servicos/risco/modelo/AvaliacaoAutomaticaModelo'
], function(template, SIRICUtilsControle, AvaliacaoAutomaticaModelo) {
	var DetalheAvaliacaoAutomaticaControle = Backbone.View.extend({
	
		initialize: function() {
			this.util = new SIRICUtilsControle();
		},
		
		render: function() {
			this.$el.html(_.template(template, this.model.attributes));
			return this;
		},
		events: {
	        "click #btn_imprimir_detalhe": "imprimir"
	    },
		imprimir: function(e){
			this.$("#modal-header").removeClass("modal-header");
			this.$("#modal-body").removeClass("modal-body");
			
			var LeftPosition = (screen.width) ? (screen.width-800)/2 : 0;
			var TopPosition = 50;
			var settings = 'height = 600 , width = 800, titlebar = no , directories = no , scrollbars=yes , top=' + TopPosition + ',left=' + LeftPosition + ',resizable';
	    	newWin = window.open("","", settings);
		    newWin.document.write($('head').html() + $('#detalheConsultaAvaliacaoAutomatica').html());
		    this.$("#modal-header").addClass("modal-header");
			this.$("#modal-body").addClass("modal-body");
		    newWin.focus();
		    newWin.moveTo(0, 0);
		    newWin.resizeTo(screen.width, screen.height);
		    
		    setTimeout(function(){
		 	  newWin.print();
		      newWin.close();
		    }, 1000);
		}
	});
	return DetalheAvaliacaoAutomaticaControle;
});
	
