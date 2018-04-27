var app = app || {};

(function(){
	'use strict';

	app.StoreListView = Backbone.View.extend({
		el: '#stores',
		initialize: function(){
			this.listenTo(app.storesData, 'change', _.debounce(this.renderUpdate, 300));
			this.listenTo(app.storesData, 'destroy', _.debounce(this.renderUpdate, 300));
			this.render();
		},
		render: function(){
			var self = this;
			_.each(app.storesData.toJSON(), function(item){
				self.renderStore(item);
			});

		},
		renderStore: function(item){
			var store = new app.StoreView({model: item});
		},
		renderUpdate: function(){
			this.$el.empty();
			this.render();
		}
	});
})();