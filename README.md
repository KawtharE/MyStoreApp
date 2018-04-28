# My Store App Template

Full-Stack project with **BackboneJS v1.3.3** for the Front-end and **Flask v0.12.2** for the Back-end.

## Introduction

Working on **Large Scale Projects** need a good choice of technologies to work with, the main goal is to end up with a **robust, maintainable and bug-free application** that you or any other developer how have the source code can easily add new features to it in the future.

A good choice of technologies for your next big project start with thinking to work with one of the amazing **organizational frameworks** since it really makes things a lot easier than you have ever imagined. **BackboneJS** is one of these frameworks that belong to the **MV * Pattern Family** and what is great about it, is the fact that you end-up doing things in your own way in contrast of other organizational library like **AngularJS**, that make you do everything in its way.

Now for real world project, the presence of **Back-end** in the server side, make  a lot of sense since we need it to communicate with the **Database** where all of the project data exist. For this project we have been working with **Flask**, the pyhon micro-framework and **SQLAlchemy**, the ORM for a full SQL functionality. These two technologies have the advantage of being very flexible.

## Getting Start With The Project

#### 1- The project main functionalities

For this project we have two models to work with along: Store model and Product model. So the main functionalities of this application will be essentially two as shown next:

###### CRUD Functions - Store Model


![Starting Screen](https://github.com/KawtharE/MyStoreApp/blob/master/assets/CRUD-Store-Model.gif)



###### CRUD Functions - Product Model


![Starting Screen](https://github.com/KawtharE/MyStoreApp/blob/master/assets/CRUD-Product-Model.gif)


#### 2- Setup your environment

To make this project work on your machine make sure you have installed: **Python 3.5, Flask 0.12.2 and SQLAlchemy**

**Python 3.5** is installed by default on Ubuntu and Mac, you can make sure by typing:
      
      $ python3 --version

Still you need to install **pip3**, that we will be using to install *Flask* and *SQLAlchemy*:

      $ sudo apt-get install -y python3-pip
      
 Next:
 
      $ pip3 install flask
      $ pip3 install SQLAlchemy
      
 => Now, since you have everything installed start by creating the database, then if you want you can filled it with same fake data, and once you start the project the application will be available in your *localhost:5000* 
 
      $ python3 database_setup.py
      $ python3 fakedata.py
      $ python3 project.py
      

        

## Development Iterations

### 1- Iteration 1: Mock-ups

At the beginning of every project we should always think about *How will our final product look in the eyes of the final user?*, so we need to create a mock-up at the beginning of our development process, first for every page in our application and second for every page **URL**.

-**Home page** --- **URL:** "/" => The Home page contain a form to create new store and a list of all stores in the Database.

-**Store Home page** --- **URL:** "/#stores/store_id/products/" => The Store Home page contain a list of all products of the store with the id *store_id*.

-**New Product page** --- **URL:** "/#stores/store_id/new-product/" => The New Product page contain a form to add new product to the store with the id *store_id*.

-**Update Store's Details page** --- **URL:** "/#stores/store_id/edit/" => The Update Store's Details page contain a form with the store's current details that will be edited it by the user and update it.

-**Delete Store page** --- **URL:** "/#stores/store_id/delete/" => The Delete Store page contain a confirmation form for the user request to delete the store with the id *store_id*.

-**Update Product's Details page** --- **URL:** "/#stores/store_id/products/product_id/edit/" => The Update Product's Details page contain a form with the product's current details that will be edited by the user and updated.

-**Delete Product page** --- **URL:** "/#stores/store_id/products/product_id/delete/" => The Delete Product page contain a confirmation form for the user request to delete the product with the id *product_id* from the store with the id *store_id*.


=> You might notice we actually don't have all that bunch of pages in our project, well that refer to to fact that we have written all those pages in one HTML page as **Script Templates** and we have display most of theme as **Modals** by using the **Backbone Marionette Technique**.

### 2- Iteration 2: General setup

This iteration include two key steps:

**1- Preparing the project directory:** since we will be working with *BackboneJS* and *Flask* we should know that Flask, for sure need a specific organization of the project folder structure however Backbone don't, but it is a good practice even if we were working only with Backbone to have a clear project folder structure and that what most developers do. Backing to the fact that *Flask* do need a specific folder structure, now Flask by default know that **templates** must be in the **template folder** and **CSS, JS and media files** must be in the **static folder**, so we end-up with the following folder structure:

      static
            |---css
                  |---main.css
            |---img
            |---js
                  |---collections
                  |---models
                  |---routers
                  |---views
                  |---app.js
      templates
            |---project.html
      database_setup.py
      project.py
  
**2- Installing technologies:**

###### Back-end technologies:

      $ pip3 install flask
      $ pip3 install SQLAlchemy
      
###### Front-end technologies:

      $ npm install jquery@3.3.1
      $ npm install underscore
      $ npm install backbone
      $ npm install backbone-model-file-upload
      $ npm install backbone.modal
      $ npm install backbone.marionette
      $ npm install backbone.radio
 
 Next we should import all of them at the bottom of the *project.html* page.
### 3- Iteration 3: Front-End 

The project essentially need to have two **Models**: **The Store Model** and **The Product Model**.

So we will be starting by creating these two models, their collections and their views files:

      js
        |---collections
                  |---product-collection.js
                  |---store-collection.js
        |---models
                  |---product-model.js
                  |---store-model.js
        |---routers
                  |---router.js
        |---views
                  |---app-view.js
                  |---product-view.js
                  |---productList-view.js
                  |---store-view.js
                  |---storeForm-view.js
                  |---storeList-view.js
        |---app.js
 
 Now each of these js file have the same structure:

        var app = app || {};

        (function(){
              ...
        })();
        
**var app = app || {}** => test if the app have already been created otherwise it take a value {}.

**Immediate Invoked Function Expression (IIFE)** => where the code goes and immediately executed.

**Note:** a new attribute should be added to every model, since we are using the **backbone-model-file-upload** library to upload images to the server, so the store and product model will look like this:

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
      
**The Collection** of each model will fetched from the server when instantiating the collection object of the model, so instead of passing an array of data we will be having an **url** attribute which refer to the *Flask API* that take care in the server side to return all data of the model, in the server.

	app.Stores = Backbone.Collection.extend({
		model: app.Store,
		url: '/stores/'
      });
	app.Products = Backbone.Collection.extend({
		model: app.Product,
		url: '',
		initialize: function(id){
			this.url = '/stores/'+id+'/products/';
		}
		
	});
 
 **The Views** of each model have two view levels, *a model view* and *a collection view*, so by defining a *template* for the model we can create the second view level just by iterating over the collection and instantiating a model view for each item.
 
      // Store's Model View  
      app.StoreView = Backbone.View.extend({
  		template: _.template($('#store-template').html()),
            model: app.Store,
  		initialize: function(){
  			this.render();
  		},
  		render: function(){
  			this.$el.html(this.template({store: this.model}));
                  $('#stores').prepend(this.$el);
  			return this;
  		}
      });
      // Store's Collection View
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
      
### 4- Iteration 4: Back-End

**Flask** messions here can be resumed in two main tasks: 

**1- Communicate with the Client side to return the requested data or get the posted data in order to save it:** This type of communication depend from the client side to make an **AJAX** call and pass in the *Flask API URL* in the parameter and the data to post. From **Backbone** saving model data happen whenever we call **model.save(null, [options])** where option can be the url of the API, the method..
In our Flask API we need the **request module** from flask to use in order to be able to get the data from the client.

**1-1- Save New Store**

      @app.route('/new-store', methods=['POST'])
      def createNewStore():
            if 'attachment' not in request.files:
                  newStore = Store(store_name=request.form.get('storeName'), store_img_url='store.jpeg', store_description=request.form.get('storeDescription'), store_owner_name=request.form.get('storeOwnerName'))
            else:
                  file = request.files['attachment']
                  if file.filename == 'store.png':
                        newStore = Store(store_name=request.form.get('storeName'), store_img_url='store.jpeg', store_description=request.form.get('storeDescription'), store_owner_name=request.form.get('storeOwnerName'))
                  elif file and allowed_file(file.filename):
                        filename = secure_filename(file.filename)
                        file.save(os.path.join(app.config['UPLOAD_FOLDER_STORES'], filename))
                        newStore = Store(store_name=request.form.get('storeName'), store_img_url=filename, store_description=request.form.get('storeDescription'), store_owner_name=request.form.get('storeOwnerName'))
            session.add(newStore)
            session.commit()
            return jsonify([newStore.to_json])
            
**1-2- Return All Stores**

      @app.route('/stores/')
      def getAllStores():
            stores = session.query(Store).all()
            return jsonify([store.to_json for store in stores])
 
 The **to_json** property, return the model data in **JSON** format.
 
**2- Communicate with the Database to save or retrieve data:** This type of communication require an **ORM** technology to simplify things, so we will be using the **SQLAlchemy**. Now for every Backbone model we will be creating a python Class which will be tied to a table, then after creating a database engine (in our case it is an SQLite database) we will be using the **session instance** to communicate with our database.

      class Store(Base):
            __tablename__ = 'stores'

            id = Column(Integer, primary_key=True)
            store_name = Column(String(250), nullable=False)
            store_img_url = Column(String(250), nullable=False)
            store_description = Column(String(250), nullable=False)
            store_owner_name = Column(String(250), nullable=False)
            
            @property
            def to_json(self):
                  return {
                        "id": self.id,
                        "storeName": self.store_name,
                        "storeImgURL": self.store_img_url,
                        "storeDescription": self.store_description,
                        "storeOwnerName": self.store_owner_name
                  }
            
      class Product(Base):
            __tablename__ = 'products'

            id = Column(Integer, primary_key=True)
            product_name = Column(String(250), nullable=False)
            product_img_url = Column(String(250), nullable=False)
            product_description = Column(String(250), nullable=False)
            product_price = Column(Integer, nullable=False)
            product_category = Column(String(250), nullable=False)
            store_id = Column(Integer, ForeignKey('stores.id'))
            stores = relationship(Store)
            
            @property
            def to_json(self):
                  return {
                        "id": self.id,
                        "productName": self.product_name,
                        "productImgURL": self.product_img_url,
                        "productDescription": self.product_description,
                        "productPrice": self.product_price,
                        "productCategory": self.product_category,
                        "storeID": self.store_id
                  }

      engine = create_engine('sqlite:///stores.db')
      Base.metadata.create_all(engine)

### 5- Iteration 5: Styling

For the last iteration of the project, we have been focusing on the **responsive** of our application, so we have adopted the **Flexbox Pattern**. Now flexbox is a great technique to have your application looking good on different screens, but you need to add all vendor prefixes to make sure that flexbox will work correctly on all browsers:

	display: -webkit-box;      /* iOS 6-, Safari 3.1-6 */
	display: -moz-box;         /* Firefox 19- */
	display: -ms-flexbox;      /* IE 10 */
	display: -webkit-flex;     /* NEW - Chrome */
	display: flex;
	
**Note:** you might notice that we are using the **vh** and **vw** units for margins and padding, well that because **margin-top, margin-bottom, paddin-top,** and **padding-bottom** don't work on **Firefox** when using the flexbox pattern.

**vh:** view heigh

**vw:** view width

## Summary

**Some Notes about working with BackboneJS**

1- [The Source Code](http://backbonejs.org/docs/backbone.html) is a great place to understand how things works behind the scene.

2- Whenever you need to update the value of a model use this technique:

	var val = _.clone(model.get('attribute'));
	val = newVal;
	model.set('attribute', val);
	
=> by using the **underscore** method (clone) we keep the attribute of the model at the same reference, that way the **change** and the **change:attribute** events will be triggered successfully otherwise it will not trigger.

3- To avoid firing the event multiple times you can use the **underscore** method (debounce):

	this.listenTo(collection, 'change', _.debounce(this.render, 300));

