/************************************************************************
 * Classe BrokerConfig													*
 ************************************************************************
 * Define informacoes de configuracao para utilizar em instancias de	*
 * Broker.																*
 ************************************************************************
 * @author eduardo	(erdasilva@indracompany.com)						*
 ************************************************************************
 * Dependencias: 														*
 * 																		*
 * 		jquery.js														*
 * 		prototype.js 1.7.1 (customizado) 								*
 * 		ajax-status.js													*
 * 		message.js														*
 * 		error.js														*
 * 		bundle.js														*
 * 																		*
 ************************************************************************ 
 * Utilizacao:															*
 * 																		*
 * 	$caixa.brokerConfig = $caixa.brokerConfig || new BrokerConfig(		*
 * 		$caixa.ajaxStatus,												*			
 * 		$caixa.message,													*
 * 		$caixa.errorManager,											*
 * 		$caixa.bundle,													*
 *		3, //maxTry														*
 *		'MW_001', //maxTryWarn											*
 *		100 //waitTime													*
 * 	);																	*
 ************************************************************************/

var BrokerConfig = Backbone.View.extend({
	
	/**
	 * Construtor.
	 */
	initialize: function(
			ajaxStatus, 
			message, 
			errorManager, 
			bundle, 
			maxTry,
			maxTryWarn,
			waitTime) {
		this.values = {
			'ajaxStatus': 	ajaxStatus,
			'message': 		message,
			'errorManager': errorManager, 
			'bundle': 		bundle,
			'maxTry': 		maxTry,
			'maxTryWarn': 	maxTryWarn,
			'waitTime': 	waitTime
		};
	},
	
	ajaxStatus: function() {
		return this.values['ajaxStatus'];
	},
	
	message: function() {
		return this.values['message'];
	},
	
	errorManager: function() {
		return this.values['errorManager'];
	},
	
	bundle: function() {
		return this.values['bundle'];
	},
	
	maxTry: function() {
		return this.values['maxTry'];
	},
	
	maxTryWarn: function() {
		return this.values['maxTryWarn'];
	},
	
	waitTime: function() {
		return this.values['waitTime'];
	},
	
	all: function() {
		return this.values;
	}
});

/************************************************************************
 * Classe Broker														*
 ************************************************************************
 * Define algoritmos e estruturas para iteracao com o broker.			*
 ************************************************************************
 * @author eduardo														*
 ************************************************************************
 * Dependencias: 														*
 * 																		*
 * 		jquery.js														*
 * 		prototype.js 1.7.1 (customizado) 								*
 * 		ajax-status.js													*
 * 		message.js														*
 * 		error.js														*
 * 		bundle.js														*
 ************************************************************************ 
 * Utilizacao:															*
 * 																		*
 * //Cria uma subclasse de Broker										*
 * var SimulaContratacaoBroker = Class.create(Broker, {					*
 * 																		*
 * 		buildAskParams: function() {									*
 *			return {													*
 *				"valorLiquidoReceber":$('#idValorLiquido').val(),		*
 *				"prazoContratacao":$('#idPrazo').val(),					*
 *			};															*
 *		},																*
 *																		*	
 *		processAnswer: function(data, _this) {							*
 *			if(data.codigoRetorno != "X5"								*
 *				var dados = data.dados.resultadoSimulacao;				*
 *																		*
 *				$('#tx_juros').html(dados.taxaJuros);					*
 *				$('#cet_mensal').html(dados.cetMensal);					*
 *				$('#cet_anual').html(dados.cetAnual);					*
 *			} else {													*
 *				this.brokerConfig.message().processMessage(				*
 *					this.brokerConfig.message().warnMessage(			*
 *						data.mensagemRetorno));							*
 *			}															*
 *		}																*
 * });																	*
 * 																		*
 * //Instancia o objeto													*
 * var simulaContratoBroker = new SimulaContratacaoBroker(				* 
 * 		'simulaContratoBroker', 										*
 * 		'emprest/contrato/', 											*
 *      'solicitaSimulacaoContratacao',									* 
 *      'recebeSimulacaoContratacao',									*
 *		$caixa.brokerConfig												*
 * );																	*
 * 																		*
 * //Acionar o broker													*
 * simulaContratoBroker.ask()											*
 ************************************************************************/
var Broker = Backbone.View.extend({

	/**
	 * Construtor.
	 *
	 * @param brokerId Identificador do objeto broker utilizado para log no console do browser
	 * @param rootServiceURL URL base dos servicos
	 * @param askService Servico de solicitacao
	 * @param answerService Servico de resposta
	 * @param ajaxStatus Objetos de status de requisicoes ajax
	 * @param message Objeto de mensagem
	 * @param maxTry Numero maximo de tentativas
	 */
	initialize: function(
			brokerId, 
			rootServiceURL, 
			askService, 
			answerService,
			brokerConfig) {
		this.brokerId = brokerId;
		this.rootServiceURL = rootServiceURL;
		this.askService = askService;
		this.answerService = answerService;
		this.lastCorrelation = null;
		this.brokerConfig = brokerConfig;
	},

	/**
	 * Responsavel por construir o objeto de dados a ser enviado.
	 * Devera ser sobrescrito.
	 */
	buildAskParams: function() {
		return null;
	},
	
	/**
	 * Executa servico de solicitacao.
	 */
	ask: function() {
		this.brokerConfig.message().close();
		this.brokerConfig.ajaxStatus().start();
		var _this = this;
		
		$.ajax({
			type: 'POST',
			url: this.rootServiceURL + this.askService,
			dataType: 'json',
			contentType: 'application/json',
			data: JSON.stringify({
				dados: this.buildAskParams()
			}),
			success: function(data, textStatus, jqXHR) {
				console.log(data);
				_this.lastCorrelation = data; 
				
				setTimeout(function() {
					_this.answer(0);
				}, _this.brokerConfig.waitTime());
			},
			error: function(jqXHR, textStatus, errorThrown){
				_this.brokerConfig.ajaxStatus().stop();
				_this.brokerConfig.errorManager().ajaxError(
						jqXHR, 
						textStatus, 
						errorThrown);
			}
		});
	},
	
	/**
	 * Processa a resposta.
	 * Deve ser sobrescrito.
	 */
	processAnswer: function(data, _this) {
		
	},
	
	/**
	 * Executa chamada para obtencao da resposta do broker.
	 */
	answer: function(count) {
		console.log(this.brokerId + '.answer(' + count + ')');
		console.log(this.brokerId + 'correlatioId: ' + this.lastCorrelation.id);
		
		this.brokerConfig.message().close();
		var _this = this;
	
		$.ajax({
			type: 'GET',
			contentType: 'application/json',
			url: this.rootServiceURL + this.answerService + '/' + this.lastCorrelation.id,
			dataType: "json", 
			success: function(data, textStatus, jqXHR) {
				if (data != undefined) {
					_this.processAnswer(data, _this);
					
					_this.brokerConfig.ajaxStatus().stop();
				} else {
					if (_this.count <= _this.brokerConfig.maxTry()) {
						setTimeout(function() {
							_this.answer(++_this.count);
						}, _this.brokerConfig.waitTime());
					} else {
						_this.brokerConfig.message().processMessage(
							_this.brokerConfig.message().warnMessage(
								_this.brokerConfig.bundle().convert(
									_this.brokerConfig.maxTryWarn()
								)
							)
						);
						
						_this.brokerConfig.ajaxStatus().close();
					}
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
				_this.brokerConfig.ajaxStatus().close();
				_this.brokerConfig.errorManager().ajaxError(
					jqXHR, 
					textStatus, 
					errorThrown);
			}
		});	
	}
});


