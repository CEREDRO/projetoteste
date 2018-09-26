define([
], function() {
	var PropriedadeRuralModelo = Backbone.Model.extend({

		urlRoot: 'rest/risco/pessoas/propriedaderural/',
		
		initialize : function(){
	        this.on("invalid",function(model,error){
	            alert(error);
	        });
	    },
		defaults: function() {
			return {
				codigo: null,
				nome: null,
				ccir: null,
			    matricula: null,
			    cpfcnpjresponsavel: null,
			    nomeresponsavel: null,
			    municipio: null,
				tipo: null
			};
		},
		url: function() {
			return this.urlRoot;
		},
		validate: function(attributes){
			if ( !attributes.nome ){
				return 'Nome não informado.';
			}
			
			if (attributes.tipo == 1){
				if ( !attributes.ccir ){
					return 'Cert. Cad. Imóvel Rural não informado.';
				}
				
				if ( !attributes.matricula ){
					return 'Matrícula não informado.';
				}
			} else {
				if ( !attributes.municipio ){
					return 'Município não informado.';
				}
				
				if ( !attributes.municipio.codigo ){
					return 'Município não informado.';
				}
				
				if ( !attributes.cpfcnpjresponsavel ){
					return 'CPF/CNPJ não informado.';
				}
			}
		},
	});
	return PropriedadeRuralModelo;
});

