var app = app || {};

(function(){
	'use strict';
	
	app.Store = Backbone.Model.extend({
		fileAttribute: 'attachment',
		default: {
			id: '',
			storeName: '',
			storeImgURL: '',
			storeOwnerName: '',
			storeDescription: ''
		}
	});

})();