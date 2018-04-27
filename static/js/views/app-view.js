var app = app || {};

(function(){
	'use strict';

	app.AppView = Backbone.View.extend({
		el: '#main',
		events:{
			'click .header': 'displayForm'
		},
		initialize: function(){	
			$('#fieldset1').hide();
			this.render();
		},
		render: function(){
			new app.StoreFormView();
			new app.StoreListView();
	    	
		},
        displayForm: function(){
          $('#fieldset1').slideToggle("slow", function () {
              console.log("success");
          });
        }
	});
})();


