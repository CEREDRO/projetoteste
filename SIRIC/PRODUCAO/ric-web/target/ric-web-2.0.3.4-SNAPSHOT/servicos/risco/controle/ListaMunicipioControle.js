define([
	'text!servicos/risco/visao/listamunicipio.html',
	'bootstrap',
	'ajaxStatus',
	'servicos/risco/colecao/MunicipioColecao'
], function(template, Bootstrap, AjaxStatus,MunicipioColecao) {
	var ListaMunicipioControle = Backbone.View.extend({
		initialize: function(model, options){
			this.model = new MunicipioColecao();
			this.model.pessoauf = options.pessoauf;
			this.municipioselecionado = options.municipioselecionado;
		},
		render: function() {
			var self = this;
			
			this.model.fetch({
				success: function(collection, response) {
					self.$el.html(_.template(template,{'colecao': collection}));
					self.$("#municipio-"+self.municipioselecionado).prop("selected", true);
	            },
	            error: $caixa.trataErro
			}, this);
			
			return this;
		},
	});
	return ListaMunicipioControle;
});