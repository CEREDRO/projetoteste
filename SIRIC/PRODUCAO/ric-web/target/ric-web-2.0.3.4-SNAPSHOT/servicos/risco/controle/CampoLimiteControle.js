define([
	'text!servicos/risco/visao/campolimite.html',
	'bootstrap',
	'ajaxStatus',
	'servicos/risco/controle/GrupoLimiteControle'
], function(template, Bootstrap, AjaxStatus,GrupoLimiteControle) {
	var CampoLimiteControle = Backbone.View.extend({
		tagName: "tr",
		className: "pointer",
		initialize: function(model, options){
			this.grupo = options.grupo;
			this.cabecalhos = JSON.parse(JSON.stringify(options.cabecalhos));
			
			this.model.each(function(campo){
				campo.set({classe: "text-center detalhe-limites"});
			});
			
			if (this.model.length > 0) {
				this.model.first().set({classe: "detalhe-limites"});
			}
		},
		events: {
			"click #grupo-formulario": "consultaOperacao"
		},
		render: function() {
			this.$el.html(_.template(template, {'campos': this.model, 'cabecalhos': this.cabecalhos}));

			return this;
		},
		consultaOperacao: function(e){
		    if (this.grupo.get("tipo") == 2) {
		    	if (this.grupo.get("operacoes").length > 0) {
		    		var grupolimitecontrole = new GrupoLimiteControle({model: this.grupo}, {campovw: CampoLimiteControle});
					$("#gerenciadorlimites-modal").html(grupolimitecontrole.render().el);
					$("#gerenciadorlimites-modal").modal('show');
		    	}
		    } else if (this.grupo.get("tipo") == 3) {
		    	$("#gerenciadorlimites-modal").modal('hide');
		    	$('#selModAvaliacao').val(this.model.filtro({campo: 'tipoMetadado', valor: 3}).get('metadado')).change();
		    	$caixa.util.scrollTo("#divSolicitaAvaliacao", -55);
		    }
		}
	});
	return CampoLimiteControle;
});