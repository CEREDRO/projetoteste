define([
], function() {
	var DetalheLimiteModelo = Backbone.Model.extend({
		initialize: function(){
			if (this.get("unidade") == 1 || this.get("unidade") == 2) {
				var valor = this.get("valor");
				
				var data = valor.toFixed(2).replace(".", ",").replace(/./g, function(c, i, a) {
				    return i && c !== "," && ((a.length - i) % 3 === 0) ? '.' + c : c;
				});
				
				if (this.get("unidade") == 2) {
					data = data + "%";
				}
				
				this.set({valor: data});
			}
			
			if (this.get("unidade") == 3 || this.get("unidade") == 5) {
				var valor = this.get("valor");
				var data = valor.toFixed(0);

				this.set({valor: data});
			}
			

			if (this.get("unidade") == 4) {
				var zero = '0';
				var valor = this.get("valor").toString();
				
				if (valor.length < 8) {
					valor = Array(9 - valor.length).join("0") + valor;
				}				
				
				
				var data = valor.substring(0, 2) + '/' + valor.substring(2, 4) + '/' + valor.substring(4, 8);
				
				this.set({valor: data});
			}
		},
		defaults: function() {
			return {
				codigo: null,
				descricao: null,
				metadado: null,
				linha: null,
				ordem: null,
				apresentacao: null,
				prefixo: null,
				sufixo: null,
				valor: null,
				unidade: null
			};
		}
	});
	return DetalheLimiteModelo;
});