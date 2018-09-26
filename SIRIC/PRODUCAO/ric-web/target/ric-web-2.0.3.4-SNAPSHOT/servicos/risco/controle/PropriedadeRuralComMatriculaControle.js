define([
	'text!servicos/risco/visao/ruralcommatricula.html',
	'bootstrap',
	'ajaxStatus',
	'servicos/risco/modelo/PropriedadeRuralModelo'
], function(template, Bootstrap, AjaxStatus,PropriedadeRuralModelo) {
	var PropriedadeRuralComMatriculaControle = Backbone.View.extend({
		initialize: function(options){
			this.acao = options.acao;
		},
		events: {
			"change input": "atualizaModelo"
		},
		render: function() {
			this.$el.html(_.template(template,{'model': this.model, 'acao': this.acao}));
			return this;
		},
		atualizaModelo: function(e) {
			if (this.acao == 'CADASTRAR' | ($caixa.permissoes.hasObjeto(204) || $caixa.permissoes.hasObjeto(205))){
				this.model.set('nome',this.$('#noPropriedade').val());
			}
			
			if (this.acao == 'CADASTRAR' | $caixa.permissoes.hasObjeto(205)){
				this.model.set('ccir',this.$('#coccir').val().replace(",","").replace(".","").replace(".","").replace(".","").replace("-",""));
				this.model.set('matricula',this.$('#coMatricula').val());
			}
		}
	});
	return PropriedadeRuralComMatriculaControle;
});