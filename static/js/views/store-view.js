var app = app || {};

(function(){
	'use strict';

    // Create a layout class
    app.Layout = Backbone.Marionette.View.extend({
        template: _.template($('#modals-template').html()),
        regions: {
          modals: {
            el: '.modals-container',
            regionClass: Backbone.Marionette.Modals
          }
        }
    });

    // Create a modal view class
    app.ShowModal = Backbone.Modal.extend({
        template: _.template($('#show-modal-template').html()),
        cancelEl: '.bbm-button',
        keyControl: false,
        events: {
          'click #edit-product': 'openEditModal',
          'click #delete-product': 'openDeleteModal',
          'click .bbm-button': 'closeModal'
        },
        onShow: function() {
          this.displayAllProducts();
          console.log('open');
        },
        onDestroy: function() {
          console.log('close');
        },
        onRender: function() {
          console.log('render');
        },
        openEditModal: function(e) {
          console.log('open edit Modal');
          e.preventDefault();
          app.editProductModal = new app.EditProductModal();
          app.editProductModal.store = this.model;
          app.modalsRegion.show(app.editProductModal);
        },
        openDeleteModal: function(e){
          console.log('open delete Modal');
          e.preventDefault();
          app.deleteProductModal = new app.DeleteProductModal();
          app.deleteProductModal.store = this.model;
          app.modalsRegion.show(app.deleteProductModal);
        },
        displayAllProducts: function(){
          new app.ProductListView(this.model.toJSON().id);
        },
        closeModal: function(){
           app.appRouter.navigate("", {trigger: true});
        }
    });

    app.EditProductModal = Backbone.Modal.extend({
        template: _.template($('#edit-product-modal-template').html()),
        cancelEl: '.bbm-button',
        submitEl: '#update-product-btn',
        keyControl: false,
        events: {
          'click .bbm-button': 'closeModal',
          'change #update-product-img': 'updateProductImg',
          'click #cancel-upload-pro-img': 'cancelUpdatedImg'
        },
        beforeSubmit: function(){
          this.updateProduct();
          app.modalsRegion.destroy();
          this.closeModal();
          return false;
        },
        onShow: function(){
          app.appRouter.navigate("/stores/"+this.store.toJSON().id+"/products/"+app.currentProduct.toJSON().id+"/edit/", {trigger: true});
          $('.bbm-modal__section').ready(function(){
            $('#current-product-img').attr('src', '/static/img/products/'+app.currentProduct.toJSON().productImgURL);
            $('#update-product-name').attr('value', app.currentProduct.toJSON().productName);
            $('#update-product-description').attr('value', app.currentProduct.toJSON().productDescription);
            $('#update-product-price').attr('value', app.currentProduct.toJSON().productPrice);
            $('#update-product-category').attr('value', app.currentProduct.toJSON().productCategory);
          });
        },
        onRender: function() {
          console.log('render 2');
        },
        onDestroy: function() {
          console.log('close 2');
        },
        updateProductImg: function(){
          var self = this;
          $('.bbm-modal__section').ready(function(){
            var target = $('#current-product-img');
            var src = $(':input[name="update-product-img"]');
            self.showImg(src, target);
          });
        },
        showImg: function(src, target){
          var fr = new FileReader();
          fr.onload = function(){
            target.attr('src', fr.result);
          }
          fr.readAsDataURL(src[0].files[0]);
        },
        cancelUpdatedImg: function(){
          $('#current-product-img').attr('src', '/static/img/products/'+app.currentProduct.toJSON().productImgURL);
        },
        updateProduct: function(){
          var self = this;
          var product = app.productsData.get(app.currentProduct.toJSON().id);
          $('.bbm-modal__section').ready(function(){
            var newName = $('#update-product-name').val();
            var newDescription = $('#update-product-description').val();
            var newPrice = $('#update-product-price').val();
            var newCategory = $('#update-product-category').val();
            var newImg = $(':input[name="update-product-img"]')[0].files[0];

            if (newImg == undefined){
                var imgToFile = new app.ImgToFile();
                newImg = imgToFile.toJSON().attachment;
            }else{
                var newImgUrl = newImg.name;
                var productImgUrl = _.clone(product.get('productImgURL'));
                productImgUrl = newImgUrl;
                product.set('productImgURL', productImgUrl);
            }

            var productImg = _.clone(product.get('attachment'));
            var productName = _.clone(product.get('productName'));
            var productDescription = _.clone(product.get('productDescription'));
            var productPrice = _.clone(product.get('productPrice'));
            var productCategory = _.clone(product.get('productCategory'));

            productImg = newImg;
            productName = newName;
            productDescription = newDescription;
            productPrice = newPrice;
            productCategory = newCategory;

            product.set('attachment', productImg);
            product.set('productName', productName);
            product.set('productDescription', productDescription);
            product.set('productPrice', productPrice);
            product.set('productCategory', productCategory);
            product.save(null, {url:'/stores/'+product.toJSON().storeID+'/products/'+product.toJSON().id+'/edit/', method: 'POST', success: function(){
              var productToUpdate = new app.Product(product.toJSON()[0]);
              app.productsData.set({productToUpdate},{remove: false, add: false});
            }});

          });

        },
        closeModal: function(){
           app.appRouter.navigate("/stores/"+this.store.toJSON().id+"/products/", {trigger: true});
        }
    });

    app.DeleteProductModal = Backbone.Modal.extend({
        template: _.template($('#delete-product-modal-template').html()),
        cancelEl: '.bbm-button',
        submitEl: '#delete-product-btn',
        keyControl: false,
        events: {
          'click .bbm-button': 'closeModal'
        },
        beforeSubmit: function(){
          this.deleteProduct();
          app.modalsRegion.destroy();
          this.closeModal();
          return false;
        },
        deleteProduct: function(){
          var product = app.productsData.get(app.currentProduct.toJSON().id);
          product.destroy();
        },
        closeModal: function(){
           app.appRouter.navigate("/stores/"+this.store.toJSON().id+"/products/", {trigger: true});
        }
    });
    // Create a modal to add new Product to Store
    app.AddProductModal = Backbone.Modal.extend({
        template: _.template($('#add-product-modal-template').html()),
        cancelEl: '.bbm-button',
        submitEl: '#new-product-btn',
        keyControl: false,
        events: {
          'click .bbm-button': 'closeModal',
          'change #product-img': 'uploadProductImg',
          'click #cancel-new-pro-img': 'cancelUpload' 
        },
        beforeSubmit: function() { 
          this.createNewProduct();
          this.destroy();
          this.closeModal();
          return false; 
        },
        uploadProductImg: function(){
          var self = this;
          $('.bbm-modal__section').ready(function(){
            var src = $(':input[name="product-img"]');
            var target = $('#default-product-img');
            self.showImg(src, target);
          });
        },
        showImg: function(src, target){
          var fr = new FileReader();
          fr.onload = function(){
            target.attr('src', fr.result);
          }
          fr.readAsDataURL(src[0].files[0]);

        },
        cancelUpload: function(){
          $('#default-product-img').attr('src', '/static/img/products/products-and-services.jpg');
        },
        createNewProduct: function(){
          var self = this;
          $('.bbm-modal__section').ready(function(){
            var storeID = self.model.id;
            var productName = $('#product-name').val();
            var productDescription = $('#product-description').val();
            var productPrice = $('#product-price').val();
            var productCategory = $('#product-category').val();
            var fileObject = $(':input[name="product-img"]')[0].files[0];

            var newProduct = new app.Product();

            var pStoreID = _.clone(newProduct.get('storeID'));
            var pName = _.clone(newProduct.get('productName'));
            var pDescription = _.clone(newProduct.get('productDescription'));
            var pPrice = _.clone(newProduct.get('productPrice'));
            var pCategory = _.clone(newProduct.get('productCategory'));
            var pImg = _.clone(newProduct.get('attachment'));

            pStoreID = storeID;
            pName = productName;
            pDescription = productDescription;
            pPrice = productPrice;
            pCategory = productCategory;

            newProduct.set('storeID', pStoreID);
            newProduct.set('productName', pName);
            newProduct.set('productDescription', pDescription);
            newProduct.set('productPrice', pPrice);
            newProduct.set('productCategory', pCategory);

            if (fileObject == undefined){
              var imgToFile = new app.ImgToFile();
              pImg = imgToFile.toJSON().attachment;
            } else {
              pImg = fileObject;
            }

            newProduct.set('attachment', pImg);

            newProduct.save(null, {url: '/stores/'+self.model.id+'/new-product/', method:'POST', success: function(){
                var productView = new app.ProductView({model: newProduct.toJSON()[0]});
                self.openProductsModal();

            }})

          });
        },
        openProductsModal: function(){
          var myLayout = new app.Layout();
          app.modalsRegion = myLayout.getRegion('modals');
          $('.app').append(myLayout.render().el);
          app.modalsRegion.show(new app.ShowModal({model: new app.Store(this.model)}));
        },
        closeModal: function(){
           app.appRouter.navigate("", {trigger: true});
        }
    });

    // Create a modal to Edit Store's Details
    app.EditModal = Backbone.Modal.extend({
        template: _.template($('#edit-modal-template').html()),
        cancelEl: '.bbm-button',
        submitEl: '#update-btn',
        keyControl: false,
        events: {
          'click .bbm-button': 'closeModal',
          'change #update-store-img': 'uploadNewImg',
          'click #cancel-update-store-img': 'cancelUpload'
        },
        beforeSubmit: function() { 
          this.updateStore();
          this.destroy();
          this.closeModal();
          return false; 
        },
        onShow: function(){
          var self = this;
          this.model = this.model.toJSON();
          $('.bbm-modal__section').ready(function(){
            $('#current-store-img').attr('src', '/static/img/stores/'+self.model.storeImgURL);
            $('#update-store-name').attr('value', self.model.storeName);
            $('#update-store-owner-name').attr('value', self.model.storeOwnerName);
            $('#update-store-description').attr('value', self.model.storeDescription);
          });
        },
        uploadNewImg: function(){
          var self = this;
          $('.bbm-modal__section').ready(function(){
            var src = $(':input[name="update-store-img"]');
            var target = $('#current-store-img');
            self.showImg(src, target);
          });
        },
        showImg: function(src, target){
          var fr = new FileReader();
          fr.onload = function(){
            target.attr('src', fr.result);
          }
          fr.readAsDataURL(src[0].files[0]);
        },
        cancelUpload: function(){
          $('#current-store-img').attr('src', '/static/img/stores/'+this.model.storeImgURL);
        },
        updateStore: function(){
          var self = this;
          var store = app.storesData.get(this.model.id);

          $('.bbm-modal__section').ready(function(){
            var newName = $('#update-store-name').val();
            var newOwnerName = $('#update-store-owner-name').val();
            var newDescription = $('#update-store-description').val();

            var newImg = $(':input[name="update-store-img"]')[0].files[0];
            
            if (newImg == undefined){
                var imgToFile = new app.ImgToFile();
                newImg = imgToFile.toJSON().attachment;
            }else{
                var newImgUrl = newImg.name;
                var storeImgUrl = _.clone(store.get('storeImgURL'));
                storeImgUrl = newImgUrl;
                store.set('storeImgURL', storeImgUrl);
            }
            
            var storeImg = _.clone(store.get('attachment'));
            var storeName = _.clone(store.get('storeName'));
            var storeOwnerName = _.clone(store.get('storeOwnerName'));
            var storeDescription = _.clone(store.get('storeDescription'));

            storeImg = newImg;
            storeName = newName;
            storeOwnerName = newOwnerName;
            storeDescription = newDescription;

            store.set('attachment', storeImg);
            store.set('storeName', storeName);
            store.set('storeOwnerName', storeOwnerName);
            store.set('storeDescription', storeDescription);

            store.save(null, {url: '/stores/'+self.model.id+'/edit/', method:'POST', success: function(){
              var storeToUpdate = new app.Store(store.toJSON()[0]);
              app.storesData.set({storeToUpdate},{remove: false, add: false});
            }});
            
          });
        },
        closeModal: function(){
           app.appRouter.navigate("", {trigger: true});
        }
    });

    // Create a modal to delete Store
    app.DeleteModal = Backbone.Modal.extend({
        template: _.template($('#delete-modal-template').html()),
        cancelEl: '.bbm-button',
        submitEl: '#delete-btn',
        keyControl: false,
        events: {
          'click .bbm-button': 'closeModal',
        },
        beforeSubmit: function() { 
          this.deleteStore();
          this.destroy();
          this.closeModal();
          return false; 
        },
        deleteStore: function(){
          var store = app.storesData.get(this.model.id);
          store.destroy();
        },
        closeModal: function(){
           app.appRouter.navigate("", {trigger: true});
        }
    });
      
    // Store View  
  	app.StoreView = Backbone.View.extend({
  		template: _.template($('#store-template').html()),
      model: app.Store,
  		events: {
        'click #check-store': 'checkProducts',
        'click #add-product-store': 'openAddProductModal',
        'click #edit-store': 'openEditModal',
  			'click #delete-store': 'openDeleteModal',
  		},
  		initialize: function(){
  			this.render();
  		},
  		render: function(){
  			this.$el.html(this.template({store: this.model}));
        $('#stores').prepend(this.$el);
  			return this;
  		},
  		checkProducts: function(){
        app.appRouter.navigate("/stores/"+this.model.id+"/products/", {trigger: true});	
  			this.openShowModal();		
  		},
      openShowModal: function(){
          // Render the layout
          var myLayout = new app.Layout();
          app.modalsRegion = myLayout.getRegion('modals');
          $('.app').append(myLayout.render().el);
          app.modalsRegion.show(new app.ShowModal({model: new app.Store(this.model)}));
      },
      openAddProductModal: function(){
          // Render an instance of your modal
          app.appRouter.navigate("/stores/"+this.model.id+"/new-product/", {trigger: true});
          var addProductModalView = new app.AddProductModal({model: new app.Store(this.model)});
          $('.app').html(addProductModalView.render().el);
      },
      openEditModal: function(){
          app.appRouter.navigate("/stores/"+this.model.id+"/edit/", {trigger: true});
          // Render an instance of your modal
          var editModalView = new app.EditModal({model: new app.Store(this.model)});
          $('.app').html(editModalView.render().el);
      },
      openDeleteModal: function(){
          // Render an instance of your modal
          app.appRouter.navigate("/stores/"+this.model.id+"/delete/", {trigger: true});
          var deleteModalView = new app.DeleteModal({model: new app.Store(this.model)});
          $('.app').html(deleteModalView.render().el);
      }
  	});
})();