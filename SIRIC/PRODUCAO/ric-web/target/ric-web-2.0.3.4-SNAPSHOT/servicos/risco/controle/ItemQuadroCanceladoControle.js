define([
	'text!servicos/risco/visao/itemquadrocancelado.html',
	'bootstrap',
	'ajaxStatus', 
	'servicos/risco/modelo/ItemQuadroModelo',
	'comum/MascaraController'
], function(template, Bootstrap, AjaxStatus,ItemQuadroModelo,MascaraController) {
	var ItemQuadroCanceladoControle = Backbone.View.extend({ 
	
		initialize: function() {
			this.model = new ItemQuadroModelo();
			this.mascara = new MascaraController();
		},
		
		render: function() {
			this.$el.html(_.template(template,{'model': this.model}));
			return this;
		},
		
		carregaDados: function(){
			var self = this;
			this.model.fetch({
				success: function(model, response) {
					if(model.get('listaItemDemonstrativo') == null){
						alert('Este Relacionamento não possui Quadro de Valor!');
						return;
					}
					if (model.get('anoReferencia') != null){
						model.set('anoReferencia',self.strToDate(model.get('anoReferencia')));
					}
					self.model = model;
					self.render();
					self.mascara.loadMask();
					$(".data").each(function(){
					   if ($(this).val() == null || $(this).val() == ""){
						   $(this).val("01/01/1900");
					   }
					});
					$('#itemQuadro').modal('show');
				},
				error: $caixa.trataErro
			});
		},
		strToDate: function(value){
			if (value != null){
				return value.substring(8,10) + "/" + value.substring(5,7) + "/" + value.substring(0, 4);
			}else{
				return value;
			}
			
		},
		dateToStr: function(value){
			if (value != null && value != ""){
				return value.substring(6,10) + '-' + value.substring(3,5) + '-' + value.substring(0,2);
			}else{
				return "1900-01-01";
			}
			
		}
	});
	return ItemQuadroCanceladoControle;
});