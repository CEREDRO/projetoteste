/* ****************************************************************
 * Componente de Bundle
 ****************************************************************** */

//Namespaces
/*jQuery(document).ready( function()
{
	$caixa.nav.selectLang('pt');	
});*/

var Navigator = Backbone.View.extend({
	
	/**
	 * Construtor.
	 * 
	 */
	initialize: function() {
		
	},
	
	load: function(page, divId) {
		$.ajax({
			async: false,
			url: page,
			success: function(response){
				$('#'+divId).html(response);
			}
		});
		
		return this;
	},

	redirect: function(page) {
		$.ajax({
			async: false,
			url: page,
			success: function(response){
				$('#container').html(response);
			}
		});
		
		return this;
	},
	
	toggle: function(divId) {
		$('#'+divId).toggle(200);
		
		return this;
	},
	
	/**
	 * Abre uma pagina e coloca o conteudo da mesma num container.
	 * 
	 * @param page url da pagina
	 * @param targetContainer id do container destino para a pagina
	 */
	openPage: function(page, targetContainer) {
		$.ajax({
			url: page,
			success: function(response){
				var msg = new Message();
				msg.close();
				
				$('#'+targetContainer).html(response);
			}
		});
	}
});

/*
var $caixa = $caixa || {};
$caixa.navigator = $caixa.navigator || {};

$caixa.navigator.load = function (page, divId) {
	$.ajax({
		async: false,
		url: page,
		success: function(response){
			$('#'+divId).html(response);
		}
	});
};

$caixa.navigator.toggle = function(divId) {
	$('#'+divId).toggle(200);
	
	return $caixa.navigator;
};
*/