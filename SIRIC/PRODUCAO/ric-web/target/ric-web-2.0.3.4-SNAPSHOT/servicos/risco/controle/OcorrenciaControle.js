define([
	'text!servicos/risco/visao/ocorrencia.html',
	'bootstrap',
	'ajaxStatus',
	'servicos/risco/modelo/OcorrenciaModelo',
	'servicos/risco/colecao/GradacaoColecao',
	'comum/MascaraController'
], function(template, Bootstrap, AjaxStatus,OcorrenciaModelo,GradacaoColecao,MascaraController) {
	var OcorrenciaControle = Backbone.View.extend({
	
		initialize: function() {
			this.mascara = new MascaraController();
			this.pessoa = null;
			this.acao = null;
			this.inicio = null;
			this.fim = null;
			this.model = new OcorrenciaModelo();
			this.gradacao = new GradacaoColecao();
		},
		
		render: function() {
			this.$el.html(_.template(template,{'gradacao': this.gradacao,'model': this.model}));
			return this;
		},
		
		events: {
			"click tr": "perciste"
		},
		
		carregaDados: function(){
			$('#ocorrencia').modal('hide');
			var self = this;
			this.gradacao.url = 'rest/risco/ocorrencia/' + this.model.get('tipoOcorrencia').codigo;
			reiniciaContadorSessao();
			this.gradacao.fetch({
				success: function(model, response) {
					self.gradacao = model;
					if (self.acao == "A"){
						self.model.fetch({
				            success: function(model, response) {
				            	if (self.inicio == 0){
				            		model.set('validadeDataInicio',self.strToDate(model.get('validadeDataInicio')));
				            	}
				            	if (self.fim == 0){
				            		model.set('validadeDataTermino',self.strToDate(model.get('validadeDataTermino')));
				            	}
				            	self.model = model;
				            	self.render();
				            	if (model.get('gradacao') != null){
				            		$('#' + model.get('gradacao').codigo).addClass('info');
				            	}
				            	if (self.inicio == 1){
				            		$('#icExibeIni').remove();
				            	}
				            	if (self.fim == 1){
				            		$('#icExibeFim').remove();
				            	}
				            	if (self.inicio == 1 && self.fim == 1){
				            		$('#separaOcorrencia').remove();
				            	}
				            	self.mascara.loadMask();
				            	$('#ocorrencia').modal('show');
				            },
				            error: $caixa.trataErro
						});
					}else{
						self.render();
		            	if (self.inicio == 1){
		            		$('#icExibeIni').remove();
		            	}
		            	if (self.fim == 1){
		            		$('#icExibeFim').remove();
		            	}
		            	if (self.inicio == 1 && self.fim == 1){
		            		$('#separaOcorrencia').remove();
		            	}
		            	self.mascara.loadMask();
		            	$('#ocorrencia').modal('show');
					}
	            },
	            error: $caixa.trataErro
			});
		},
		
		strToDate: function(value){
			if (value != null){
				return value.substring(8,10) + "/" + value.substring(5,7) + "/" + value.substring(0, 4);
			}else{
				return value;
			}
			
		},
		dateToStr: function(value){
			if (value != null && value != ""){
				return value.substring(6,10) + '-' + value.substring(3,5) + '-' + value.substring(0,2);
			}else{
				return null;
			}
			
		},
		perciste: function(e){
			$('#' + e.currentTarget.id).attr( "disabled", "disabled");
			var self = this;
			var gradacao = this.model.get('gradacao');
			if (gradacao == null){
				gradacao = {
					codigo: null
				};
			}
			gradacao.codigo = e.currentTarget.id;
			this.model.set('validadeDataInicio',this.dateToStr($('#dtIniVal').val()));
			this.model.set('validadeDataTermino',this.dateToStr($('#dtFinVal').val()));
			this.model.set('gradacao',gradacao);
			this.model.url = 'rest/risco/ocorrencia';
			reiniciaContadorSessao();
			this.model.save(undefined,{
	            success: function(model, response) {
	            	$('#ocorrencia').modal('hide');
	            	self.trigger('success','O',0,'V');
	            },
	            error: $caixa.trataErro
			});
		},
		remove: function(){
			var self = this;
			reiniciaContadorSessao();
			this.model.fetch({
				 success: function(model, response) {
					 self.model.url = "rest/risco/ocorrencia/" + model.get('codigoPessoa');
					 self.model.save(undefined,{
						 success: function() {
							 self.trigger('success');
						 },
						 error:  $caixa.trataErro
					 });
		         },
		         error: $caixa.trataErro
			});
		}
	});
	return OcorrenciaControle;
});