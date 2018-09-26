define([
	'text!servicos/risco/visao/dadoscancelados.html',
	'bootstrap',
	'ajaxStatus',
	'servicos/risco/colecao/DadosCanceladosColecao',
	'servicos/risco/controle/ItemQuadroCanceladoControle',
	'servicos/risco/modelo/PermissaoModelo'
], function(template, Bootstrap, AjaxStatus,DadosCanceladosColecao,ItemQuadroCanceladoControle,PermissaoModelo) {
	var DadosCanceladosControle = Backbone.View.extend({
	
		initialize: function() {
			this.pessoa = null;
			this.collection = new DadosCanceladosColecao();
		},
		
		render: function() {
			this.$el.html(_.template(template,{'collection': this.collection}));
			this.verificaObjectoBaseHistorica();
			return this;
		},
		
		events: {
			"click .reqvid"              : "exibeQuadroDetalhe",
			"click .reqvidbasehistorica" : "exibeQuadroDetalheBaseHistorica",
			"click #btnhist"             : "acessoBaseHistorica",
			"click #btnvolta"            : "carregaDadosCancelados"
		},
		
		carregaDadosCancelados: function(){
			var self = this;
			this.collection.url = "rest/risco/dadoscancelados/" + this.pessoa;
			reiniciaContadorSessao();
			this.collection.fetch({
	            success: function(collection, response) {
	        		self.collection = collection;
	            	self.render();
	            	$('#dadosCancelados').modal('show');
	            	$('#btnvolta').hide();
	            },
	            error: $caixa.trataErro
			});
		},
		exibeQuadroDetalhe: function(e){
			var value = $(e.target).data('valor');
			this.itemQuadro = new ItemQuadroCanceladoControle();
			this.itemQuadro.model.codigo = value;
			this.listenTo(this.itemQuadro, 'success', this.concluido);
			$('#divItemDetalhe').html(this.itemQuadro.render().el);
			this.itemQuadro.carregaDados();
		},
		exibeQuadroDetalheBaseHistorica: function(e){
			var value = $(e.target).data('valor');
			this.itemQuadro = new ItemQuadroCanceladoControle();
			this.itemQuadro.model.codigo = value;
			this.itemQuadro.model.url = "rest/risco/itemquadro/basehistorica/" + value;
			this.listenTo(this.itemQuadro, 'success', this.concluido);
			$('#divItemDetalhe').html(this.itemQuadro.render().el);
			this.itemQuadro.carregaDados();
		},
		acessoBaseHistorica: function(){
			var self = this;
			this.collection.url = "rest/risco/dadoscancelados/basehistorica/" + this.pessoa;
			reiniciaContadorSessao();
			this.collection.fetch({
	            success: function(collection, response) {
	        		self.collection = collection;
	            	self.render();
	            	
	            	$('#dadosCancelados').modal('show');
	            	$('.reqvid').removeClass('reqvid').addClass('reqvidbasehistorica');
	            	$('#btnhist').hide();
	            },
	            error: $caixa.trataErro
			});
		},
		verificaObjectoBaseHistorica: function(){
			this.permissao = new PermissaoModelo();
			this.permissao.url = "rest/risco/permissao/antiga/0,197";
			reiniciaContadorSessao();
			this.permissao.fetch({
				success: function(permissao, response) {
					if (permissao.get('codigo') != 1){
						$('#btnhist').hide();
					}
				},
	            error: $caixa.trataErro
			});
		}
	});
	return DadosCanceladosControle;
});