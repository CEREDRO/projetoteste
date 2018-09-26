define([
	'text!servicos/risco/visao/listapessoaconsultadamain.html',
	'text!servicos/risco/visao/listapessoaconsultadapesq.html',
	'servicos/risco/modelo/PessoaModelo',
	'servicos/risco/modelo/TipoPessoaModelo',
	'servicos/risco/controle/PessoaControle',
], function(templatemain, templatepesq,PessoaModelo, TipoPessoaModelo, PessoaControle) {
	var ListaPessoaConsultadaControle = Backbone.View.extend({
		initialize: function(options){
			this.tipotemplate = options.template;
			this.superview = options.view;

			if (options.template == "main"){
				this.visao = templatemain;
			} else {
				this.visao = templatepesq;
			}
			
			_viewListaPessoaConsultada = this;
		},
		render: function() {
			this.setElement(_.template(this.visao,this.model.attributes));
			return this.$el;
		},
		events: {
			"click": "consultaCliente"
		},
		consultaCliente: function(e){	
			pessoa = new PessoaModelo();
			pessoa.set({
				codigo: this.model.get("cogioPessoa"),
				tipo: {codigo: this.model.get("tipo").codigo}
			}, this);
			
			pessoa.fetch({
	            success: function(model, response) {
	            	$('#pesquisaAvancada').modal('hide');
	            	$caixa.util.limparDivsDashboard();
	            	consultaPessoa = new PessoaControle({model: model});
	            	$('#divDadosGerais').html(consultaPessoa.render());
	            },
	            error: function(model, response) {
	            	options = null;
	            	
	            	if (_viewListaPessoaConsultada.tipotemplate == "pesq"){
	            		options = {
		            		container: "errorsContainer",
		            		view: _viewListaPessoaConsultada.superview,
		            		close: true
				        };
	            	}
	            	
	            	$caixa.util.adicionarMensagemNegocialContainer(response.responseJSON, options);
	            }
	        });
		}
	});
	return ListaPessoaConsultadaControle;
});