// Filename: router.js
define([
	'jquery', 
	'underscore', 
	'backbone',
	'verificaSessao',
	'servicos/risco/simplificado/controle/DashboardControle'
], function($, _, Backbone,verificaSessao,DashboardControle) {
	var AppRouter = Backbone.Router.extend({
		routes: {
			// Define some URL routes
			'dashboard': 'showDashboard',
			// Default
			'*actions': 'defaultAction'
		}
	});

	var initialize = function()	{
		var app_router = new AppRouter;
		var curView = null;
		var dashboar = null;
		dashboar = new DashboardControle();
		 
		app_router.on('route:showDashboard', function() {
			if (curView != dashboar) {
				dashboar.render();
				curView = dashboar;
			}
		});
		
		app_router.on('defaultAction', function(actions) {
			// We have no matching route, lets just log what the URL was
			console.log('No route:', actions);
		});

		Backbone.history.start();
		Backbone.history.navigate('/dashboard', true);
		Backbone.history.loadUrl();
	};
  
	return {
		initialize: initialize
	};
});
