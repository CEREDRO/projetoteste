define([
       'servicos/risco/modelo/PesquisaAvancadaModelo'
], function(PesquisaAvancadaModelo) {
   var PesquisaAvancadaColecao = Backbone.Collection.extend({
		model: PesquisaAvancadaModelo,
		tipopessoaid: 0,
		paramconsulta: " ",
		pessoaid: 0, 
		paramccirmat: null,
		urlRoot: 'rest/risco/pessoas/localizar',
	     
		url: function(){
			if (this.paramccirmat == null){
				return this.urlRoot + '/' + this.tipopessoaid + ',' + this.paramconsulta + ',' + this.pessoaid;
			} else {
				return this.urlRoot + '/' + this.tipopessoaid + ',' + this.paramconsulta + ',' + this.pessoaid + ',' + this.paramccirmat;
			}
		},
		setFormmatedValue: function(attrs){
			for (var key in attrs) {
				switch(key) {
			    case "tipopessoaid":
			    	value = attrs[key];
			    	
			    	if (value == null | value == ""){
			    		value = 0;
			    	}else{
			    		value = value.trim();
			    	}
			    	
			        this.tipopessoaid = value;
			        break;
			    case "paramconsulta":
			    	value = attrs[key];
			    	
			    	
			    	if (value == null | value == ""){
			    		value = " ";
			    	}else{
			    		value = value.replace('.','').replace('.','').replace('-','').replace('/','').trim();
			    	}

			    	this.paramconsulta = value;
			        break;
			    case "pessoaid":
			    	value = attrs[key];
			    	
			    	if (value == null | value == ""){
			    		value = 0;
			    	}else{
			    		value = value.trim();
			    	}
			    	
			    	this.pessoaid = value;
			        break;
			    case "paramccirmat":
			    	value = attrs[key];
			    	
			    	if (value == null | value == ""){
			    		value = 0;
			    	}else{
			    		value = value.trim();
			    	}
			    	
			    	this.paramccirmat = value;
			        break;
				}
			}
		},
		getNonFormmatedValue: function(attrs){
			switch(attrs) {
		    case "cpfcnpj":   
		    	value = null;
		    	
		    	if ($caixa.util.isCPF(this.paramconsulta) | $caixa.util.isCNPJ(this.paramconsulta)){
		    		value = this.paramconsulta;
		    	}
		    	
		        return value;
		        break;
			}
		},
		validate: function(){
			if (this.tipopessoaid > 0 | (this.paramconsulta != null & this.paramconsulta.trim() != "") |  this.pessoaid > 0 | this.paramccirmat > 0) {
				return null;
			} 
				
			return "Favor preencher os campos da consulta.";
		},
		myfetch: function(options){
			msg = this.validate();
			
			if (msg == null){
				this.fetch.call(this, options);
			} else {
				alert(msg);
			}
		}
	});
   return PesquisaAvancadaColecao;
});
