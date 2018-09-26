
var HtmlControl = Backbone.View.extend({
	
	/**
	 * Construtor.
	 * 
	 */
	initialize: function() {
		this.id = null;
		this.el = null;
	},
	
	setId: function(id) {
		this.id = id;
		this.el = $('#'+id);
	},
	
	/**
	 * Desabilita o controle
	 */
	disable: function() {
		this.el.attr('disabled', true);
		
		return this;
	},
	
	/**
	 * Habilita o controle
	 */
	enable: function() {
		this.el.removeAttr('disabled');
		
		return this;
	},
	
	/**
	 * Exibe o controle
	 */
	show: function() {
		this.el.show();
		
		return this;
	},
	
	/**
	 * Esconde o controle
	 */
	hide: function() {
		this.el.hide();
		
		return this;
	},
	
	/**
	 * Limpa o controle.
	 * A semantica de limpeza devera ser especifica para cada componente
	 */
	clear: function() {
	
		return this;
	}
});

var HtmlContainer = Backbone.View.extend(HtmlControl, {
	
	/**
	 * Construtor.
	 * 
	 */
	initialize: function() {
		this.content = '';
		this.formatter = null;
	},
	
	/**
	 * Define um formatador para a input
	 */
	useFormatter: function(formatter) {
		this.formatter = formatter;
		
		return this;
	},
	
	/**
	 * Especifica o valor da input
	 * 
	 * @param value
	 * @returns this
	 */
	set: function(value) {
		if (this.formatter != null) {
			this.content = this.formatter.toModel(value);
			this.el.html(this.formatter.toView(this.content));
		} else {
			this.content = value;
			this.el.html(value);
		}
		
		return this;
	},
	
	/**
	 * Limpa o valor da input
	 * 
	 * @returns this
	 */
	clear: function() {
		this.set('');
		
		return this;
	}
});

var InputText = Backbone.View.extend(HtmlControl, {
	
	/**
	 * Construtor.
	 * 
	 */
	initialize: function() {
		this.text = '';
		this.formatter = null;
	},
	
	/**
	 * Define um formatador para a input
	 */
	useFormatter: function(formatter) {
		this.formatter = formatter;
		
		return this;
	},
	
	/**
	 * Especifica o valor da input
	 * 
	 * @param value
	 * @returns this
	 */
	set: function(value) {
		if (this.formatter != null) {
			this.text = this.formatter.toModel(value);
			this.el.val(this.formatter.toView(this.text));
		} else {
			this.text = value;
			this.el.val(this.text);
		}
		
		return this;
	},
	
	/**
	 * Retorna o valor da input
	 * 
	 * @returns
	 */
	get: function() {
		if (this.formatter != null) {
			this.text = this.formatter.toModel(this.el.val());
		} else {
			this.text = this.el.val();
		}
		
		return this.text;
	},
	
	/**
	 * Limpa o valor da input
	 * 
	 * @returns this
	 */
	clear: function() {
		this.set('');
		
		return this;
	}
});

/**
 * Classe que representa um textarea
 */
var InputTextArea = Backbone.View.extend(InputText, {
	
	/**
	 * Construtor.
	 * 
	 */
	initialize: function($super) {
		$super.call();
	},

	/**
	 * Define o numero maximo de caracteres.
	 * 
	 * @param max
	 */
	maxChars: function(max) {
		this.max = max;
	}
});

/**
 * Representa uma select.
 */
var Select = Backbone.View.extend(HtmlControl, {
	
	/**
	 * Construtor.
	 * 
	 */
	initialize: function() {
		this.multiselect = false;
	},
	
	/**
	 * Verifica se a select aceita selecao de multiplos itens.
	 * 
	 * @returns {Boolean}
	 */
	isMultiple: function() {
		return this.el.attr('multiple') != null;
	},
	
	/**
	 * Retorno o valor do item selecionado.
	 * 
	 * @returns
	 */
	selected: function() {
		return $('#' + this.id + ' option:selected').val();
	},
	
	/**
	 * Retorna o texto do item selecionado.
	 * 
	 * @returns
	 */
	textSelected: function() {
		return $('#' + this.id + ' option:selected').text();
	},
	
	/**
	 * Seleciona um item pelo valor.
	 * 
	 * @param value
	 */
	select: function(value) {
		if (!this.isMultiple()) {
			this.el.val(value);
		}
		
		if (value instanceof Array) {
			var attr;
			
			for (var i = 0; i < value.length; i++) {
				$('#' + this.id + ' option').each(function() {
					if (this.value == value[i]) {
						attr = document.createAttribute('selected');
						attr.value = 'true';
						this.setAttributeNode(attr);
					}
				});
			}
		}
		
		return this;
	},
	
	/**
	 * Seleciona um item pelo indice.
	 * 
	 * @param index
	 */
	selectByIndex: function(index) {
		this.el.prop('selectedIndex', index);
		
		return this;
	},
	
	/**
	 * Limpa qualquer selecao
	 */
	clear: function() {
		 $('#' + this.id + ' option:selected').removeAttr('selected');
		 
		 return this;
	}
});

/**
 * Classe que representa um grupo de radio baseado no nome.
 */
var RadioGroup = Backbone.View.extend(HtmlControl, {
	
	/**
	 * Construtor.
	 * 
	 */
	initialize: function(name) {
		this.name = name;
	},
	
	/**
	 * Retorna o item selecionado.
	 */
	selected: function() {
		//TODO: Implementar
		
		return this;
	},
	
	/**
	 * Retorna o texto do item selecionado.
	 */
	textSelected: function() {
		//TODO: Implementar
		
		return this;
	},

	/**
	 * Selecione um item baseado no valor.
	 * 
	 * @param value
	 */
	select: function(value) {
		//TODO: Implementar
		
		return this;
	},
	
	/**
	 * Seleciona um item baseado no indice do mesmo.
	 * 
	 * @param index
	 */
	selectByIndex: function(index) {
		//TODO: Implementar
		
		return this;
	},
	
	/**
	 * Limpa qualquer selecao.
	 */
	clear: function() {
		//TODO: Implementar
		
		return this;
	}
});

/**
 * Classe que representa um grupo de check.
 */
var CheckGroup = Backbone.View.extend(HtmlControl, {
	
	/**
	 * Construtor.
	 * 
	 */
	initialize: function() {
		
	},
	
	/**
	 * Retorna array com os valores selecionados.
	 */
	selectedItems: function() {
		//TODO: Implementar
		return this;
	},
	
	/**
	 * Seleciona um determinado item.
	 * 
	 * @param value Codigo do item
	 */
	select: function(value) {
		//TODO: Implementar
		return this;
	},
	
	/**
	 * Retira a selecao de um determinado item.
	 * 
	 * @param value Codigo do item
	 */
	unselect: function(value) {
		//TODO: Implementar
		return this;
	},
	
	/**
	 * Limpa todos os itens selecionados
	 */
	clear: function() {
		//TODO: Implementar
		return this;
	}
});

var Button = Backbone.View.extend(HtmlControl, {
	
	/**
	 * Construtor.
	 * 
	 */
	initialize: function() {
		
	},
	
	click: function() {
		
	}
});

var Modal = Backbone.View.extend({

	/**
	 * Construtor.
	 * 
	 */
	initialize: function() {
		this.id = null;
		this.el = null;
	},
	
	setId: function(id) {
		this.id = id;
		this.el = $('#'+id);
	},
	
	open: function() {
		this.el.modal('show');
	},
	
	close: function() {
		this.el.modal('hide');
	}
});
