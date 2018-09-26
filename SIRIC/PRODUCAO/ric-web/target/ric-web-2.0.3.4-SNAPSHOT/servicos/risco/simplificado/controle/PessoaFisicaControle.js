define([
	'text!servicos/risco/simplificado/visao/pessoafisica.html',
	'bootstrap',
	'ajaxStatus',
	'servicos/risco/modelo/PessoaFisicaModelo',
	'servicos/risco/modelo/LocalizarPessoasModelo'
], function(template, Bootstrap, AjaxStatus,PessoaFisicaModelo,LocalizarPessoasModelo) {
	var PessoaFisicaControle = Backbone.View.extend({
			
		tagName: 'div',		
		
		initialize: function() {
			this.model = new PessoaFisicaModelo();
		},
		
		render: function() {
			this.$el.html(_.template(template,this.model.attributes));
			if (this.model.get('sicli') == null){
				this.virificaSICLI();
			}else{
				this.trigger('success');
			}
			return this;
		},
		
		virificaSICLI: function(){
			var self = this;
			var localizaPessoa = new LocalizarPessoasModelo();
			localizaPessoa.set('cpfCnpj',this.model.get('pessoaCpf').replace('.','').replace('.','').replace('-','').replace('/','').trim());
			localizaPessoa.set('tipo',0);
			localizaPessoa.url = "rest/risco/pessoas/verificasicli/" + this.model.get('pessoaCpf').replace('.','').replace('.','').replace('-','').replace('/','').trim() + ",0";
			reiniciaContadorSessao();
			localizaPessoa.fetch({
	            success: function(data, response) {
	            	self.model = data;
	            	self.render();
	            },
	            error: function(model, response) {
	            	console.log(response.responseText);
	            }
			});
		}
	});
	return PessoaFisicaControle;
});