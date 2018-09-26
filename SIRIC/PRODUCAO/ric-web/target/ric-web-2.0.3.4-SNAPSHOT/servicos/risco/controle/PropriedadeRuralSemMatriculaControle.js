define([
	'text!servicos/risco/visao/ruralsemmatricula.html',
	'bootstrap',
	'ajaxStatus',
	'servicos/risco/controle/ListaEstadoControle',
	'servicos/risco/controle/ListaMunicipioControle'
], function(template, Bootstrap, AjaxStatus,ListaEstadoControle,ListaMunicipioControle) {
	var PropriedadeRuralSemMatriculaControle = Backbone.View.extend({
		initialize: function(options){
			this.acao = options.acao;
			this.ufselecionado = null;
		},
		events: {
			"click #uf": "listaMunicipios",
			"change input": "atualizaModelo",
			"change select": "atualizaModelo"
		},
		render: function() {
			this.$el.html(_.template(template,{'model': this.model, 'acao': this.acao}));
			
			
			if (this.model.get("municipio") != null){
				if (this.model.get("municipio").codigo > 0){
					this.ufselecionado = this.model.get("municipio").estado.codigo;
					
					var listamunicipiocontrole = new ListaMunicipioControle(undefined, {pessoauf: this.ufselecionado, municipioselecionado: this.model.get("municipio").codigo});
					this.$("#listaCidades").html(listamunicipiocontrole.render().el);
				}
			}
			
			var listaestadocontrole = new ListaEstadoControle(undefined, {ufselecionado: this.ufselecionado});
			this.$("#listaUF").html(listaestadocontrole.render().el);
			
			return this;
		},
		atualizaModelo: function(e) {
			if (this.acao == 'CADASTRAR' | ($caixa.permissoes.hasObjeto(204) || $caixa.permissoes.hasObjeto(205))){
				this.model.set('nome',this.$('#noPropriedade').val());
			}
			
			if (this.acao == 'CADASTRAR' | $caixa.permissoes.hasObjeto(205)){
				if (this.model.get("municipio") == null){
					this.model.set("municipio",{codigo: null, nome: null});
				}
				this.model.get("municipio").codigo = this.$('#municipio :selected').val();
				this.model.get("municipio").nome = this.$('#municipio :selected').text();
				this.model.set('cpfcnpjresponsavel', this.$('#cpfcnpjResp').val());
			}
		},
		listaMunicipios: function(e){
			if (e.target.value > 0) {
				var listamunicipiocontrole = new ListaMunicipioControle(undefined, {pessoauf: e.target.value});
				this.$("#listaCidades").html(listamunicipiocontrole.render().el);
			}
		}
	});
	return PropriedadeRuralSemMatriculaControle;
});