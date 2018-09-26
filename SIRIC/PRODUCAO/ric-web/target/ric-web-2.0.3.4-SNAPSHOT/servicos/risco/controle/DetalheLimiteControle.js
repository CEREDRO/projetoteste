define([
	'text!servicos/risco/visao/detalhelimite.html',
	'bootstrap',
	'ajaxStatus'
], function(template, Bootstrap, AjaxStatus) {
	var DetalheLimiteControle = Backbone.View.extend({
	
		render: function() {
			var json = JSON.parse(JSON.stringify(this.model));
			
			this.$el.html(_.template(template, {'colecao': json}));

			return this;
		}
	});
	return DetalheLimiteControle;
});