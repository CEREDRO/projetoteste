define([
	'text!servicos/risco/visao/pessoaconsultada.html',
	'servicos/risco/controle/ListaPessoaConsultadaControle',
], function(template,ListaPessoaConsultadaControle) {
	var PessoaConsultadaControle = Backbone.View.extend({
		render: function() {
			this.$el.html(_.template(template));
			
			this.model.each(function(pessoa, i){
				lista = new ListaPessoaConsultadaControle({model: pessoa, template: "main"});
				
				if (i <= 5){
					this.$('#dadosPessoasConsultadas1').append(lista.render());
				} else {
					this.$('#dadosPessoasConsultadas2').append(lista.render());
				}
			}, this);
			
			return this.$el;
		}
	});
	return PessoaConsultadaControle;
});