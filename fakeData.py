from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database_setup import Base, Store, Product

engine = create_engine('sqlite:///stores.db')
Base.metadata.bind = engine
DBSession = sessionmaker(bind=engine)
session = DBSession()

store1 = Store(store_name="Store N°1", store_description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                      store_owner_name="Houston C. Owens", store_img_url='store.jpeg')

session.add(store1)
session.commit()

store2 = Store(store_name="Store N°2", store_description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                      store_owner_name="Lee L. Ceja", store_img_url='store.jpeg')

session.add(store2)
session.commit()

store3 = Store(store_name="Store N°3", store_description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                      store_owner_name="Donna C. Rubin", store_img_url='store.jpeg')

session.add(store3)
session.commit()

store4 = Store(store_name="Store N°4", store_description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                      store_owner_name="Lonnie A. Haugen", store_img_url='store.jpeg')

session.add(store4)
session.commit()

store5 = Store(store_name="Store N°5", store_description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                      store_owner_name="Charles P. Sargent", store_img_url='store.jpeg')

session.add(store5)
session.commit()

store6 = Store(store_name="Store N°6", store_description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                      store_owner_name="Betty D. Terry", store_img_url='store.jpeg')

session.add(store6)
session.commit()

product1 = Product(product_name="Product N°1", product_price=25, product_description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                     product_img_url="products-and-services.jpg", product_category="Service", stores=store1)

session.add(product1)
session.commit()

product2 = Product(product_name="Product N°2", product_price=57, product_description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                     product_img_url="products-and-services.jpg", product_category="Product", stores=store1)

session.add(product2)
session.commit()

product1 = Product(product_name="Product N°1", product_price=48.36, product_description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                     product_img_url="products-and-services.jpg", product_category="Product", stores=store2)

session.add(product1)
session.commit()

product2 = Product(product_name="Product N°2", product_price=156.24, product_description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                     product_img_url="products-and-services.jpg", product_category="Service", stores=store2)

session.add(product2)
session.commit()

product1 = Product(product_name="Product N°1", product_price=120, product_description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                     product_img_url="products-and-services.jpg", product_category="Service", stores=store3)

session.add(product1)
session.commit()

product2 = Product(product_name="Product N°2", product_price=99.9, product_description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
                     product_img_url="products-and-services.jpg", product_category="Product", stores=store3)

session.add(product2)
session.commit()

print ("Database Fulled!")