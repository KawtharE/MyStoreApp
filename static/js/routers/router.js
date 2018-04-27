var app = app || {};

(function(){
	'use strict';

	var AppRouter = Backbone.Router.extend({
	    routes: {
	        "/stores/:store_id/products/": "getProduct",
	        "/stores/": "getStores",
	        "*actions": "defaultRoute" 
	        // Backbone will try to match the route above first
	    }
	});
	// Instantiate the router
	app.appRouter = new AppRouter;

	app.appRouter.on('route:getProduct', function (store_id) {
	    console.log( "Get store id " + store_id );   
	});
	app.appRouter.on('route:getStores', function(){
		console.log("back to stores");
	});
	app.appRouter.on('route:defaultRoute', function (actions) {
	    console.log( actions ); 
	});
	// Start Backbone history a necessary step for bookmarkable URL's
	Backbone.history.start();
})();