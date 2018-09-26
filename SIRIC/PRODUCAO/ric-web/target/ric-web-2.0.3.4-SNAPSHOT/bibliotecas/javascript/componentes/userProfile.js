/*******************************************************************************
 * Classe AjaxStatus *
 * ***********************************************************************
 * Define algoritmos e estruturas para iteracao com o broker. *
 * ***********************************************************************
 * 
 * @author eduardo *
 *         ***********************************************************************
 *         Dependencias: prototype.js 1.7.1 * Utilizacao: * var status = new
 *         AjaxStatus; * status.start(); * status.stop(); *
 ******************************************************************************/

var UserProfile = Backbone.View.extend({

	/**
	 * Construtor
	 * 
	 * @param id
	 *            Id do componente visual. Se nao for informado o id default
	 *            sera ajaxStatus
	 */
	url: null,
	errorManager: null,
	/*
	initialize : function(url, errorManager) {
		this.url = url;
		this.errorManager = errorManager;
	},
	 */
	/**
	 * Fecha o ajax status.
	 */
	load : function(idUsuario, idMatricula) {
		
		that = this;
		
		$.ajax({
			async : true,
			type : 'POST',
			url : that.url,
			dataType : 'json',
			contentType : 'application/json',
			success : function(data, textStatus, jqXHR) {
				if (data.empregado != null) {
					$('#' + idUsuario).html(
							'Usuário: ' + data.empregado.nomePessoa);
					$('#' + idMatricula).html(
							'Matrícula: c' + data.empregado.numeroMatricula);
					console.log("Grupos: " + data.grupoUsuarioList);
				}

//				if (data.grupoUsuarioList != null) {
//					if ($.inArray("TESTEGAN2", data.grupoUsuarioList) == -1) {
//						console.log("REMOVENDO #idSimulaContratacao");
//						$("#idSimulaContratacao").remove();
//					}
//
//				}

			},
			error : function(jqXHR, textStatus, errorThrown) {
				that.errorManager.ajaxError(jqXHR, textStatus, errorThrown);
			}
		});
		
	},
	/**
	 * Fecha o ajax status.
	 */
	
	loadgroups : function() {
		
		that = this;
		$.ajax({
			async : true,
			type : 'POST',
			url : that.url,
			dataType : 'json',
			contentType : 'application/json',
			success : function(data, textStatus, jqXHR) {
				if (data != null) {
					
					if ($.inArray("ConsultaAPI/APX", data) == -1) {
						$("#idConsultaContrato").remove();	
						$("#idConsultaIR").remove();	
						
					}
					if ($.inArray("SimulaAPI/APX", data) == -1) {
						$("#idSimulaContratacao").remove();			
					}
					
//					if (($.inArray("Consulta7000EMP", data) == -1) || ($.inArray("Gerencial7000EMP", data) == -1)) {
//						$("#idSimulaContratacao").remove();
//						$("#idConsultaContrato").remove();
//						$("#idConsultaIR").remove();
//					}
				}
			},
			error : function(jqXHR, textStatus, errorThrown) {
				that.errorManager.ajaxError(jqXHR, textStatus, errorThrown);
			}
		});
	}

});
