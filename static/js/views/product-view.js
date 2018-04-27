var app = app || {};

(function(){
	'use strict';

	app.ProductView = Backbone.View.extend({
		template: _.template($('#product-template').html()),
		events: {
			'click #edit-product': 'getCurrentProduct',
			'click #delete-product': 'getCurrentProduct'
		},
		initialize: function(){
			this.render();
		},
		render: function(){
			this.$el.html(this.template({product: this.model}));
			$('#products').prepend(this.$el);
			return this;
		},
		getCurrentProduct: function(){
			app.currentProduct = new app.Product(this.model);
		}
	});
})();