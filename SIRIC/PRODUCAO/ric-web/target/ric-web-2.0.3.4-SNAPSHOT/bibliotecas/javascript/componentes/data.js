/* ****************************************************************
 * Componente de Datas
 ****************************************************************** */

//Namespaces
var $caixa = $caixa || {};
$caixa.data = $caixa.data || {};

/*
 * Formata datas do formato yyyy-mm-dd para o formato dd/mm/yyyy
 * */
$caixa.data.formataData =
function (strData){
	var dia = strData.substring(8);
	var mes = strData.substring(5,7);
	var ano = strData.substring(0,4);
	return dia+'/'+mes+'/'+ano;
}
