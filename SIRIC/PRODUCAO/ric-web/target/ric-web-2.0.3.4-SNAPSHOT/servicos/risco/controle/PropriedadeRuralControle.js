define([
	'text!servicos/risco/visao/propriedaderural.html',
	'bootstrap',
	'ajaxStatus',
	'servicos/risco/modelo/PropriedadeRuralModelo',
	'servicos/risco/controle/PropriedadeRuralComMatriculaControle',
	'servicos/risco/controle/PropriedadeRuralSemMatriculaControle',
	'comum/MascaraController',
], function(template, Bootstrap, AjaxStatus,PropriedadeRuralModelo,PropriedadeRuralComMatriculaControle,PropriedadeRuralSemMatriculaControle,MascaraController) {
	var PropriedadeRuralControle = Backbone.View.extend({
		
		initialize: function(options){
			this.view = null;
			this.acao = options.acao;
			this.mascara = new MascaraController();
		},
		render: function() {
			this.$el.html(_.template(template, this.model.attributes));
			if (this.model.get("tipo") == 2){
				this.model.set("tipo", 2);
				var ruralSemMatricula = new PropriedadeRuralSemMatriculaControle({model: this.model, acao: this.acao});
				this.$("#painelPropriedadeRural").html(ruralSemMatricula.render().el);
			} else {
				this.model.set("tipo", 1);
				var ruralComMatricula = new PropriedadeRuralComMatriculaControle({model: this.model, acao: this.acao});
				this.$("#painelPropriedadeRural").html(ruralComMatricula.render().el);
				
			}		
			return this;
		},
		
		afterRender: function(){
			this.mascara.loadMask();
			$('#cadastramentoPropriedadeRural').modal('show');
		},
		
		events: {
			"keyup #coMatricula": "isNumber",
			"blur #coccir": "validaCcir", 
			"keyup #cpfcnpjResp": "isNumber",
			"click #btnOkRural": "perciste",
			"click #closePropriedadeRural": "cancela",
			"click #btnCancelaPropriedadeRural": "cancela",
			"click #btncomMatricula": "renderizaComMatricula",
			"click #btnsemMatricula": "renderizaSemMatricula"
		},
		
		isNumber: function(evt) {
			var id = $(evt.target).attr('id');
			var value = $('#' + id).val();
			value = value.replace(/\D/g,"");
		    $('#' + id).val(value);
		},
		validaCcir: function(evt) {
			var id = $(evt.target).attr('id');
			var value = $('#' + id).val();
			value = value.replace(/_|\.|\-/gi ,"");
		    if (value.length < 13){
		    	$('#erroCoccir').show();
		    }else{
		    	$('#erroCoccir').hide();
		    }
		},
		
		perciste: function(){
			var self = this;
			var pessoaid = this.model.get("codigo");
			
			
			if (this.model.get("codigo") > 0){
				this.model.url = "rest/risco/pessoas/alterapropriedaderural/";
			} else {
				this.model.url = "rest/risco/pessoas/inserepropriedaderural/";
			}
			
			this.model.save(undefined,{
	            success: function(responsemodel, response) {
	            	if(responsemodel.get('codigo') == 0){
	            		alert('Propriedade Rural já cadastrada.');
	            		responsemodel.set({codigo: null});
	            	} else if (responsemodel.get('codigo') == 2) {
	            		alert('CPF/CNPJ não cadastrado!');
	            		responsemodel.set({codigo: null});
	                } else {
	            		$('#cadastramentoPropriedadeRural').modal('hide');
	            		alert('A sua gravação foi realizada com sucesso!');
	            		
	            		if (self.view == null){
		            		if(self.model.get("tipo") == 1){
		            			$('#inpParamPesqRural').val(self.model.get("matricula"));
		            			$('#inpParamPesq').val("");
		            		} else {
		            			$('#inpParamPesq').val(self.model.get("cpfcnpjresponsavel"));
		            			$('#inpParamPesqRural').val("");
		            		}
		            		
		            		$('#btnPesqAvancOk').trigger("click");
	            		} else {
	            			var propriedaderuralmodelo = new PropriedadeRuralModelo();
	            			
	            			propriedaderuralmodelo.url = propriedaderuralmodelo.urlRoot + pessoaid;
	            			
	        		    	propriedaderuralmodelo.fetch({
	        		            success: function(modeloatualizado, response) {
	        		            	self.view.model.set("matricula", modeloatualizado.get("matricula"));
	    	            			self.view.model.set("codigoPropriedade", modeloatualizado.get("ccir"));
	    	            			self.view.model.set("nome", modeloatualizado.get("nome"));
	    	            			self.view.model.set("municipio", modeloatualizado.get("municipio").nome);
	    	            			self.view.model.get("responsavel").nome = modeloatualizado.get("nomeresponsavel");
	    	            			
	    	            			var cpfcnpj = modeloatualizado.get("cpfcnpjresponsavel");
	    	            			
	    	            			
	    	            			if (cpfcnpj != null) {
		    	            			if (cpfcnpj.length == 11) {
		    	            				cpfcnpj = cpfcnpj.substring(0, 3) + '.' + cpfcnpj.substring(3, 6) + '.' + cpfcnpj.substring(6, 9) + '-' + cpfcnpj.substring(9, 11);
		    	            			} else if (cpfcnpj.length == 14){
		    	            				cpfcnpj = cpfcnpj.substring(0, 2) + '.' + cpfcnpj.substring(2, 5) + '.' + cpfcnpj.substring(5, 8) + '/' + cpfcnpj.substring(8, 12) + '-' + cpfcnpj.substring(12, 14);
		    	            			}	
		    	            			
		    	            			if (self.view.model.get("responsavel").tipo.codigo == 1) {
		    	            				self.view.model.get("responsavel").pessoaCpf = cpfcnpj;
	    	            				} else {
	    	            					self.view.model.get("responsavel").pessoaCnpj = cpfcnpj;
	    	            				}
		    	            			
		    	            			self.view.model.get("responsavel").nome = modeloatualizado.get("nomeresponsavel");
	    	            			}
	    	            			
	    	            			$('#divDadosGerais').html(self.view.render().el);
	    	            			self.view.delegateEvents();
	        		            },
	        		            error: $caixa.trataErro
	        		        });
	            		}
	            	}
	            },
	            error: $caixa.trataErro
			});
		},
		
		cancela: function(){
			$('#cadastramentoPropriedadeRural').modal('hide');
		},
		renderizaComMatricula: function(){
			this.model.set("tipo", 1);
			var ruralComMatricula = new PropriedadeRuralComMatriculaControle({model: this.model, acao: this.acao});
			this.$("#painelPropriedadeRural").html(ruralComMatricula.render().el);
			this.mascara.loadMask();
		},
		renderizaSemMatricula: function(){
			this.model.set("tipo", 2);
			var ruralSemMatricula = new PropriedadeRuralSemMatriculaControle({model: this.model, acao: this.acao});
			this.$("#painelPropriedadeRural").html(ruralSemMatricula.render().el);
		}
	});
	return PropriedadeRuralControle;
});