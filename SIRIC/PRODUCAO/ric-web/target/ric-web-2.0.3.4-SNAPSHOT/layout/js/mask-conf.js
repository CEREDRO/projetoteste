//loadMask();
/*
 * Função responsável pelo carregamento das mascaras.
 */
function loadMask() {
	//Maskedinput.js
	
	/*
	$(".cnpj").mask("99.999.999/9999-99");
	$(".cpf").mask("999.999.999-99");
	$(".rg").mask("9.999.999");
	$(".rg-sp").mask("9.999.999 aaa");
	$(".rg-sp-uf").mask("9.999.999 aaa/aa");
	$(".telefone").mask("9999-9999");
	$(".telefone-ddd").mask("(99) 9999-9999");
	$(".telefone-ddi").mask("+99 (99) 9999-9999");
	$(".cep").mask("99999-999");
	$(".placa").mask("aaa 9999");
	$(".hora-min").mask("99:99");
	$(".hora-min-seg").mask("99:99:99");
	*/
	$(".data").mask("99/99/9999");
	/*
	$(".numeroConta").mask("9999999999-**");
	$(".timeStamp").mask("99/99/9999 99:99");
	$(".percent").mask("99,99");
	$(".numeroContrato").mask("99.9999.999.9999999-99");
	*/
	//Alphanum.js
	
	$(".alpha").alpha(); //Alphanum
	$('.numero').numeric(); //numeric
	
	//Price-format.js
	
	$('.moeda').priceFormat({
		prefix: '',
    	centsSeparator: ',',	    	
    	thousandsSeparator: '.'
	});
}