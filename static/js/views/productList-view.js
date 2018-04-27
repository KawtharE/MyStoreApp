var app = app || {};

(function(){
	'use strict';

	app.ProductListView = Backbone.View.extend({
		initialize: function(id){
			app.productsData = new app.Products(id);
			this.listenTo(app.productsData, 'change', _.debounce(this.renderUpdate, 300));
			this.listenTo(app.productsData, 'destroy', _.debounce(this.renderUpdate, 300));
			this.render();
		},
		render: function(){
			var self = this;
			app.productsData.fetch({silent: true,
				success: function(response) {
					if (app.productsData.length == 0) {
						$('#products').html('<h3>There is no Products registred for this Store!</h3>')
					}
					_.each(response.toJSON(), function(item){

						self.renderProduct(item);
					});
				},
				error: function (errorResponse) {
				       console.log(errorResponse)
				}
			});
		},
		renderProduct: function(item){
			var product = new app.ProductView({model: item});
		},
		renderUpdate: function(){
			$('#products').empty();
			this.render();
		}
	});
})();