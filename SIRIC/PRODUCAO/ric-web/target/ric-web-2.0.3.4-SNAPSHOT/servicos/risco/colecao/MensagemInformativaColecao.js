define([
       'servicos/risco/modelo/MensagemInformativaModelo'
], function(MensagemInformativaModelo) {
   var MensagemInformativaColecao = Backbone.Collection.extend({
	
		pessoa: null,
		index:  1,
		
		model: MensagemInformativaModelo,
		
		urlRoot: 'rest/risco/mensageminformativa/1,1',
	     
		url: function(){
			return this.urlRoot;
		} 
	});
   return MensagemInformativaColecao;
});