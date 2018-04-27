var app = app || {};

(function(){
	'use strict';

	app.Product = Backbone.Model.extend({
		fileAttribute: 'attachment',
		default: {
			id: '',
			storeID: '',
			productName: '',
			productImgURL: '',
			productCategory: '',
			productPrice: '',
			productDescription: ''
		}
	});
})();