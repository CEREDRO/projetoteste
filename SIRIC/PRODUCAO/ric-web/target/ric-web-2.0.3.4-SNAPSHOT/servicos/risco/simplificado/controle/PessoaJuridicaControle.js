define([
	'text!servicos/risco/visao/pessoajuridica.html',
	'bootstrap',
	'ajaxStatus',
	'servicos/risco/modelo/PessoaJuridicaModelo',
	'servicos/risco/modelo/RelatorioAvaliacaoModelo',
	'servicos/risco/modelo/LocalizarPessoasModelo'
], function(template, Bootstrap, AjaxStatus,PessoaJuridicaModelo,RelatorioAvaliacaoModelo,LocalizarPessoasModelo) {
	var PessoaJuridicaControle = Backbone.View.extend({
	
		tagName: 'div',
		
		initialize: function() {
			this.model = new PessoaJuridicaModelo();
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
		
		events: {
			"click #btnPjRelAvaliacao": "exibeRelatorio",
			"click #atualizaPjSICLI": "atualizaSICLI"				
		},
		
		exibeRelatorio: function(e){
			if ($(e.target).data('avaliacaoid') == 0){
				alert("Não Passui Avaliação");
			}else{
				var codigoAvaliacao = $(e.target).data('avaliacaoid');
				this.relatorio = new RelatorioAvaliacaoModelo();
				this.relatorio.set('codigoAvaliacao',codigoAvaliacao);
				reiniciaContadorSessao();
				this.relatorio.fetch({
		            success: function(relatorio, response){
		            	console.log(relatorio);
		            	var LeftPosition = (screen.width) ? (screen.width-800)/2 : 0;
						var TopPosition = 50/*(screen.height) ? (screen.height-800)/2 : 0*/;
						var settings = 'height = 600 , width = 800, titlebar = no , location = no , directories = no , scrollbars=yes , top=' + TopPosition + ',left=' + LeftPosition + ',resizable';
						var myWindow = window.open("","",settings);
			        	myWindow.document.write(relatorio.get('descricao'));
			        	myWindow.focus();
		            },
		            error: $caixa.trataErro
				});
			}
		},
		virificaSICLI: function(){
			var self = this;
			var localizaPessoa = new LocalizarPessoasModelo();
			localizaPessoa.set('cpfCnpj',this.model.get('pessoaCnpj').replace('.','').replace('.','').replace('-','').replace('/','').trim());
			localizaPessoa.set('tipo',0);
			localizaPessoa.url = "rest/risco/pessoas/verificasicli/" + this.model.get('pessoaCnpj').replace('.','').replace('.','').replace('-','').replace('/','').trim() + ",0";
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
		},
		atualizaSICLI: function(){
			var self = this;
			var localizaPessoa = new LocalizarPessoasModelo();
			localizaPessoa.set('cpfCnpj',this.model.get('pessoaCnpj').replace('.','').replace('.','').replace('-','').replace('/','').trim());
			localizaPessoa.set('tipo',0);
			localizaPessoa.url = "rest/risco/pessoas/atualizasicli/" + this.model.get('pessoaCnpj').replace('.','').replace('.','').replace('-','').replace('/','').trim() + ",0";
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
	return PessoaJuridicaControle;
});
