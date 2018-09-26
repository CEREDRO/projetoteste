define([
	'text!servicos/risco/visao/consultaavaliacaoautomatica.html',
	'servicos/risco/controle/SIRICUtilsControle',
	'servicos/risco/controle/AvaliacaoAutomaticaControle',
	'servicos/risco/colecao/AvaliacaoAutomaticaColecao',
	'comum/MascaraController',
	'servicos/risco/modelo/PermissaoModelo'
], function(template, SIRICUtilsControle, AvaliacaoAutomaticaControle, AvaliacaoAutomaticaColecao,MascaraController,PermissaoModelo) {
	var ConsultaAvaliacaoAutomaticaControle = Backbone.View.extend({
	
		initialize: function() {
			this.util = new SIRICUtilsControle();
			this.mascara = new MascaraController();
			this.model.on('change', this.render, this);
		},
		
		render: function() {
			this.$el.html(_.template(template, this.model.attributes));
			this.mascara.loadMask();
			return this;
		},
		events: {
	        "click #btn_consultar": "verificaPermissaoConsulta",
	        "keypress input[type=text]" : "consultaEnter",
	        "click #tipoConsulta": "carregaTipoConsulta",
	        "click #tipoParm": "carregaParametro",
	        "keyup #input_parageric": "isNumber",
	        "keyup #input_parampv": "isNumber",
	        "click #btn_limpar" : "limpar"
	    },
	    verificaPermissaoConsulta: function(e){
	    	var self = this;
	    	var objeto;
	    	var permissao = new PermissaoModelo();
	    	
	    	if (this.model.get("tipoconsulta") == 1){
	    		objeto = 128;
	    	}
	    	
	    	if (this.model.get("tipoconsulta") == 2){
	    		objeto = 129;
	    	}
	    	
	    	if (this.model.get("tipoconsulta") == 3){
	    		objeto = 131;
	    	}
	    	
	    	if (this.model.get("tipoconsulta") == 4){
	    		objeto = 132;
	    	}
	    	
	    	if (this.model.get("tipoconsulta") == 5){
	    		objeto = 136;
	    	}
	    	
	    	if (this.model.get("tipoconsulta") == 6){
	    		objeto = 136;
	    	}
	    	
	    	permissao.url = "rest/risco/permissao/antiga/0," + objeto;
	    	permissao.fetch({
				success: function(permissao, response) {
					if (permissao.get('codigo') == 0){
						alert('Usuário não possui permissão.');
					} else {
						self.consultarAvaliacaoAutomatica(e);
					}
				},
				error: function(collection, response) {
	            	console.log(response.responseText);
	            }
        	});
		},
	    consultarAvaliacaoAutomatica: function(e){
			var avaliacaoautomaticacolecao = new AvaliacaoAutomaticaColecao();
			
			if (this.model.get("tipoparametro") == 1) {
				var geric = this.$('#input_parageric').val();
				
				if(geric == undefined || geric == '') {
					alert("Preenchimento do campo GERIC é obrigatório.");
					return false;
				}
				else {
					avaliacaoautomaticacolecao.geric = geric;
				}
			}
			
			if (this.model.get("tipoparametro") == 2) {
				var cpfcnpj = this.$('#input_paramcpfcnpj').val().replace(/[^\d]+/g,'');
				
				if(cpfcnpj == undefined || cpfcnpj == '') {
					alert("Preenchimento do campo CPF/CNPJ é obrigatório.");
					return false;
				}
				else {
					if (!this.util.isCNPJ(cpfcnpj) & !this.util.isCPF(cpfcnpj)){
						alert("CPF/CNPJ inválido.");
						return false;
					}
					
					avaliacaoautomaticacolecao.cpfcnpj = cpfcnpj;
				}
			}
			
			if (this.model.get("tipoparametro") == 3) {
				var pv = this.$('#input_parampv').val();
				
				if(pv == undefined || pv == '') {
					alert("Preenchimento do campo PV é obrigatório.");
					return false;
				}
				else {
					avaliacaoautomaticacolecao.pv = pv;
				}
				
				var datainicial = this.$('#input_datainicial').val();
				
				if(datainicial == undefined || datainicial == '') {
					alert("Preenchimento do campo DATA DE INÍCIO é obrigatório.");
					return false;
				}
				else {
					if (this.util.isData(datainicial)){
						avaliacaoautomaticacolecao.datainicioconsulta = $.datepicker.formatDate('yy-mm-dd', $.datepicker.parseDate("dd/mm/yy", datainicial));
					} else {
						alert("Data inválida.");
						return false;
					}
					
				}
				
				var datafim = this.$('#input_datafinal').val();
				
				if(datafim == undefined || datafim == '') {
					alert("Preenchimento do campo DATA FIM é obrigatório.");
					return false;
				}
				else {
					if (this.util.isData(datafim)){
						avaliacaoautomaticacolecao.datafimconsulta = $.datepicker.formatDate('yy-mm-dd', $.datepicker.parseDate("dd/mm/yy", datafim));
					} else {
						alert("Data inválida.");
						return false;
					}
				}
			}
			
			if (this.model.get("tipoparametro") == 4) {
				var datainicial = this.$('#input_datainicial').val();
				
				if(datainicial == undefined || datainicial == '') {
					alert("Preenchimento do campo DATA DE INÍCIO é obrigatório.");
					return false;
				}
				else {
					if (this.util.isData(datainicial)){
						avaliacaoautomaticacolecao.datainicioconsulta = $.datepicker.formatDate('yy-mm-dd', $.datepicker.parseDate("dd/mm/yy", datainicial));
					} else {
						alert("Data inválida.");
						return false;
					}
				}
				
				var datafim = this.$('#input_datafinal').val();
				
				if(datafim == undefined || datafim == '') {
					alert("Preenchimento do campo DATA FIM é obrigatório.");
					return false;
				}
				else {
					if (this.util.isData(datafim)){
						avaliacaoautomaticacolecao.datafimconsulta = $.datepicker.formatDate('yy-mm-dd', $.datepicker.parseDate("dd/mm/yy", datafim));
					} else {
						alert("Data inválida.");
						return false;
					}
				}	
			}
			
			avaliacaoautomaticacolecao.tipoconsulta = this.model.get("tipoconsulta");
			avaliacaoautomaticacolecao.tipoparametro = this.model.get("tipoparametro");
			
			avaliacaoautomaticacolecao.fetch({
	            success: function(collection, response) {
	            	if (collection.length > 0) {
	            		var avaliacaoautomaticacontrole = new AvaliacaoAutomaticaControle({model: collection});
		            	this.$('#resultadoConsulta').html(avaliacaoautomaticacontrole.render().el);
	            	} else {
	            		alert("Nenhum registro encontrado.");
	            	}
	            	
	            },
	            error: function(collection, response) {
	            	console.log(response.responseText);
	            }
	        }, this);
		},
		carregaTipoConsulta: function(e){
			this.atualizaModelo();
			this.model.set({tipoconsulta: e.target.value});
			this.model.set({tipoparametro: 2});
		},
		carregaParametro: function(e){
			this.atualizaModelo();
			this.model.set({tipoparametro: e.target.value});
		},
		atualizaModelo: function() {
			if (this.model.get("tipoconsulta") == 5 & this.model.get("tipoparametro") == 2){
				this.model.set({cnpj: this.$('#input_paramcpfcnpj').val()});
			} else if (this.model.get("tipoconsulta") != 5 & this.model.get("tipoparametro") == 2){
				this.model.set({cpf: this.$('#input_paramcpfcnpj').val()});
			}
			
			if (this.model.get("tipoparametro") == 1) {
				this.model.set({geric: this.$("#input_parageric").val()}, {silent: true});
			}
			
			if (this.model.get("tipoparametro") == 3) {
				this.model.set({
					pv: this.$('#input_parampv').val(),
					datainicial: this.$('#input_datainicial').val(),
					datafim: this.$('#input_datafinal').val()
				});
			}
			
			if (this.model.get("tipoparametro") == 4) {
				this.model.set({
					datainicial: this.$('#input_datainicial').val(),
					datafim: this.$('#input_datafinal').val()
				});
			}
		},
		isNumber: function(e) {
			this.util.isNumber(e);	
		},
		consultaEnter: function(e) {
			if (e.keyCode != 13) return;
	        this.verificaPermissaoConsulta(e);
		},
		limpar: function(e) {
			this.model.set({geric: null});
			this.model.set({cpf: null});
			this.model.set({cnpj: null});
			this.model.set({pv: null});
			this.model.set({datainicial: null});
			this.model.set({datafim: null});
		}
	});
	return ConsultaAvaliacaoAutomaticaControle;
});
	
