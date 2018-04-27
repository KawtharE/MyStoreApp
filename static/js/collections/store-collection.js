var app = app || {};

(function(){
	'use strict';

	app.Stores = Backbone.Collection.extend({
		model: app.Store,
		url: '/stores/',
		initialize: function(){
			this.fetch({silent: true,
				success: function(collection, response) {
					console.log("collection fetched successfully!");
				},
				error: function (errorResponse) {
				       console.log(errorResponse);
				}
			});
		}
	});
	app.storesData = new app.Stores();
})();