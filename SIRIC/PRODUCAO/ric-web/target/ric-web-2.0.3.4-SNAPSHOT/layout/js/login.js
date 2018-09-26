jQuery(document).ready( function() {
	
	//console.log('login');
	
	$('#btn-login').bind('click',function() {
		autenticacao();
	});
	
	$('input').keypress(function(event) {
		  if ( event.which == 13 ) {
			  autenticacao();
			  //console.log('enter');
		  }
	});
	
	
	function autenticacao(){
		var $inputs = $("#loginform").find("input,textarea,select");
		$inputs.jqBootstrapValidation();

		var errors = $inputs.jqBootstrapValidation("collectErrors", true);
		
		//console.log(errors);
		
		if ($.isEmptyObject(errors)) {
			$("#loginform").attr('action', 'j_security_check');
			$("#loginform").submit();
	    } else {
	    	// triggers the field(s) to show the error-state if something is wrong
	    	$inputs.trigger("submit.validation", {submitting: true});
	    }
	};
	
});