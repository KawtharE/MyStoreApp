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
      
 => Now, once you start the project by the following command the project is avalable in your *localhost:5000* 
 
      $ python3 project.py
      

        

## Development Iterations

### 1- Iteration 1: Mock-ups

At the beginning of every project we should always think about *How will our final product look in the eyes of the final user?*, so we need to create a mock-up at the beginning of our development process, first for every page in our application and second for every page **URL**.

.**Home page** --- **URL:** "/" => The Home page contain a form to create new store and a list of all stores in the Database.

.**Store Home page** --- **URL:** "/#stores/store_id/products/" => The Store Home page contain a list of all products of the store with the id *store_id*.

.**New Product page** --- **URL:** "/#stores/store_id/new-product/" => The New Product page contain a form to add new product to the store with the id *store_id*.

.**Update Store's Details page** --- **URL:** "/#stores/store_id/edit/" => The Update Store's Details page contain a form with the store's current details that will be edited it by the user and update it.

.**Delete Store page** --- **URL:** "/#stores/store_id/delete/" => The Delete Store page contain a confirmation form for the user request to delete the store with the id *store_id*.

.**Update Product's Details page** --- **URL:** "/#stores/store_id/products/product_id/edit/" => The Update Product's Details page contain a form with the product's current details that will be edited by the user and updated.

.**Delete Product page** --- **URL:** "/#stores/store_id/products/product_id/delete/" => The Delete Product page contain a confirmation form for the user request to delete the product with the id *product_id* from the store with the id *store_id*.


=> You might notice we actually don't have all that bunch of pages in our project, well that refer to to fact that we have written all those pages in one HTML page as **Script Templates** and we have display most of theme as **Modals** by using the **Backbone Marionette Technique**.

### 2- Iteration 2: General setup


### 3- Iteration 3: Front-End 
### 4- Iteration 4: Back-End
### 5- Iteration 5: Styling

## Summary




