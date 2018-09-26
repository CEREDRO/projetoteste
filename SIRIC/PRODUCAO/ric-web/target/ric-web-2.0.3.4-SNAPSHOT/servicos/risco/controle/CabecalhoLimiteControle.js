define([
	'text!servicos/risco/visao/cabecalholimite.html',
	'bootstrap',
	'ajaxStatus'
], function(template, Bootstrap, AjaxStatus) {
	var CabecalhoLimiteControle = Backbone.View.extend({
		tagName: "thead",
		initialize: function(model, options){
			this.model.each(function(cabecalho){
				cabecalho.set({classe: "text-center"});
			});
			
			if (this.model.length > 0) {
				this.model.first().set({classe: "text-left"});
			}
		},
		render: function() {
			var json = JSON.parse(JSON.stringify(this.model));
			
			this.$el.html(_.template(template, {'cabecalhos': json}));

			return this;
		}
	});
	return CabecalhoLimiteControle;
});