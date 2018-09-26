define([
	'text!servicos/risco/visao/relacionamento.html',
	'bootstrap',
	'ajaxStatus',
	'servicos/risco/modelo/RelacionamentoModelo',
	'servicos/risco/colecao/PessoaColecao',
	'servicos/risco/modelo/PerguntaRelacionamentoModelo',
	'comum/MascaraController'
], function(template, Bootstrap, AjaxStatus,RelacionamentoModelo,PessoaColecao,PerguntaRelacionamentoModelo,MascaraController) {
	var RelacionamentoControle = Backbone.View.extend({
	
		initialize: function() {
			this.mascara = new MascaraController();
			this.model = new RelacionamentoModelo();
			this.pessoa = null;
			this.pergunta = null;
			this.acao = null;
			this.inicio = null;
			this.fim = null;
			this.valor = null;
			this.subPergunta = 0;
		},
		
		render: function() {
			this.$el.html(_.template(template,{'model': this.model,'pessoa': this.pessoa,'parm': this}));
			this.mascara.loadMask();
			return this;
		},
		
		events: {
			"keyup #pesqnuCpfCnpj": "localizaAutomatico",
			"click #btnOkRel": "perciste",
			"click #btnLocPessoaRel": "retornaCandidatos",
			"click tr": "selecionaPessoa"
		},
		
		carregaDados: function(){
			var self = this;
			this.pessoa = new PessoaColecao();
			if (this.acao == "A"){
				this.model.url = "rest/risco/relacionamento/" + this.model.get('codigo') + "," + this.model.get('codigoPessoa');
				reiniciaContadorSessao();
				this.model.fetch({
					success: function(model, response) {
						model.set('validadeDataInicio',self.strToDate(model.get('validadeDataInicio')));
						model.set('validadeDataTermino',self.strToDate(model.get('validadeDataTermino')));
						model.set('valor',(model.get('valor') * 100));
						self.model = model;
						self.pessoa.url = "rest/risco/relacionamento/localiza/" + self.pergunta + "," + self.model.get('pessoaReciproca').toString();
						self.pessoa.fetch({
							success: function(pessoa, response) {
								self.pessoa = pessoa;
								self.render();								
								$('#relacionamento').modal('show');
							},
							error: $caixa.trataErro
						});
					},
					error: $caixa.trataErro
				});
			}else{
				var self = this;
				this.perguntaRelacionamento = new PerguntaRelacionamentoModelo();
				this.perguntaRelacionamento.url = "rest/risco/relacionamento/pergunta/" + this.pergunta;
				reiniciaContadorSessao();
				this.perguntaRelacionamento.fetch({
					success: function(pergunta, response) {
						self.model.set('codigo',0);
						self.model.set('papel',pergunta.get('papel'));
						self.model.set('papelReciproco',pergunta.get('papelReciproco'));
						self.model.set('pessoaReciproca',0);
						var tipoRelacionamento = {
								codigo : pergunta.get('tipoRelacionamento').codigo,
								denominacao: null, 
								descricao: pergunta.get('pergunta').descricao,
								dataAtualizacao: null
						};
						self.model.set('tipoRelacionamento',tipoRelacionamento);
						self.model.set('validadeDataInicio',self.strToDate(self.getDate()));
						self.model.set('validadeDataTermino',self.strToDate(self.getDate()));
						self.model.set('valor',0);
						self.model.set('dataHomologacao',self.getDate());
						self.model.set('dataCadastramento',self.getDate());
						self.model.set('dataCancelamento',self.getDate());
						self.pessoa[0] = {
							codigo: null,
							nome: null,
							tipo: null,
							dataInicio: null,
							usuarioHomologacao: null,
							dataHomologacao: null,
							numeroEmpreendimento: null,
							dataAtualizacao: null,
							validacaoEfetuada: null,
							procBatch: null,
							codigoClienteCaixa: null,
							numeroParametrizacao: null,
							tempoPesquisa: null
						};
						if(self.subPergunta != 0){
							self.pessoa.url = "rest/risco/relacionamento/subpergunta/" + self.model.get('codigoPessoa') + ',' + self.subPergunta;
							self.pessoa.fetch({
								success: function(pessoa, response) {
									self.pessoa = pessoa;
									self.render();
									$('#relacionamento').modal('show');
								},
								error: $caixa.trataErro
							});
						}else{
							self.render();
							$('#relacionamento').modal('show');
						}
					},
					error: $caixa.trataErro
				});
			}
		},
		
		retornaCandidatos: function(){
			var self = this;
			if(($('#pesqnuCpfCnpj').val() != null && $('#pesqnuCpfCnpj').val() != "") || self.subPergunta=='121'){
				$('#relacionamento').modal('hide');
				var informacaoDePesquisa = ""; 
				if($('#pesqnuCpfCnpj').val() == null || $('#pesqnuCpfCnpj').val() == ""){
					informacaoDePesquisa = '\%20';
				}
				else{
					informacaoDePesquisa = $('#pesqnuCpfCnpj').val();
				}
				this.pessoa.url = "rest/risco/relacionamento/localiza/" + self.pergunta + "," + informacaoDePesquisa;
				reiniciaContadorSessao();
				this.pessoa.fetch({
					success: function(pessoa, response) {
						self.pessoa = pessoa;
						self.render();
						$('#relacionamento').modal('show');
					},
					error: $caixa.trataErro
				});
			}
		},
		selecionaPessoa: function(e){
			this.model.set('pessoaReciproca',e.currentTarget.id);
			$('tr').removeClass('success');
			$('#' + e.currentTarget.id).addClass("success");
		},
		perciste: function(){
			if (this.model.get("pessoaReciproca") > 0) {
				$('#btnOkRel').attr('disabled','disabled');
				var self = this;
				var novo = "V";
				if (this.model.get('codigo') == null || this.model.get('codigo') == 0){
					novo = "N";
				}
				
				if ($('#inpDtInicio').val() != null && $('#inpDtInicio').val() != "" && $('#inpDtInicio').val() != "__/__/____"){
					this.model.set('validadeDataInicio',this.dateToStr($('#inpDtInicio').val()));
				}else{
					this.model.set('validadeDataInicio',null);
				}
				if ($('#inpDtFim').val() != null && $('#inpDtFim').val() != "" && $('#inpDtFim').val() != "__/__/____"){
					this.model.set('validadeDataTermino',this.dateToStr($('#inpDtFim').val()));
				}else{
					this.model.set('validadeDataTermino',null);
				}
				
				if ($('#inpValor').val() != null && $('#inpValor').val() != ""){
					this.model.set('valor',$('#inpValor').val().replace('.','').replace('.','').replace('.','').replace('.','').replace('.','').replace('.','').replace(',','.'));
				}
				
				this.model.url = 'rest/risco/relacionamento';
				reiniciaContadorSessao();
				this.model.save(undefined,{
		            success: function(model, response) {
		            	$('#relacionamento').modal('hide');
		            	self.trigger('success','R',model.get('codigo'),novo);
		            },
		            error: $caixa.trataErro
				});
			}
		},
		remove: function(){
			var self = this;
			this.model.url = "rest/risco/relacionamento/" + this.model.get('codigo') + "," + this.model.get('codigoPessoa');
			reiniciaContadorSessao();
			this.model.fetch({
				success: function(model, response) {
					self.model = model;
					self.model.url = "rest/risco/relacionamento/" + self.model.get('codigo');
					self.model.save(undefined,{
						success: function() {
							 self.trigger('success');
						 },
						 error:  $caixa.trataErro
					});
				},
				error:  $caixa.trataErro
			});
		},
		getDate: function(){
			var data = new Date();
			var dia = data.getDate() + "";
			if(dia.length == 1){
				dia = "0" + dia;
			}
			var mes = (data.getMonth() + 1) + "";
			if(mes.length == 1){
				mes = "0" + mes;
			}
			return data.getFullYear() + "-" +  mes + "-" + dia;
		},
		strToDate: function(value){
			if (value != null){
				return value.substring(8,10) + /*"/" +*/ value.substring(5,7) + /*"/" +*/ value.substring(0, 4);
			}else{
				return value;
			}
			
		},
		dateToStr: function(value){
			if (value != null && value != ""){
				return value.substring(6,10) + '-' + value.substring(3,5) + '-' + value.substring(0,2);
			}else{
				return "1900-01-01";
			}
		},
		localizaAutomatico: function(e){
			if (e.keyCode == 13){
				this.retornaCandidatos();
			}
		}
	});
	return RelacionamentoControle;
});