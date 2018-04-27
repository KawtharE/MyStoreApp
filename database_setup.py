import sys
from sqlalchemy import create_engine, Column, ForeignKey, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()

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