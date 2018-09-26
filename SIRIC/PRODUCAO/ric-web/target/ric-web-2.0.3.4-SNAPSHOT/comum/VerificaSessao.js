define([
	'bootstrap'
], function(Bootstrap) {
	var VerificaSessao = Backbone.View.extend({
		initialize: function() {
			window.count = 29;
		},
		inicializaContador: function(){
			var self = this;
			setTimeout(function(){
				window.count = window.count -1;
		        if(window.count == 0){
		        	self.finalizaSessao();
		        }else{
		        	self.inicializaContador();
		        }
		    }, 60000);
			
		},
		finalizaSessao: function(){
			alert('Sessão Expirada');
			window.location.href = '/ric-web/AppServlet';
		}
	});
	return VerificaSessao;
});