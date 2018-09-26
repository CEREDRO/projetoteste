/************************************************************************
 * Classe UIHelper														*
 ************************************************************************
 * Utilitarios para manipulacao de elementos de tela.					*
 ************************************************************************
 * @author eduardo														*
 ************************************************************************
 * Dependencias: jquery, prototype.js 1.7.1 (customizado)				*
 * 																		*
 * Utilizacao:															*
 * 																		*
 *																		*
 ************************************************************************/

var UIHelper = Backbone.View.extend({

	/**
	 * Construtor
	 * 
	 */
	initialize: function() {
		
	},
	
	form: function(formId) {
		this.formId = formId;
		
		return this;
	},
	
	/**
	 * Limpa inputs do form.
	 */
	clear: function() {
		$("#"+this.formId).find("input[type=text], textarea").val("");
		//$("#"+this.formId).find("select, select").val("0");
		
		return this;
	},
	
	/**
	 * Seleciona um elemento.
	 */
	el: function(elementId) {
		this.elementId = elementId;
		
		return this;
	},
	
	/**
	 * Adiciona o atributo checked a um elemento.
	 */
	check: function() {
		$("#"+this.elementId).attr("checked", true);
		
		return this;
	},
	
	isCheck: function() {
		return $("#"+this.elementId).is(':checked');
	},
	
	/**
	 * Remove o atributo checked do elemento.
	 */
	uncheck: function() {
		$("#"+this.elementId).removeAttr("checked");
		
		return this;
	},
	
	isUncheck: function() {
		return !this.isCheck();
	}
	
	
	
	
});

