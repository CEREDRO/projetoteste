define([
	'text!servicos/risco/visao/grupolimite.html',
	'bootstrap',
	'ajaxStatus',
	'servicos/risco/controle/CabecalhoLimiteControle',
	'servicos/risco/controle/CampoLimiteControle'
], function(template, Bootstrap, AjaxStatus,CabecalhoLimiteControle,CampoLimiteControle) {
	var GrupoLimiteControle = Backbone.View.extend({
		initialize: function(model, options){
			CampoLimiteControle = options.campovw;
		},
		render: function() {
			this.$el.html(_.template(template, this.model.attributes));
			
			//Renderizo o cabecalho
			var cabecalhocontrole = new CabecalhoLimiteControle({model: this.model.get("cabecalhos")});
			this.$("#operacoesLimites").prepend(cabecalhocontrole.render().el);
			
			//Renderizo os campos
			this.$("#camposLimites").html("");
			this.model.get("operacoes").each(function(operacao){
				if (operacao.get("campos").length > 0){
					var campocontrole = new CampoLimiteControle({model: operacao.get("campos")}, {cabecalhos: this.model.get("cabecalhos"), grupo: operacao});
					this.$("#camposLimites").append(campocontrole.render().el);
				}
			}, this);
			
			return this;
		}
	});
	return GrupoLimiteControle;
});