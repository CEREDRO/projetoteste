// Filename: main.js

// Require.js allows us to configure shortcut alias
require.config({
	baseUrl: '/fin-web',
	paths: {
		'jquery': 'js/lib/jquery-2.1.0.min',
		'jqueryui': 'js/lib/jquery-ui.min',
		'underscore': 'js/lib/underscore.min',
		'backbone': 'js/lib/backbone.min',
		'bootstrap': 'js/lib/bootstrap.min',
		'templates': 'services',
		'helper': 'js/comp/helper',
		'ajaxStatus': 'js/comp/ajax-status',
		'text': 'js/text',
		'router': 'js/router'
	},
	shim: {
		'jquery': {
			exports: '$'
		},
		'jqueryui' : {
			deps: ['jquery'],
			exports: 'jqueryui'
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
        	deps: ['jquery'],
        	exports: 'ajaxStatus'
        },
        'router':{
        	deps: ['backbone']
        },
        'ka':{
        	deps: ['backbone']
        }
	}
});

require([
	// Load our app module and pass it to our definition function
	'js/app',
], function(App){
	// The "app" dependency is passed in as "App"
	App.initialize(1);
});