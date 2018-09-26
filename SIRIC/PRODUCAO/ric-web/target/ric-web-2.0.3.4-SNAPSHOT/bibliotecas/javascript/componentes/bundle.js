/* ****************************************************************
 * Componente de Bundle
 ****************************************************************** */

//Namespaces

var Bundle = Backbone.View.extend({
	
	/**
	 * Construtor
	 */
	path: null,
	
	basename: null,
	/*
	initialize: function() {
		
	},
	*/
	
	/**
	 * Seleciona a linguagem.
	 */
	selectLang: function(lang) {
		var _this = this;
		
		jQuery.i18n.properties({
			name: _this.basename,
			path: _this.path,
			language:lang,
			encoding: "UTF-8",
			mode: 'both',
			callback:function(){
				_this.convertAll();
			}
		});
	},
	
	convertAll: function() {
		var _this = this;
		
		$('MD').each(
			function() {
				var label = $(_this).attr('label'); 
				$(_this).text($.i18n.prop('MD.'+label));
			}
		);
		$('ME').each(
			function() {
				var label = $(_this).attr('label'); 
				$(_this).text($.i18n.prop('ME.'+label));
			}
		);
		$('MN').each(
			function() {
				var label = $(_this).attr('label'); 
				$(_this).text($.i18n.prop('MN.'+label));
			}
		);
	},
	
	convert: function(key) {
		return $.i18n.prop(key);
	}
});
