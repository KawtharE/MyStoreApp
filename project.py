import os
from os.path import join, dirname, realpath
from flask import Flask, url_for, render_template, request, redirect, jsonify, flash
from werkzeug.utils import secure_filename

UPLOADS_PATH_STORES = join(dirname(realpath(__file__)), 'static/img/stores')
UPLOADS_PATH_PRODUCTS = join(dirname(realpath(__file__)), 'static/img/products')
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

app = Flask(__name__)
app.config['UPLOAD_FOLDER_STORES'] = UPLOADS_PATH_STORES
app.config['UPLOAD_FOLDER_PRODUCTS'] = UPLOADS_PATH_PRODUCTS

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database_setup import Base, Store, Product

engine = create_engine('sqlite:///stores.db')
Base.metadata.bind = engine
DBSession = sessionmaker(bind=engine)
session = DBSession()

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def start():
	return render_template('project.html')

@app.route('/stores/')
def getAllStores():
	stores = session.query(Store).all()
	return jsonify([store.to_json for store in stores])

@app.route('/stores/<int:store_id>/')
def getStore(store_id):
	store = session.query(Store).filter_by(id=store_id).one()
	return jsonify([store.to_json])

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

@app.route('/stores/<int:store_id>/edit/', methods=['POST'])
def updateStore(store_id):
	store = session.query(Store).filter_by(id=store_id).one()
	if 'attachment' not in request.files:
		print("There is no file in this request!")
		store.store_img_url = store.store_img_url
	else:
		file = request.files['attachment']
		if file.filename == 'store.png':
			print("The store's image don't need to be updated!!")
			store.store_img_url = store.store_img_url
		elif file and allowed_file(file.filename):
			filename = secure_filename(file.filename)
			file.save(os.path.join(app.config['UPLOAD_FOLDER_STORES'], filename))
			if store.store_img_url == 'store.jpeg':
				print("Don't do anything here!")
			else:
				os.remove(os.path.join(app.config['UPLOAD_FOLDER_STORES'], store.store_img_url))
			store.store_img_url = filename
	store.store_name = request.form.get('storeName')
	store.store_owner_name = request.form.get('storeOwnerName')
	store.store_description = request.form.get('storeDescription')
	session.add(store)
	session.commit()
	return jsonify([store.to_json])

@app.route('/stores/<int:store_id>', methods=['DELETE'])
def deleteStore(store_id):
	store = session.query(Store).filter_by(id=store_id).one()
	os.remove(os.path.join(app.config['UPLOAD_FOLDER_STORES'], store.store_img_url))
	session.delete(store)
	session.commit()
	stores = session.query(Store).all()
	return jsonify([store.to_json for store in stores])

@app.route('/stores/<int:store_id>/products/')
def getAllProducts(store_id):
	store = session.query(Store).filter_by(id=store_id).one()
	products = session.query(Product).filter_by(store_id=store.id)
	return jsonify([product.to_json for product in products])

@app.route('/stores/<int:store_id>/new-product/', methods=['POST'])
def createNewProduct(store_id):
	store = session.query(Store).filter_by(id=store_id).one()
	if 'attachment' not in request.files:
		newProduct = Product(product_name=request.form.get('productName'), product_img_url='products-and-services.jpg', product_description=request.form.get('productDescription'), product_price=request.form.get('productPrice'), product_category=request.form.get('productCategory'), store_id=store.id)
	else:
		file = request.files['attachment']
		if file.filename == 'store.png':
			newProduct = Product(product_name=request.form.get('productName'), product_img_url='products-and-services.jpg', product_description=request.form.get('productDescription'), product_price=request.form.get('productPrice'), product_category=request.form.get('productCategory'), store_id=store.id)
		elif file and allowed_file(file.filename):
			filename = secure_filename(file.filename)
			file.save(os.path.join(app.config['UPLOAD_FOLDER_PRODUCTS'], filename))
			newProduct = Product(product_name=request.form.get('productName'), product_img_url=filename, product_description=request.form.get('productDescription'), product_price=request.form.get('productPrice'), product_category=request.form.get('productCategory'), store_id=store.id)
	session.add(newProduct)
	session.commit()
	return jsonify([newProduct.to_json])

@app.route('/stores/<int:store_id>/products/<int:product_id>/edit/', methods=['POST'])
def updateProduct(store_id, product_id):
	product = session.query(Product).filter_by(id=product_id, store_id=store_id).one()
	if 'attachment' not in request.files:
		print('There is no file uploaded!')
		product.product_img_url = product.product_img_url
	else:
		file = request.files['attachment']
		if file.filename == 'store.png':
			print('There is no need to update the product image')
			product.product_img_url = product.product_img_url
		elif file and allowed_file(file.filename):
			filename = secure_filename(file.filename)
			file.save(os.path.join(app.config['UPLOAD_FOLDER_PRODUCTS'], filename))
			if product.product_img_url == 'products-and-services.jpg':
				print("Don't do anything here!")
			else:
				os.remove(os.path.join(app.config['UPLOAD_FOLDER_PRODUCTS'], product.product_img_url))
			product.product_img_url = filename
	product.product_name = request.form.get('productName')
	product.product_description = request.form.get('productDescription')
	product.product_price = request.form.get('productPrice')
	product.product_category = request.form.get('productCategory')
	session.add(product)
	session.commit()
	return jsonify([product.to_json])

@app.route('/stores/<int:store_id>/products/<int:product_id>', methods=['DELETE'])
def deleteProduct(store_id, product_id):
	product = session.query(Product).filter_by(id=product_id, store_id=store_id).one()
	os.remove(os.path.join(app.config['UPLOAD_FOLDER_PRODUCTS'], product.product_img_url))
	session.delete(product)
	session.commit()
	products = session.query(Product).filter_by(id=store_id, store_id=store_id).all()
	return jsonify([product.to_json for product in products])

if __name__ == '__main__':
	app.secret_key = 'You can not guess it!'
	app.debug = True;
	app.run(host='0.0.0.0', port=5000)

