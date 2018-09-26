define([
       'servicos/risco/modelo/CampoLimiteModelo'
], function(CampoLimiteModelo) {
   var CampoLimiteColecao = Backbone.Collection.extend({

		model: CampoLimiteModelo,
		url: function(){
			return this.urlRoot;
		},
		filtro: function(options){	
			if (options.campo == 'cabecalho'){
				var filtered = this.filter(function(campo) {
		            return campo.get("cabecalho").get("codigo") === options.valor;
		        });
				
				if (!filtered[0]){
					filtered[0] = new CampoLimiteModelo();
				}
				
				return filtered[0];
			}
			
			if (options.campo == 'tipoMetadado'){
				var filtered = this.filter(function(campo) {
		            return campo.get("tipoMetadado") === options.valor;
		        });
				
				if (!filtered[0]){
					filtered[0] = new CampoLimiteModelo();
				}
				
				return filtered[0];
			}
		}
	});
   return CampoLimiteColecao;
});