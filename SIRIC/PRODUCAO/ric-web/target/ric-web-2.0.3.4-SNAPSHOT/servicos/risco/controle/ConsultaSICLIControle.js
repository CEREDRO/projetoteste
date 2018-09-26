define([
	'text!servicos/risco/visao/consultasicli.html',
	'servicos/risco/modelo/ConsultaSICLIModelo'
], function(template,ConsultaSICLIModelo) {
	var ConsultaSICLIControle = Backbone.View.extend({
		initialize: function(options){
			_viewConsultaSICLI = this;
			this.pessoa = options.pessoa;
			this.count = 1;
			this.listenTo(this.model, 'change', this.render);
			this.timer = setInterval(this.verificaTimer, 2000);
		},
		render: function() {
			this.$el.html(_.template(template,this.model.attributes));
			return this.$el;
		},
		events: {
			"click #atualizar": "atualiza"
		},
		verificaTimer: function(){
			_viewConsultaSICLI.model.fetch({
        		success: function(model, response){  
        			_viewConsultaSICLI.count++;
        			
        			if(_viewConsultaSICLI.count > 30 | _viewConsultaSICLI.model.get("situacao") != 12){
        				clearInterval(_viewConsultaSICLI.timer);
        				
        				if (_viewConsultaSICLI.count > 30){
        					_viewConsultaSICLI.model.set({mensagem: "Tempo de Consulta no Cadastro.Caixa Expirado."});
        				}
        				
        				_viewConsultaSICLI.count = 1;
        				_viewConsultaSICLI.pessoa.set({procBatch: _viewConsultaSICLI.model.get("procBatch")});
        			}
        		},
        		error: function(model, response) {
        			clearInterval(_viewConsultaSICLI.timer);
 	            	$caixa.util.adicionarMensagemNegocialContainer(response.responseJSON);
        		}
			});
		},
		atualiza: function(timer){
			this.model.url = 'rest/risco/pessoas/atualizasicli/' + _viewConsultaSICLI.pessoa.get("codigo") + ',2';
			
			_viewConsultaSICLI.model.fetch({
        		success: function(model, response){ 
        			_viewConsultaSICLI.model.url = 'rest/risco/pessoas/verificasicli/' + _viewConsultaSICLI.pessoa.getNonFormmatedValue("cpfcnpj");
        			
        			clearInterval(_viewConsultaSICLI.timer);
        			_viewConsultaSICLI.timer = setInterval(_viewConsultaSICLI.verificaTimer, 2000);
        			
        			_viewConsultaSICLI.pessoa.set({procBatch: _viewConsultaSICLI.model.get("procBatch")});
        		},
        		error: function(model, response) {
 	            	$caixa.util.adicionarMensagemNegocialContainer(response.responseJSON);
        		}
			});
		}
	});
	return ConsultaSICLIControle;
});