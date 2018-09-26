/****************************************************************************
 * Classe GlobalServices *
 * **************************************************************************
 * Define acesso a servicos globais da aplicacao							*
 * **************************************************************************
 * @author eduardo 															*
 ****************************************************************************/

var GlobalServices = Class.create({

	/**
	 * Construtor
	 * 
	 */
	urlBase: null,
	errorManager: null,
	/*
	initialize : function(urlBase, errorManager) {
		this.urlBase = urlBase;
		this.errorManager = errorManager;
	},
	 */
	/**
	 * Retorna a versao do sistema.
	 */
	updadeVersion : function(uiId) {
		that = this;
		$.ajax({
			async : true,
			type : 'POST',
			url : that.urlBase + "/version",
			dataType : 'json',
			contentType : 'application/json',
			success : function(data, textStatus, jqXHR) {
				if (data) {
					$('#' + uiId).html(data.value);
				}
			},
			error : function(jqXHR, textStatus, errorThrown) {
				that.errorManager.ajaxError(jqXHR, textStatus, errorThrown);
			}
		});
	}
});
