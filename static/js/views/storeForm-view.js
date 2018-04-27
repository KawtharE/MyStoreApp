var app = app || {};

(function(){
	'use strict';

    	app.StoreFormView = Backbone.View.extend({
    		el: '#new-store',
    		template: _.template($('#store-form-template').html()),
    		events: {
    			'submit #store-form': 'createNewStore',
          'change #store-img': 'updateDefaultImg',
          'click #cancel-upload-img': 'cancelUploadImg'
    		},
    		initialize: function(){
    			this.render();
    		},
    		render(){
    			this.$el.html(this.template());
    			return this;
    		},
        updateDefaultImg: function(){
          var target = $('#default-store-img');
          var src = $(':input[name="store-img"]');
          this.showImage(src, target);
        },
        showImage: function(src, target) {
            var fr = new FileReader();
            fr.onload = function(){
                target.attr('src', fr.result);
            }
            fr.readAsDataURL(src[0].files[0]);
        },
        cancelUploadImg: function(){
          $('#default-store-img').attr('src', '/static/img/stores/store.jpeg');
        },
      	createNewStore: function(){
      		var store_name = $('#store-name').val();
      		var store_description = $('#store-description').val();
      		var store_owner_name = $('#store-owner-name').val();
      		var fileObject = $(':input[name="store-img"]')[0].files[0];

      		var newStore = new app.Store();
      		
          var name = _.clone(newStore.get('storeName'));
          var owner_name = _.clone(newStore.get('storeOwnerName'));
          var description = _.clone(newStore.get('storeDescription'));
          var img = _.clone(newStore.get('attachment'));

          name = store_name;
          description = store_description;
          owner_name = store_owner_name;

      		newStore.set('storeName', name);
      		newStore.set('storeDescription', description);
      		newStore.set('storeOwnerName', owner_name);

          if (fileObject == undefined){
             var imgToFile = new app.ImgToFile();
             img = imgToFile.toJSON().attachment;
          } else {
             img = fileObject;
          }
          newStore.set('attachment', img);


          
          newStore.save(null, {url: '/new-store', method: 'POST', success: function(){
              var store = new app.StoreView({model: newStore.toJSON()[0]});
              app.storesData.add(new app.Store(newStore.toJSON()[0]));
          }});  		
      		
      		this.render();
      		 return false;
      	}
	});
})();