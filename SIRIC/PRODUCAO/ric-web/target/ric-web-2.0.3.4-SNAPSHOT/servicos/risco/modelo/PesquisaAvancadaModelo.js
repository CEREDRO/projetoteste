define([
], function() {
		var PesquisaAvancadaModelo = Backbone.Model.extend({
			
			urlRoot: 'rest/risco/pessoas',
			
			defaults: function() {
				return {
					codigo: null, 
					nome: null,
					tipo: null
				};
			},
			url: function() {
				return this.urlRoot + '/' + this.get('cpfCnpj') + ',' + this.get('tipopessoaid');
			},
			getFormmatedValue: function(attrs){
				switch(attrs) {
			    case "cpfcnpjccir":
			    	if (this.get('tipo')){
			    		if (this.get('tipo').codigo == 1) {
				    		return $caixa.util.formataCPF(this.get('pessoaCpf'));
				    	} else if (this.get('tipo').codigo == 23){
				    		if (this.get('matricula')){
				    			return $caixa.util.formataCCIR(this.get('codigoPropriedade'));
				    		} else {
				    			return $caixa.util.formataCPF(this.get('codigoPropriedade'));
				    		}
				    	} else {
				    		return $caixa.util.formataCNPJ(this.get('pessoaCnpj'));
				    	}
			    	}
			        break;
			    default:
			    	return this.get(attrs);
			        break;
				}
			}
		});
		return PesquisaAvancadaModelo;
	}
);