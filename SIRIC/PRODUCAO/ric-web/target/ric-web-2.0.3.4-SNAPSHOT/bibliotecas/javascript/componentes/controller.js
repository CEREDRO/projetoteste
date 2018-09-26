/************************************************************************
 * Classe JSController													*
 ************************************************************************
 * ... 																	*
 ************************************************************************
 * @author eduardo														*
 ************************************************************************
 * Dependencias: prototype.js 1.7.1										*
 * Utilizacao:															*
 * 																		*
 * 																		*
 ************************************************************************/

var JSController = Backbone.View.extend({

	/**
	 * Construtor.
	 * 
	 */
	initialize: function() {
		this.binds = new Array();
		this.factory = new ControlFactory();
		this.brokerConfig = null;
		this.rootServiceURL = null;
		this.lastCorrelation = null;
		this.validators = new Validators();
		this.validators.withErrorRender(new BootstrapErrorRender());
	},
	
	/**
	 * Especifica configuracoes do broker.
	 * 
	 * @param brokerConfig
	 */
	withBrokerConfig: function(brokerConfig) {
		this.brokerConfig = brokerConfig;
	},
	
	/**
	 * Especifica um error renderer.
	 * 
	 * @param erroRender
	 */
	withErrorRender: function(erroRender) {
		this.validator.withErrorRender(errorRender);
	},

	/**
	 * Cria um objeto de controle (html) relacionado a um elemento
	 * da tela.
	 * 
	 * @param id Identificador do elemento de tela
	 * @returns Instancia do objeto de controle
	 */
	bind: function(id) {
		this.binds[id] = this.factory.createControl(id);
		
		return this.binds[id];
	},
	
	/**
	 * Relaciona um metodo do controlador a um elemento de acao (botao, link).
	 * Eh possivel relacionar 
	 * @param id Identificador do elemento de tela
	 * @param objFunction Metodo do controlador
	 */
	bindAction: function(id, objFunction) {
		$('#'+id).bind('click', {'_that': this}, objFunction);
	},
	
	/**
	 * @param askService Servico de solicitacao da operacao
	 * @param answerService Service de resposta donde deve ser solicitado o retorno do processamento da informacao
	 * @param buidAskParamsFunction Rotina para gerar os dados
	 * @param processAnswerFunction Rotina para manipulacao dos dados
	 */
	askBroker: function(
			rootServiceURL,
			askService, 
			answerService, 
			buidAskParamsFunction, 
			processAnswerFunction) {
		if (rootServiceURL == null) {
			console.log("rootServiceURL null");
			return;
		}
		
		if (this.brokerConfig != null) {
			this.brokerConfig.message().close();
			this.brokerConfig.ajaxStatus().start();
		} else {
			console.log("brokerConfig null");
			return;
		}
		
		var _this = this;
		
		$.ajax({
			timeout: 1000,
			type: 'POST',
			url: rootServiceURL + askService,
			dataType: 'json',
			contentType: 'application/json',
			data: JSON.stringify({
				dados: buidAskParamsFunction(_this)
			}),
			success: function(data, textStatus, jqXHR) {
				console.log(data);
				_this.lastCorrelation = data; 
				
				setTimeout(function() {
					_this.answerBroker(
							0, 
							rootServiceURL, 
							answerService, 
							processAnswerFunction);
				}, _this.brokerConfig.waitTime());
			},
			error: function(jqXHR, textStatus, errorThrown) {
				_this.brokerConfig.ajaxStatus().stop();
				_this.brokerConfig.errorManager().ajaxError(
						jqXHR, 
						textStatus, 
						errorThrown);
			}
		});
	},
	
	/**
	 * Executa chamada para obtencao da resposta do broker.
	 */
	answerBroker: function(count, rootServiceURL, answerService, processAnswerFunction) {
		console.log('answerBroker(' + count + ')');
		console.log('correlatioId: ' + this.lastCorrelation.id);
		
		if (rootServiceURL == null) {
			console.log("rootServiceURL null");
			return;
		}
		
		if (this.brokerConfig != null) {
			this.brokerConfig.message().close();
		} else {
			console.log("brokerConfig null");
			return;
		}
		
		var _this = this;
	
		$.ajax({
			type: 'GET',
			contentType: 'application/json',
			url: rootServiceURL + answerService + '/' + this.lastCorrelation.id,
			dataType: "json", 
			success: function(data, textStatus, jqXHR) {
				if (data != undefined) {
					processAnswerFunction(data, _this);
					_this.brokerConfig.ajaxStatus().stop();
				} else {
					if (count <= _this.brokerConfig.maxTry()) {
						setTimeout(function() {
							_this.answerBroker(
									++count, 
									rootServiceURL, 
									answerService, 
									processAnswerFunction);
						}, _this.brokerConfig.waitTime());
					} else {
						_this.brokerConfig.message().processMessage(
							_this.brokerConfig.message().warnMessage(
								_this.brokerConfig.bundle().convert(
									_this.brokerConfig.maxTryWarn()
								)
							)
						);
						
						_this.brokerConfig.ajaxStatus().stop();
					}
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
				_this.brokerConfig.ajaxStatus().stop();
				_this.brokerConfig.errorManager().ajaxError(
					jqXHR, 
					textStatus, 
					errorThrown);
			}
		});	
	},
	
	clearInputs: function() {
		for (var i = 0; i < this.binds.length; i++) {
			if (this.binds[i] instanceof InputText) {
				this.binds[i].clear();
			}
		}
	}
	
	/*clearFieldsBinded: function() {
		for (var i = 0; i < this.binds.length; i++) {
			this.binds[i].clear();
		}
	}*/
});

var ControlFactory = Backbone.View.extend({
	
	/**
	 * Construtor
	 */
	initialize: function() {
		
	},
	
	/**
	 * Instancia o objeto controle.
	 * 
	 * @param id
	 * @returns
	 */
	createControl: function(id) {
		var control = $('#'+id);
		if (control.is('input') && control.attr('type') == 'text') {
			var input = new InputText();
			input.setId(id);
			
			return input;
		} else if (control.is('select')) {
			var select = new Select();
			select.setId(id);
			
			return select;
		} else if (control.is('textarea')) {
			var textarea = new InputTextArea();
			textarea.setId(id);
			
			return textarea;
		} else if (control.is('span') || control.is('td')) {
			var container = new HtmlContainer();
			container.setId(id);
			
			return container;
		} else if (control.is('div') && control.hasClass('modal')) {
			var modal = new Modal();
			modal.setId(id);
			
			return modal;
		}
		
		return null;
	}
});

/**
 * Formatador (superclasse)
 */
var Formatter = Backbone.View.extend({

	initialize: function() {
		
	},
	
	toView: function(value) {
		return value;
	},
	
	toModel: function(value) {
		return value;
	}
});

/**
 * Formatador CPF
 */
var CPFFormatter = Backbone.View.extend(Formatter, {

	initialize: function() {
		
	},
	
	toView: function(value) {
		return value.substr(0,3)
			+'.'+value.substr(3,3)
			+'.'+value.substr(6,3)
			+'-'+value.substr(9,2);
	},
	
	toModel: function(value) {
		return value.replace(/\D/g,'');
	}
});

/**
 * Formatador para CNPJ
 */
var CNPJFormatter = Backbone.View.extend(Formatter, {

	initialize: function() {
		
	},
	
	toView: function(value) {
		return value;
	},
	
	toModel: function(value) {
		return value;
	}
});

/**
 * Formatador moeda
 */
var CurrencyFormatter = Backbone.View.extend(Formatter, {

	initialize: function() {
		
	},
	
	toView: function(value) {
		return accounting.formatNumber(value, 2, ".", ",");
	},
	
	toModel: function(value) {
		return accounting.unformat(value, 2);
	}
});

/**
 * Formatador percentual
 */
var PercentFormatter = Backbone.View.extend(Formatter, {

	initialize: function() {
		
	},
	
	toView: function(value) {
		return accounting.formatNumber(value, 2, ".", ",");
	},
	
	toModel: function(value) {
		return accounting.unformat(value, 2);
	}
});

/**
 * Formatador para Date
 */
var DateFormatter = Backbone.View.extend(Formatter, {

	initialize: function() {
		
	},
	
	toView: function(value) {
		if (value != null) {
			var nDate = new Date(value);
			var options = {year: "numeric", month: "numeric", day: "numeric"};

			var ret = nDate.toLocaleDateString("pt-BR", options);
			
			if (ret.indexOf('-') > -1) {
				ret = ret.replace(/-{1}/gi, '/');
			}
			
			return ret;
		}
		
		return "";
	},
	
	toModel: function(value) {
		if (typeof value == 'string' && value.trim() != "") {
			var sep = '';
			
			if (value.indexOf('/') > -1) {
				sep = '/';
			} else if (value.indexOf('-') > -1) {
				sep = '-';
			} else {
				return "";
			}
			
			var spltDate = value.split(sep);
			var nDate = new Date(spltDate[2],spltDate[1]-1,spltDate[0]);
			
			return nDate.getTime();
		}
		
		return "";
	}
});


