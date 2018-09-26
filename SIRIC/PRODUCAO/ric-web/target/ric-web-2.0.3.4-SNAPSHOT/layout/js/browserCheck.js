/**
 * Browser Check
 * 
 *Verifica Qual Browser esta sendo usado.
 *Verifica Qual Versao do Browser esta sendo usada.
 *Emite alerta de incompatibilidade com as versao definidas no DAS
 *
 *@author Humphrey Fonseca - C110503
 *@version 1.0
 * 
 */

function findNameBrowser() {
	var name = browserParams()[0];
	return name;
}

function findVersionBrowser() {
	var version = browserParams()[1];
	return version;
}

function checkCompatibility() {
	//console.log("checkCompatibility");
	var params = browserParams();
	if(params[0] == "Chrome" && params[1] < 15){
		alert("Seu navegador (" + params[0] +" "+ params[1] + ") está desatualizado. Recomendamos, uma versão mais atual do navegador para utilização do sistema.");
	}else if(params[0] == "Firefox" && params[1] < 10.0){
		alert("Seu navegador (" + params[0] +" "+ params[1] + ") está desatualizado. Recomendamos, uma versão mais atual do navegador para utilização do sistema.");
	}else if(params[0] == "MSIE" && params[1] < 9){
		alert("Seu navegador (" + params[0] +" "+ params[1] + ") está desatualizado. Recomendamos, uma versão mais atual do navegador para utilização do sistema.");
	}else if(params[0] == "Opera" && params[1] < 10.0){
		alert("Seu navegador (" + params[0] +" "+ params[1] + ") está desatualizado. Recomendamos, uma versão mais atual do navegador para utilização do sistema.");
	}else if(params[0] == "Safari" && params[1] < 5.1){
		
	}else if(!params[0] == "Chrome" || !params[0] == "Firefox" || !params[0] == "MSIE" 
		|| !params[0] == "Opera" || !params[0] == "Safari"){
		alert("Não foi possível identificar a versão do navegador! \n Por favor, utilizar outro navegador");
	}
}

/***
 * Funcao principal para descobrir os parametros do browser
 * 
 * Faz uso da browserParamsHelper indicando qual eh o browser
 * 
 * Retorna dois parametros
 * 
 * 1 nome do browse 2 versao do browser no formato float
 * @returns {Array}
 */
function browserParams() {
	var sUsrAg = navigator.userAgent;
	var params;
	if (sUsrAg.indexOf("Chrome") > -1) {
		var fullBrowser = sUsrAg.substr(sUsrAg.indexOf("Chrome"));
		params = browserParamsHelper(fullBrowser);
		return params;

	} else if (sUsrAg.indexOf("Safari") > -1) {
		var fullBrowser = sUsrAg.substr(sUsrAg.indexOf("Safari"));
		params = browserParamsHelper(fullBrowser);
		return params;
	} else if (sUsrAg.indexOf("Opera") > -1) {
		var fullBrowser = sUsrAg.substr(sUsrAg.indexOf("Opera"));
		params = browserParamsHelper(fullBrowser);
		return params;
	} else if (sUsrAg.indexOf("Firefox") > -1) {
		var fullBrowser = sUsrAg.substr(sUsrAg.indexOf("Firefox"));
		params = browserParamsHelper(fullBrowser);
		return params;
	} else if (sUsrAg.indexOf("MSIE") > -1) {
		var fullBrowser = sUsrAg.substr(sUsrAg.indexOf("MSIE"));
		params = browserParamsHelper(fullBrowser);
		return params;
	}
}

/**
 * Funcao Helper recebe o nome e versao do browser quebrar o nome completo e
 * versao do browser
 * 
 * Retorna dois parametros
 * 
 * 1 nome do browse 2 versao do browser no formato float
 * 
 * @param fullBrowser
 * @returns {Array}
 */
function browserParamsHelper(fullBrowser){
	var splitBrowser;
	var flVersion;
	var params = new Array();
	
	if (fullBrowser.indexOf("MSIE") > -1){
		splitBrowser = fullBrowser.split(";");
		var versionBrowserIE = splitBrowser[0].split(" ");
		splitBrowser[0] = versionBrowserIE[0];
		flVersion = parseFloat(versionBrowserIE[1]);
	}else{
		splitBrowser = fullBrowser.split("/");
		var versionBrowser = splitBrowser[1].split(" ");
		var rsVersion = versionBrowser[0].split(".",2);
	    var strVersion = rsVersion[0].concat(".").concat(rsVersion[1]);
	    flVersion = parseFloat(strVersion);
	}   
    params[0] = splitBrowser[0];
    params[1] = flVersion;
   return params;
}



