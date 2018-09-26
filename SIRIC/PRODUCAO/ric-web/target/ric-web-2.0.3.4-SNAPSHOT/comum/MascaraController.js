define([
	'bootstrap',
	'ajaxStatus',
	'jqueryMask',
	'price-format'
], function(Bootstrap,AjaxStatus,jqueryMask,priceFormat) {
	var MascaraController = Backbone.View.extend({
		
		loadMask: function(context){
			context = context || window;
			
			context.$(".cnpj").mask("99.999.999/9999-99");
			context.$(".cpf").mask("999.999.999-99");
			context.$(".rg").mask("9.999.999");
			context.$(".rg-sp").mask("9.999.999 aaa");
			context.$(".rg-sp-uf").mask("9.999.999 aaa/aa");
			context.$(".telefone").mask("9999-9999");
			context.$(".telefone-ddd").mask("(99) 9999-9999");
			context.$(".telefone-ddi").mask("+99 (99) 9999-9999");
			context.$(".cep").mask("99999-999");
			context.$(".placa").mask("aaa 9999");
			context.$(".hora-min").mask("99:99");
			context.$(".hora-min-seg").mask("99:99:99");
			context.$(".data").mask("99/99/9999");
			context.$(".numeroConta").mask("9999999999-**");
			context.$(".timeStamp").mask("99/99/9999 99:99");
			context.$("#coccir").mask("999.999.999.999-9");
			context.$(".percent").ready(function(){
			    $('input[type="text"]').each(function(){
			        var val = $(this).val().replace('.',',');
			        $(this).val(val);
			    });
			});
			
			context.$(".percent").unbind('keypress.virgula');
			context.$(".percent").bind('keypress.virgula', function(e){
		    	   var valor = e.target.value;
		    	   var countVirgula = (valor.match(/,/g) || []).length;

		    	   //Ajuste p/ Firefox aceitar backspace.. del.. shift.. etc..
		    	   if(e.which == 8 || e.which == 0 ) { 
		    		   return true;
		    	   }

		    	   //Campo s? aceita 0-9 e virgula, caso contr?rio... n aceitar
		    	   if((e.which < 48 && e.which != 44) || e.which > 57 ) { 
		    		   return false;
		    	   }

		    	   //N?o aceitar mais de uma virgula
		    	   if (e.which == 44 && countVirgula > 0){
		    		   return false;
		    	   }

		    	   //N?o permitir colocar virgula com mais de 2 casas decimais
		    	   if (e.which == 44 && ((valor.toString().length - e.target.selectionStart) > 2)) {
		    		   return false;
		    	   }

		    	   //Limitar em 2 decimais
		    	   if (countVirgula > 0 && (e.target.selectionStart > valor.indexOf(','))) {
		    		   var decimais = valor.split(',');

		    		   if (decimais[1].toString().length >= 2){
		    			   return false;
		    		   }
		    	   }

		    	   return true;
		    });

		    context.$(".numeroContrato").mask("99.9999.999.9999999-99");
		    context.$('.moeda').priceFormat({
				prefix: '',
		    	centsSeparator: ',',	    	
		    	thousandsSeparator: '.'
			});
			
			context.$('.number').mask("?999999999999999999999999999999999999999999999999999999", {placeholder:""});
			
			context.$(".cpfcnpj").unbind('keyup.mascaracpfcnpj');
			context.$(".cpfcnpj").bind('keyup.mascaracpfcnpj', function(e){
				var valorNumericoApenas = e.target.value.replace(/[^0-9]/g,'').trim();
		    	
			    if (valorNumericoApenas.length <= 11) { //CPF
			        valorNumericoApenas = valorNumericoApenas.replace(/(\d{3})(\d)/,"$1.$2");
			        valorNumericoApenas = valorNumericoApenas.replace(/(\d{3})(\d)/,"$1.$2");
			        valorNumericoApenas = valorNumericoApenas.replace(/(\d{3})(\d{1,2})$/,"$1-$2");
			    } else { //CNPJ
			        valorNumericoApenas = valorNumericoApenas.replace(/^(\d{2})(\d)/,"$1.$2");
			        valorNumericoApenas = valorNumericoApenas.replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3");
			        valorNumericoApenas = valorNumericoApenas.replace(/\.(\d{3})(\d)/,".$1/$2");
			        valorNumericoApenas = valorNumericoApenas.replace(/(\d{4})(\d)/,"$1-$2");
			    }
			    
			    $(this).val(valorNumericoApenas);
				return true;
			});
		}
	});
	return MascaraController;
});