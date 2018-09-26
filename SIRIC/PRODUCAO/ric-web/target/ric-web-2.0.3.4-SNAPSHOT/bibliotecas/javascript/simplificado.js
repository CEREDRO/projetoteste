// Filename: main.js
// Require.js allows us to configure shortcut alias
require.config({
	baseUrl: '/ric-web',
	paths: {
		'jquery': 'layout/js/jquery-2.1.0.min',
		'jqueryui': 'layout/js/jquery-ui.min',
		'underscore': 'layout/js/underscore',
		'backbone': 'layout/js/backbone',
		'bootstrap': 'layout/js/bootstrap.min',
		'templates': 'servicos/risco/visao',
		'helper': 'bibliotecas/javascript/componentes/helper',
		'ajaxStatus': 'bibliotecas/javascript/componentes/ajax-status',
		'text': 'bibliotecas/javascript/text',
		'router': 'bibliotecas/javascript/simplificado-router',
		'navigator': 'bibliotecas/javascript/componentes/navigator',
		'message': 'bibliotecas/javascript/componentes/message',
		'userProfile': 'bibliotecas/javascript/componentes/userProfile',
		'global': 'bibliotecas/javascript/global',
		'jqueryMask': 'layout/js/jquery.maskedinput',
		'alphanum': 'layout/js/jquery.alphanum',
		'price-format': 'layout/js/jquery.price-format.min',
		'verificaSessao': 'comum/VerificaSessao'
	},
	shim: {
		'jquery': {
			exports: '$'
		},
		'jqueryui' : {
			deps: ['jquery'],
			exports: 'jqueryui'
		},
		'jqueryMask': {
			deps: ['jqueryui'],
			exports: 'jqueryMask'
		},
		'price-format':{
			deps: ['jqueryMask'],
			exports: 'price-format'
		},
		'underscore': {
			exports: '_'
		},
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},
		'bootstrap': {
            deps: ['jquery'],
            exports: 'bootstrap'
        },
        'ajaxStatus': {
        	deps: ['backbone'],
        	exports: 'ajaxStatus'
        },
        'router':{
        	deps: ['backbone']
        },
        'global':{
        	deps: ['navigator','message','underscore'],
        	exports: 'global'
        },
        'verificaSessao':{
        	deps: ['jquery','backbone'],
        	exports: 'verificaSessao'
        }
	}
});
require([
	// Load our app module and pass it to our definition function
	'bibliotecas/javascript/simplificado-app',
], function(App){
	// The "app" dependency is passed in as "App"
	App.initialize();
});
