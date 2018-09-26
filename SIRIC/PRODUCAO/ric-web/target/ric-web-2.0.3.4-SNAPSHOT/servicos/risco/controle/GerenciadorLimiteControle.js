define([
	'text!servicos/risco/visao/gerenciadorlimite.html',
	'bootstrap',
	'ajaxStatus',
	'servicos/risco/modelo/GerenciadorLimiteModelo',
	'servicos/risco/controle/DetalheLimiteControle',
	'servicos/risco/colecao/DetalheLimiteColecao',
	'servicos/risco/controle/CabecalhoLimiteControle',
	'servicos/risco/controle/CampoLimiteControle'
], function(template, Bootstrap, AjaxStatus,GerenciadorLimiteModelo,DetalheLimiteControle,DetalheLimiteColecao,CabecalhoLimiteControle,CampoLimiteControle) {
	var GerenciadorLimiteControle = Backbone.View.extend({
	
		render: function() {
			var json                 = JSON.parse(JSON.stringify(this.model.attributes));
			
			this.$el.html(_.template(template,json));
			
			//Renderizo os detalhes
			this.$("#detalheLimites").html('');
			var linha=null;
			var detalhelimitecolecao = this.model.get("detalhes");
			detalhelimitecolecao.each(function(detalhelimite){
				if (linha != detalhelimite.get("linha")) {
					var filtered = detalhelimitecolecao.filter(function (detalhe) {
			            return detalhe.get("linha") === detalhelimite.get("linha");
			        });
					
					var detalhecontrole = new DetalheLimiteControle({model: new DetalheLimiteColecao(filtered)});
					this.$("#detalheLimites").append(detalhecontrole.render().el);
					linha = detalhelimite.get("linha");
				}
				
				
				//detalhelimitecolecao.remove(filtered);
			}, this);
			
			//Renderizo o cabecalho
			var cabecalhocontrole = new CabecalhoLimiteControle({model: this.model.get("cabecalhos")});
			this.$("#grupoLimites").prepend(cabecalhocontrole.render().el);
			
			//Renderizo os campos
			this.$("#camposLimites").html("");
			this.model.get("grupos").each(function(grupo){
				if (grupo.get("campos").length > 0){
					var campocontrole = new CampoLimiteControle({model: grupo.get("campos")}, {cabecalhos: this.model.get("cabecalhos"), grupo: grupo});
					this.$("#camposLimites").append(campocontrole.render().el);
				}
			}, this);
			
			return this;
		}
	});
	return GerenciadorLimiteControle;
});