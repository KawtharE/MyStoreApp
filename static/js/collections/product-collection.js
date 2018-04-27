var app = app || {};

(function(){
	'use strict';

	app.Products = Backbone.Collection.extend({
		model: app.Product,
		url: '',
		initialize: function(id){
			this.url = '/stores/'+id+'/products/';
		}
		
	});
})();