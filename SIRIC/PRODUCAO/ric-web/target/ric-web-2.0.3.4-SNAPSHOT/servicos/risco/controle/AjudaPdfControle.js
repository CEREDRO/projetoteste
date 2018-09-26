define([
	'text!servicos/risco/visao/ajudapdf.html',
	'bootstrap',
	'ajaxStatus'
], function(template, Bootstrap, AjaxStatus) {
	var AjudaPdfControle = Backbone.View.extend({
	
		initialize: function() {
			this.model = null;
		},
		
		render: function() {
			this.$el.html(_.template(template,{'model': this.model}));
			return this;
		}
	});
	return AjudaPdfControle;
});