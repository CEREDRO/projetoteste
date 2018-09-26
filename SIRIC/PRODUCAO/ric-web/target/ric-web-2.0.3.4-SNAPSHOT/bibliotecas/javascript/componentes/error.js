/* ****************************************************************
 * Componente de ErrorManager
 ****************************************************************** */

var ErrorManager = Backbone.View.extend({
	
	/**
	 * Construtor.
	 * 
	 */
	initialize: function(bundle, message, prefix) {
		this.bundle = bundle;
		this.message = message;
		this.prefix = prefix;
	},
	
	/**
	 * Processa o erro para requisicoes ajax.
	 * 
	 * @param jqXHR
	 * @param textStatus
	 * @param errorThrown
	 */
	ajaxError: function(jqXHR, textStatus, errorThrown) {
		if (jqXHR.status == 403) {
	    	window.location.assign("/fec-web/errorInternal403.html");
		} else {
			try {
				this.message.multipleMessage($.parseJSON(jqXHR.responseText));
			} catch (e) {
				this.message.processMessage(
						this.message.errorMessage(
							this.bundle.convert(this.prefix+jqXHR.status)
						)
				);
			}
		}

		/*this.message.processMessage(
			this.message.errorMessage(
				this.bundle.convert(this.prefix+jqXHR.status)
			)
		);
		
		console.log('jqXHR: ' + jqXHR);			
		console.log('textStatus: ' + textStatus);
		console.log('errorThrown: ' + errorThrown);
		
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
	    } else if (jqXHR.status == 403) {
	    	//var redirect = "/fec-web/error404.html";
	    	//$(locator).attr('href', redirect);
	    	
	    	window.location.assign("/fec-web/errorInternal403.html");
	    } else if (jqXHR.status == 412) {
	    	this.message.multipleMessage($.parseJSON(jqXHR.responseText));
	    } else if (jqXHR.status == 503) {
	    	this.message.multipleMessage($.parseJSON(jqXHR.responseText));
	    }
	    else {
	    	console.log('Uncaught Error.\n' + jqXHR.responseText);
	    }*/
	}
});
