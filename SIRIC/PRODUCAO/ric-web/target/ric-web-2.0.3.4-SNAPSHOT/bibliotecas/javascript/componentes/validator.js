/* ****************************************************************
 * Componente de Validators
 ****************************************************************** */

var Validators = Backbone.View.extend({
	
	/**
	 * Construtor.
	 * 
	 */
	initialize: function() {
		this.validators = new Array();
		this.inputs = new Array();
		this.errorRender = new ErrorRender();
		this.addValidator(new RequiredValidator())
			.addValidator(new DateValidator())
			.addValidator(new IntegerValidator())
			.addValidator(new DecimalValidator())
			.addValidator(new CPFValidator())
			.addValidator(new CNPJValidator());
	},
	
	/**
	 * Define o renderizador de erros.
	 * 
	 * @param errorRender
	 */
	withErrorRender: function(errorRender) {
		this.errorRender = errorRender;
	},
	
	/**
	 * Aciona um validador.
	 * 
	 * @param validator
	 * @returns this
	 */
	addValidator: function(validator) {
		this.validators[this.validators.length] = validator;
		
		return this;
	},
	
	/**
	 * Define a input para validacao.
	 * 
	 * @param inputId
	 * @returns this
	 */
	withInput: function(inputId) {
		this.inputValidator = new InputValidator(inputId);
		
		return this;
	},
	
	/**
	 * Reinicializa o validador.
	 * 
	 * @returns this
	 */
	reset: function() {
		this.inputValidator = null;
		this.inputs = new Array();
		this.controls = new Array();
		
		return this;
	},
	
	/**
	 * Adiciona uma input html a ser validada na proxima chamada de validate().
	 * 
	 * @param inputId id da input
	 * @returns this
	 */
	addInput: function(inputId) {
		this.inputs[this.inputs.length] = new InputValidator(inputId);
		
		return this;
	},
	
	/**
	 * Define um conjunto de controles html a serem validados na proxima
	 * chamada do metodo validate().
	 * 
	 * @param controls
	 * @returns this
	 */
	withControls: function(controls) {
		this.reset();
		
		for (var i = 0; i < controls.length; i++) {
			this.controls[this.controls.length] = new ControlValidator(controls[i]);
		}
		
		return this;
	},
	
	withForm: function(formId) {
		var arrayInputs = $('#'+formId)
			.find('input,select,textarea')
			.not('[type=submit],button,[type=image]')
			.filter(':visible');
		
		for (var i = 0; i < arrayInputs.length; i++) {
			this.addInput(arrayInputs[i].id);
		}
		return this;
	},
	
	/**
	 * Rotina de validacao
	 * @returns
	 */
	validate: function() {
		if (this.inputValidator != null) {
			return this.validateInput();
		} else if (this.inputs != null && this.inputs.length > 0) {
			return this.validateInputs();
		} else if (this.controls != null && this.controls.length > 0) {
			return this.validateControls();
		}
		
		return false;
	},
	
	/**
	 * Valida uma input.
	 * 
	 * @returns {Boolean}
	 */
	validateInput: function() {
		this.errorRender.renderNoError(this.inputValidator.id);
		
		var errors = new Array();

		for (var i = 0; i < this.validators.length; i++) {
			if (this.inputValidator.hasValidator(this.validators[i].id)) {
				if (!this.validators[i].validate(this.inputValidator.value())) {
					errors[errors.length] = new ErrorValidation(
						this.inputValidator.id,
						this.validators[i]
					);
					
					if (this.validators[i].abortChanelOnError()) {
						break;
					}
				}
			}
		}
		
		if (errors.length > 0) {
			this.showErrors(errors);
		}
		
		return errors.length == 0;
	},
	
	/**
	 * Valida a lista de input.
	 * 
	 * @returns {Boolean}
	 */
	validateInputs: function() {
		for (var i = 0; i < this.inputs.length; i++) {
			this.errorRender.renderNoError(this.inputs[i].id);
		}
		
		var errors = new Array();

		for (var j = 0; j < this.inputs.length; j++) {
			for (var i = 0; i < this.validators.length; i++) {
				if (this.inputs[j].hasValidator(this.validators[i].id)) {
					if (!this.validators[i].validate(this.inputs[j].value())) {
						errors[errors.length] = new ErrorValidation(
							this.inputs[j].id,
							this.validators[i]
						);
						
						if (this.validators[i].abortChanelOnError()) {
							break;
						}
					}
				}
			}
		}
		
		if (errors.length > 0) {
			this.showErrors(errors);
		}
		
		return errors.length == 0;
	},
	
	/**
	 * Valida a lista de controles.
	 * 
	 * @returns {Boolean}
	 */
	validateControls: function() {
		for (var i = 0; i < this.controls.length; i++) {
			this.errorRender.renderNoError(this.controls[i].id());
		}
		
		var errors = new Array();

		for (var j = 0; j < this.controls.length; j++) {
			for (var i = 0; i < this.validators.length; i++) {
				if (this.controls[j].hasValidator(this.validators[i].id)) {
					if (!this.validators[i].validate(this.controls[j].value())) {
						errors[errors.length] = new ErrorValidation(
							this.controls[j].id(),
							this.validators[i]
						);
						
						if (this.validators[i].abortChanelOnError()) {
							break;
						}
					}
				}
			}
		}
		
		if (errors.length > 0) {
			this.showErrors(errors);
		}
		
		return errors.length == 0;
	},
	
	showErrors: function(errors) {
		for (var i = 0; i < errors.length; i++) {
			this.errorRender.renderError(errors[i]);
		}
	},

	/**
	 * Limpa erros relacionado a uma input.
	 * 
	 * @param inputId
	 */
	cleanError: function(inputId) {
		this.errorRender.renderNoError(inputId);
		
		return this;
	},
	
	/**
	 * Limpa os erros das inputs
	 */
	cleanErrors: function() {
		for (var i = 0; i < this.inputs.length; i++) {
			this.errorRender.renderNoError(this.inputs[i].id);
		}
	}
});

var Validator = Backbone.View.extend({
	
	/**
	 * Construtor.
	 * 
	 */
	initialize: function(id, message) {
		this.id = id;
		this.message = message;
	},
	
	id: function() {
		return this.id;
	},
	
	message: function() {
		return this.message;
	},
	
	validate: function(value) {
		return true;
	},
	
	abortChanelOnError: function() {
		return true;
	},
	
	limpar: function(valor, validos) {
		// retira caracteres invalidos da string
		var result = "";
		var aux;
		for (var i=0; i < valor.length; i++) {
			aux = validos.indexOf(valor.substring(i, i+1));
			if (aux>=0) {
				result += aux;
			}
		}
		
		return result;
	}
});

var RequiredValidator = Backbone.View.extend(Validator, {
	
	/**
	 * Construtor.
	 * 
	 */
	initialize: function() {
		this.id = "required";
		this.message = "Campo obrigatório";
	},
	
	validate: function(value) {
		if (typeof value == 'string') {
			return value.trim() != '';
		} else {
			return value != null;
		}
	}
});

var DateValidator = Backbone.View.extend(Validator, {
	
	/**
	 * Construtor.
	 * 
	 */
	initialize: function() {
		this.id = "date";
		this.message = "Data inválida";
	},
	
	validate: function(value) {
		/*try {
			new Date(value);
			
			return true;
		} catch (error) {
			return false;
		}*/
		return true;
	}
});

var IntegerValidator = Backbone.View.extend(Validator, {
	
	/**
	 * Construtor.
	 * 
	 */
	initialize: function() {
		this.id = "date";
		this.message = "Número inteiro inválido";
	},
	
	validate: function(value) {
		return true;
	}
});

var DecimalValidator = Backbone.View.extend(Validator, {
	
	/**
	 * Construtor.
	 * 
	 */
	initialize: function() {
		this.id = "date";
		this.message = "Número decimal inválido";
	},
	
	validate: function(value) {
		return true;
	}
});

var CPFValidator = Backbone.View.extend(Validator, {
	
	/**
	 * Construtor.
	 * 
	 */
	initialize: function() {
		this.id = "cpf";
		this.message = "CPF inválido";
	},
	
	/**
	 * Valida o CPF.
	 * 
	 * @param value
	 * @returns {Boolean}
	 */
	validate: function(value) {
		var i;
		var numero = this.limpar(value, '0123456789');

		if (numero.length != 11) {
			return false;
		}

		var tudoIgual = true;
		for (i = 0; i < 11; i++){
			if (numero.charAt(0)!=numero.charAt(i)) {
				tudoIgual = false;
			}
		}
		if (tudoIgual) {
			return false;
		}

		s = numero;
		c = s.substr(0,9);
		var dv = s.substr(9,2);
		var d1 = 0;

		for (i = 0; i < 9; i++){
			d1 += c.charAt(i)*(10-i);
		}

		if (d1 == 0){
			return false;
		}

		d1 = 11 - (d1 % 11);
		if (d1 > 9) d1 = 0;

		if (dv.charAt(0) != d1){
			return false;
		}

		d1 *= 2;
		for (i = 0; i < 9; i++){
			d1 += c.charAt(i)*(11-i);
		}

		d1 = 11 - (d1 % 11);
		if (d1 > 9) d1 = 0;

		if (dv.charAt(1) != d1){
			return false;
		}

		return true;
	}
});

var CNPJValidator = Backbone.View.extend(Validator, {
	
	/**
	 * Construtor.
	 * 
	 */
	initialize: function() {
		this.id = "cnpj";
		this.message = "CNPJ inválido";
	},
	
	/**
	 * Valida o CNPJ.
	 * 
	 * @param value
	 * @returns {Boolean}
	 */
	validate: function(vlr) {
		var i;
		var numero = this.limpar(vlr, '0123456789');

		if (numero.length != 14) {
			return false;
		}

		s = numero;

		c = s.substr(0,12);
		var dv = s.substr(12,2);
		var d1 = 0;

		for (i = 0; i < 12; i++){
			d1 += c.charAt(11-i)*(2+(i % 8));
		}

		if (d1 == 0){
			return false;
		}
		d1 = 11 - (d1 % 11);

		if (d1 > 9) d1 = 0;

		if (dv.charAt(0) != d1){
			return false;
		}

		d1 *= 2;
		for (i = 0; i < 12; i++){
			d1 += c.charAt(11-i)*(2+((i+1) % 8));
		}

		d1 = 11 - (d1 % 11);
		if (d1 > 9) d1 = 0;

		if (dv.charAt(1) != d1){
			return false;
		}
		return true;
	}
});

var InputValidator = Backbone.View.extend({
	
	/**
	 * Construtor.
	 * 
	 */
	initialize: function(id) {
		this.id = id;
		this.el = $('#'+id);
		var vals = this.el.attr('validators');
		if (vals != null && vals != undefined) {
			this.validators = vals.split(",");
		}
	},
	
	/**
	 * Elemento.
	 * 
	 * @returns
	 */
	el: function() {
		return this.el;
	},
	
	/**
	 * Array com os id's dos validators.
	 * 
	 * @returns
	 */
	validators: function() {
		return this.validators;
	},
	
	/**
	 * Verifica se a input possui o validador.
	 * 
	 * @param validatorId
	 * @returns {Boolean}
	 */
	hasValidator: function(validatorId) {
		for(var i = 0; i < this.validators.length; i++) {
			if (validatorId == this.validators[i]) {
				return true;
			}
		}
		
		return false;
	},
	
	value: function() {
		return this.el.val();
	}
});

var ControlValidator = Backbone.View.extend({
	
	/**
	 * Construtor.
	 * 
	 */
	initialize: function(control) {
		this.control = control;
		var vals = control.el.attr('validators');
		if (vals != null && vals != undefined) {
			this.validators = vals.split(",");
		}
	},
	
	id: function() {
		return this.control.id;
	},
	
	/**
	 * Array com os id's dos validators.
	 * 
	 * @returns
	 */
	validators: function() {
		return this.validators;
	},
	
	/**
	 * Verifica se a input possui o validador.
	 * 
	 * @param validatorId
	 * @returns {Boolean}
	 */
	hasValidator: function(validatorId) {
		for(var i = 0; i < this.validators.length; i++) {
			if (validatorId == this.validators[i]) {
				return true;
			}
		}
		
		return false;
	},
	
	value: function() {
		return this.control.get();
	}
});

var ErrorValidation = Backbone.View.extend({
	
	/**
	 * Construtor.
	 * 
	 */
	initialize: function(fieldId, validator) {
		this.fieldId = fieldId;
		this.validator = validator;
	},
	
	fieldId: function() {
		return this.fieldId;
	},
	
	message: function() {
		return this.validator.message;
	}
});

var ErrorRender = Backbone.View.extend({

	/**
	 * Construtor.
	 * 
	 */
	initialize: function() {
		
	},
	
	renderError: function(error) {
		alert('id: ' + error.fieldId + '\n' + error.message());
	},
	
	renderNoError: function(inputId) {
		
	}
});

var BootstrapErrorRender = Backbone.View.extend(ErrorRender, {
	
	renderError: function(error) {
		var divControl = $('#'+error.fieldId).parent();
		var divControlParent = divControl.parent();
		
		if (divControl.hasClass("input-append") || divControl.hasClass("input-prepend")) {
			divControlParent.parent().addClass('error');
			$('<span id="'+this.dynamicId(error.fieldId)+'" class="help-inline">'+error.message()+'</span>')
				.appendTo(divControlParent);
		} else {
			divControlParent.addClass('error');
			$('<span id="'+this.dynamicId(error.fieldId)+'" class="help-inline">'+error.message()+'</span>')
				.appendTo(divControl);
		}
	},
	
	renderNoError: function(inputId) {
		var divControl = $('#'+inputId).parent();
		var divControlParent = divControl.parent();
		
		if (divControl.hasClass("input-append") || divControl.hasClass("input-prepend")) {
			divControlParent.parent().removeClass('error');
		} else {
			divControlParent.removeClass('error');
		}
		
		$('#'+this.dynamicId(inputId)).remove();
	},
	
	dynamicId: function(inputId) {
		return inputId + "_BootstrapErrorRender";
	}
	/*
	<div class="control-group error">
		<label class="control-label" for="inputError">Input with error</label>
		<div class="controls">
			<input type="text" id="inputError">
			<span class="help-inline">Please correct the error</span>
		</div>
	</div>
	 */
});