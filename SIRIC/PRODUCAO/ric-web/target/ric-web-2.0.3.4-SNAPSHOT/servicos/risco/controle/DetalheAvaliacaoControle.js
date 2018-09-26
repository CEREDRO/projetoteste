define([
	'text!servicos/risco/visao/detalheavaliacao.html',
	'bootstrap',
	'ajaxStatus',
	'servicos/risco/modelo/DetalheAvaliacaoModelo',
	'servicos/risco/modelo/AjudaModelo',
	'servicos/risco/controle/ConfirmacaoControle',
	'servicos/risco/modelo/PermissaoModelo'
], function(template, Bootstrap, AjaxStatus,DetalheAvaliacaoModelo,AjudaModelo,ConfirmacaoControle,PermissaoModelo) {
	var DetalheAvaliacaoControle = Backbone.View.extend({
	
		initialize: function() {
			this.reenvio = null;
			this.avaliacao = null;
			this.model = new DetalheAvaliacaoModelo();
			this.pessoaModel = null;
		},
		render: function() {
			this.$el.html(_.template(template,{'model': this.model,'pessoa': this.pessoaModel}));
			this.verificaObjecto();
			return this;
		},
		events: {
			"click #btnReenviaAval" : "verificaReenvioAvaliacao"
		},
		carregaDetalhe: function(value){
			var self = this;
			reiniciaContadorSessao();
			this.model.fetch({
	            success: function(model, response) {
	            	self.model = model;
	            	$('#divDetalheAvaliacao').html(self.render().el);
	            	$('#detalheAvaliacao').modal('show');
	            	if(value != null || (model.get('dataCancelamento') != null && model.get('dataCancelamento') != 'Não há')){
	            		$('#btnReenviaAval').hide();
	            	}
	            },
	            error: $caixa.trataErro
			});
		},
		verificaReenvioAvaliacao: function(e){
			var self = this;
			this.ajuda = new AjudaModelo();
			this.ajuda.url = "rest/risco/avaliacao/verificareenvio/" + $(e.target).data('avaliacao');
			reiniciaContadorSessao();
			this.ajuda.fetch({
	            success: function(ajuda, response) {
	            	var retorno = ajuda.get('descricao');
	            	if (retorno.substring(0,7) != 'Reenvio'){
	            		self.reenvio = retorno.substring(0,16);
	            		self.avaliacao = $(e.target).data('avaliacao');
	            		self.confirmacao = new ConfirmacaoControle();
	            		self.confirmacao.model.set('titulo','Reenvio de avaliação');
	            		self.confirmacao.model.set('conteudo',retorno.substring(16,retorno.length));
	            		self.listenTo(self.confirmacao, 'ok', self.reenviaAvaliacao);
	            		self.confirmacao.exibeConfirmacao();
	            	}else{
						alert(retorno);
					}
	            },
	            error: $caixa.trataErro
			});
		},
		reenviaAvaliacao: function(value){
			this.ajuda = new AjudaModelo();
			this.ajuda.url = "rest/risco/avaliacao/reenvio/" + this.avaliacao + "," + this.reenvio;
			reiniciaContadorSessao();
			this.ajuda.fetch({
	            success: function(ajuda, response) {
	            	alert(ajuda.get('descricao'));
	            },
	            error: $caixa.trataErro
			});
		},
		verificaObjecto: function(){
			this.permissao = new PermissaoModelo();
			this.permissao.url = "rest/risco/permissao/antiga/0,200";
			reiniciaContadorSessao();
			this.permissao.fetch({
				success: function(permissao, response) {
					if (permissao.get('codigo') != 1){
						$('#btnReenviaAval').hide();
					}
				},
	            error: $caixa.trataErro
			});
		}
	});
	return DetalheAvaliacaoControle;
});