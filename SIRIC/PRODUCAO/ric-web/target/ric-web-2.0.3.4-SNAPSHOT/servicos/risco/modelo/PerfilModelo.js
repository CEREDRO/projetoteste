define([
], function() {
	var PerfilModelo = Backbone.Model.extend({
	
		urlRoot: 'rest/risco/permissao',
		
		defaults: function() {
			return {
				ocorrencia: null,
				quadro: null,
				relacionamento: null, 
				modeloavaliacao: null, 
				tipopessoa: null,
				objeto: null
			};
		},
	
		url: function() {
			return this.urlRoot;
		},
		hasOcorrencia: function(id, action) {
			return this.get("ocorrencia") ? (this.get("ocorrencia")[id] ? (this.get("ocorrencia")[id][action] ? this.get("ocorrencia")[id][action] : false) : false) : false;
		},
		hasQuadro: function(id, action) {
			return this.get("quadro") ? (this.get("quadro")[id] ? (this.get("quadro")[id][action] ? this.get("quadro")[id][action] : false) : false) : false;
		},
		hasRelacionamento: function(id, action) {
			return this.get("relacionamento") ? (this.get("relacionamento")[id] ? (this.get("relacionamento")[id][action] ? this.get("relacionamento")[id][action] : false) : false) : false;
		},
		hasModeloAvaliacao: function(id, action) {
			return this.get("modeloavaliacao") ? (this.get("modeloavaliacao")[id] ? (this.get("modeloavaliacao")[id][action] ? this.get("modeloavaliacao")[id][action] : false) : false) : false;
		},
		hasTipoPessoa: function(id, action) {
			return this.get("tipopessoa") ? (this.get("tipopessoa")[id] ? (this.get("tipopessoa")[id][action] ? this.get("tipopessoa")[id][action] : false) : false) : false;
		},
		hasObjeto: function(id) {
			return this.get("objeto") ? (this.get("objeto")[id] ? (this.get("objeto")[id][99] ? this.get("objeto")[id][99] : false) : false) : false;
		},
	});
	return PerfilModelo;
});