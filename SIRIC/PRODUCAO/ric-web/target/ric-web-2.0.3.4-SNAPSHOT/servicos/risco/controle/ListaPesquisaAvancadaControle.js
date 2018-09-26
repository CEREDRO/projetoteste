define([
	'text!servicos/risco/visao/listapesquisaavancada.html',
	'servicos/risco/modelo/PessoaModelo',
	'servicos/risco/controle/PessoaControle'
], function(template,PessoaModelo,PessoaControle) {
	var ListaPesquisaAvancadaControle = Backbone.View.extend({
		tagName: 'tr',
		className: 'rowOffPesq',
		initialize: function(){
			/*
			 * apresentaMatricula é recebido ao instanciar
			 */
			this.apresentaMatricula = apresentaMatricula;
		},
		render: function() {
			this.$el.html(_.template(template,{'model': this.model, 'apresentaMatricula': this.apresentaMatricula}));
			return this.$el;
		},
		events: {
			"click": "consultaCliente",
		},
		consultaCliente: function(){
			pessoa = new PessoaModelo(JSON.parse(JSON.stringify(this.model)));
			
			pessoa.fetch({
	            success: function(model, response) {
	            	$('#pesquisaAvancada').modal('hide');
	            	$caixa.util.limparDivsDashboard();
	            	consultaPessoa = new PessoaControle({model: model});
	            	$('#divDadosGerais').html(consultaPessoa.render());
	            },
	            error: function(model, response) {
	            	options = {
	            		container: "errorsContainer",
	            		view: _viewPesquisaAvancada,
	            		close: true
			        };
	            	
	            	$caixa.util.adicionarMensagemNegocialContainer(response.responseJSON, options);
	            }
	        });
		}
	});
	return ListaPesquisaAvancadaControle;
});