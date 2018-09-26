define([
       'servicos/risco/modelo/GerenciadorLimiteModelo',
       'servicos/risco/modelo/CabecalhoLimiteModelo',
       'servicos/risco/colecao/CabecalhoLimiteColecao',
       'servicos/risco/colecao/DetalheLimiteColecao',
       'servicos/risco/colecao/GrupoLimiteColecao',
       'servicos/risco/colecao/CampoLimiteColecao',
       'servicos/risco/colecao/OperacaoLimiteColecao'
], function(GerenciadorLimiteModelo,CabecalhoLimiteModelo,CabecalhoLimiteColecao,DetalheLimiteColecao,GrupoLimiteColecao,CampoLimiteColecao,OperacaoLimiteColecao) {
   var GerenciadorLimiteColecao = Backbone.Collection.extend({

	    urlRoot: 'rest/risco/gerenciadorlimite',
		model: GerenciadorLimiteModelo,
		pessoa: null,
	     
		parse: function(response, options){
			if (options.parse) {
				$.each(response, function(i, gerenciadorlimite){
					gerenciadorlimite                           = new GerenciadorLimiteModelo(gerenciadorlimite);
					gerenciadorlimite.attributes['detalhes']    = new DetalheLimiteColecao(gerenciadorlimite.get("detalhes"));
					gerenciadorlimite.attributes['cabecalhos']  = new CabecalhoLimiteColecao(gerenciadorlimite.get("cabecalhos"));
					gerenciadorlimite.attributes['grupos']      = new GrupoLimiteColecao(gerenciadorlimite.get("grupos"));
					
					gerenciadorlimite.get("grupos").each(function(grupolimite){
						grupolimite.attributes['cabecalhos']    = new CabecalhoLimiteColecao(grupolimite.get("cabecalhos"));
						grupolimite.attributes['campos']        = new CampoLimiteColecao(grupolimite.get("campos"));
						grupolimite.attributes['operacoes']     = new OperacaoLimiteColecao(grupolimite.get("operacoes"));
						
						grupolimite.get("campos").each(function(campo){
							campo.attributes['cabecalho']     = new CabecalhoLimiteModelo(campo.get("cabecalho"));
						});
						
						grupolimite.get("operacoes").each(function(operacaolimite){
							operacaolimite.attributes['campos']                    = new CampoLimiteColecao(operacaolimite.get("campos"));
							
							operacaolimite.get("campos").each(function(campo){
								campo.attributes['cabecalho']     = new CabecalhoLimiteModelo(campo.get("cabecalho"));
							});
						});
					});
					
					response[i] = gerenciadorlimite;
				});
				
				return response;
			}
		},
		url: function(){
			return this.urlRoot + '/' + this.pessoa.get("codigo");
		} 
	});
   return GerenciadorLimiteColecao;
});