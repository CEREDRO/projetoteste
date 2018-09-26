/***
 * @author c110503
 * 
 * JS usuado para carregar dentro do acordion do modal de versões a versão de cada modulo.
 * 
 */
$(document).ready(function() {
	// Carraga versao do SIFEC
	$("#sifec").click(function() {
		$.get('./versao.html', function(data) {
			console.log(data);
			$('#sifecVersoes').append(data);
		});
	});
	$("#siap_siapx").click(function() {
		$.get('/apx-web/versao.html', function(data) {
			console.log(data);
			$('#siap_siapxVersoes').append(data);
		});
	});
	$("#siemp").click(function() {
		$.get('/emp-web/versao.html', function(data) {
			console.log(data);
			$('#siempVersoes').append(data);
		});
	});
	$("#sifes").click(function() {
		$.get('/fes-web/versao.html', function(data) {
			console.log(data);
			$('#sifesVersoes').append(data);
		});
	});
	$("#siarc").click(function() {
		$.get('/arc-web/versao.html', function(data) {
			console.log(data);
			$('#siarcVersoes').append(data);
		});
	});
});