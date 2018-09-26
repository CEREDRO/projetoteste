define([
       'servicos/risco/modelo/FormularioModelo'
], function(FormularioModelo) {
   var FormularioColecao = Backbone.Collection.extend({
	
		pessoa: null,
		
		modeloAval: null,
		
		model: FormularioModelo,
		
		urlRoot: 'rest/risco/solicitaavaliacao/formulario',
	     
		url: function(){
			return this.urlRoot + "/" + this.pessoa.get('codigo') + "," + this.modeloAval;
		} 
	});
   return FormularioColecao;
});