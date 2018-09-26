$(document).ready( function() {
	
	
    $(".btn-limpar").click(function() {
        $(this).closest('form').find("input[type=text], textarea").val("");
    });
    
    $('[data-toggle="tooltip"]').tooltip({
        'placement': 'top'
    });
    

	  // Abri modal da Release
	$("#linkModalVersoes").click(function() {
		$.get('./modalVersoes.html', function(data) {
			$('#modal').append(data);
			$('#modalVersoes').modal('show');
		});
	});
	
	//User Profile
	$caixa.userProfileGroups.loadgroups();
	$caixa.userProfile.load('usuario', 'matricula');
	$('.links-menu').click(function(event){
		event.preventDefault();
		$caixa.navigator.openPage($(this).attr('href'), 'container');
		
	});

	$('#logout').click(function () {
		$caixa.globalServices.logout();
	});
	
});


/*
 * $.fnOpenConsultaContrato = function(){ $.ajax({
 * url:'servicos/consultacontratos.html', success: function(response){
 * console.log(this); console.log(response); $('#container').html(response); }
 * }); }
 */


function abrirPagina(pagina) {
	$.ajax({
		url:pagina,
		success: function(response){
			//console.log(this);
			//console.log(response);
			var msg = new Message();
			msg.close();
			$('#container').html(response);
		}
	});
}


function getRadioValue(nodeList){
	var i;
	var val = "";
	for(i=0; i<nodeList.length; i++){
		if(nodeList.item(i).checked){
			val = nodeList.item(i).value;
		}
	}
	return val;
}

//function convertDateToString(date)
//{
//	var nDate = new Date(date);
//	if(date == "" || date == null ){
//		return "";
//	}else{
//		return nDate.toLocaleString();
//	}
//}
function convertDateToString(date)
{
	//var nDate = new Date(date);
	if(date == "" || date == null ){
		return "";
	}else{
		var dia = date.substring(8);
		var mes = date.substring(5,7);
		var ano = date.substring(0,4);
		//console.log(dia+'/'+mes+'/'+ano);
		return dia+'/'+mes+'/'+ano;
	}
}

function convertStringToDate(date)
{
	var spltDate = date.split('/');
	var nDate = new Date(spltDate[2],spltDate[1]-1,spltDate[0]);
	return nDate.getTime();
	
}

function convertDateObjectToString(date) {
	var nDate = date;
	var options = {year: "numeric", month: "numeric", day: "numeric"};
	
	var ret = nDate.toLocaleDateString("pt-BR", options);
	
	if (ret.indexOf('-') > -1) {
		ret = ret.replace(/-{1}/gi, '/');
	}
	
	return ret;
}

function dateToBroker(date) {
	var dateString = convertDateObjectToString(date);
	var spltDate = dateString.split('/');
	var ret = spltDate[2] + "-" + spltDate[1] + "-" + spltDate[0];
	
	return ret;
}

function dateStringToBroker(dateString) {
	var spltDate = dateString.split('/');
	var ret = spltDate[2] + "-" + spltDate[1] + "-" + spltDate[0];
	
	return ret;
}

function dateStringToBrokerDDMMYYYY(dateString) {
	var spltDate = dateString.split('/');
	var ret = spltDate[0] + spltDate[1] + spltDate[2];
	
	return ret;
}

/*function tratarErroAjax(jqXHR, textStatus, errorThrown) {
	var msg = new Message();
	
	msg.processMessage(
		msg.errorMessage(
			$caixa.bundle.converter('ME_'+jqXHR.status)
		)
	);
	
	console.log(jqXHR);			
	console.log(textStatus);
	console.log(errorThrown);			
	if (jqXHR.status === 0) {
		console.log('Not connect.\n Verify Network.');
    } else if (jqXHR.status == 404) {
    	console.log('Requested page not found. [404]');
    } else if (jqXHR.status == 500) {
    	console.log('Internal Server Error [500].');
    } else if (errorThrown === 'parsererror') {
    	console.log('Requested JSON parse failed.');
    } else if (errorThrown === 'timeout') {
    	console.log('Time out error.');
    } else if (errorThrown === 'abort') {
    	console.log('Ajax request aborted.');
    } else {
    	console.log('Uncaught Error.\n' + jqXHR.responseText);
    }
};*/

function getParameter(name) {
	var url = window.location.search.replace("?", "");
	var itens = url.split("&");
	
	for(var n = 0; n < itens.length; n++) {
		if (itens[n].match(name)) {
 			return decodeURIComponent(itens[n].replace(name+"=", ""));
		}
	}
 
	return null;
}

function voltarTopo(){
    $('html, body').animate({
		scrollTop : $("#atalhos").scrollTop()
	}, 1000);
    //console.log('topo');
}