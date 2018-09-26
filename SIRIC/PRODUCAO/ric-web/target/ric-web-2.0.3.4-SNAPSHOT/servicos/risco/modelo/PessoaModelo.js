define([
], function() {
	var PessoaModelo = Backbone.Model.extend({
			
		urlRoot: 'rest/risco/pessoas/consulta/',
		
		defaults: function() {
			return {
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
		},
		
		url: function() {
			return this.urlRoot + this.get("codigo") + ',' + this.get("tipo").codigo;
		},
		getNonFormmatedValue: function(attrs){
			switch(attrs) {
		    case "cpfcnpj":
		    	if (this.get("pessoaCpf")) {
		    		value = this.get("pessoaCpf");
		    	} else {
		    		value = this.get("pessoaCnpj");
		    	}
		    	
		    	if (value == null){
		    		value = " ";
		    	}
		    	
		    	return value.replace('.','').replace('.','').replace('-','').replace('/','').trim();
		        break;
		    default:
		    	return this.get(attrs);
		        break;
			}
		}
	});
	return PessoaModelo;
});