from flask import Flask, request, jsonify, session
from flask_pymongo import PyMongo
import bcrypt
from bson.objectid import ObjectId   
from flask_cors import CORS  # new line


app = Flask(__name__)
CORS(app) 
app.secret_key = 'some-random-string'
app.config["MONGO_URI"] = "mongodb+srv://kooljool:kooljool@cluster0xebia-scart.9eijce9.mongodb.net/scart"  
mongo = PyMongo(app)

products = mongo.db.products
users = mongo.db.users

@app.route('/')
def get_routes():
    routes = []
    for rule in app.url_map.iter_rules():
        routes.append(str(rule))
    return jsonify({"Available Routes": routes})

@app.route('/users', methods=['POST'])
def register_user():
  username = request.json['username']
  password = request.json['password']

  user = users.find_one({'username': username})

  if user:
    return jsonify({'message': 'User already exists'}), 400

  hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

  users.insert_one({
    'username': username, 
    'password': hashed
  })

  return jsonify({'message': 'User created'})


@app.route('/login', methods=['POST'])
def login_user():
  username = request.json['username']
  password = request.json['password']

  user = users.find_one({ 'username': username })

  if user and bcrypt.checkpw(password.encode('utf-8'), user['password']):
    session['username'] = username
    return jsonify({'message': 'Login successful'})

  return jsonify({'message': 'Invalid credentials'})

@app.route('/logout')
def logout():
  session.pop('username', None)
  return jsonify({'message': 'Logged out'})


@app.route('/products', methods=['POST'])
def add_product():
  if 'username' not in session:
    return jsonify({'message': 'Unauthorized'})
    
  title = request.json['title']
  brand = request.json['brand']
  price = request.json['price']
  color = request.json['color']
  image = request.json['image']
  discount = request.json['discount']

  existing_product = products.find_one({'title': title})

  if existing_product:
    return jsonify({'message': 'Product with this title already exists. Please change the title.'}), 400

  products.insert_one({
    'title': title,
    'brand': brand,
    'price': price,
    'color': color,
    'image': image,
    'discount': discount
  })

  return jsonify({'message': 'Product added'}) 


@app.route('/products', methods=['GET'])
def get_products():
  output = []

  for product in products.find():
    output.append({
      'id': str(product['_id']),    # added line
      'title': product['title'],
      'brand': product['brand'],
      'price': product['price'],
      'color': product['color'],
      'image': product['image'],
      'discount': product['discount']
    })

  return jsonify({'products': output})

@app.route('/products/search')
def search_products():
  query = request.args.get('query')

  output = []

  for product in products.find({'title': query}):
    output.append({
      'id': str(product['_id']),    # added line
      'title': product['title'],
      'brand': product['brand'],
      'price': product['price'],
      'color': product['color'],
      'image': product['image'],
      'discount': product['discount']
    })

  if not output:
    return jsonify({'message': 'Product does not exist'}), 404

  return jsonify({'products': output})

@app.route('/products/<product_id>', methods=['GET'])
def get_product(product_id):
  product = products.find_one({'_id': ObjectId(product_id)})

  if product:
    output = {
      'title': product['title'],
      'brand': product['brand'],
      'price': product['price'],
      'color': product['color'],
      'image': product['image'],    # new field
      'discount': product['discount']    # new field
    }
    return jsonify({'product': output})
  else:
    return jsonify({'message': 'Product not found'}), 404


@app.route('/products/delete/<product_id>', methods=['DELETE'])
def delete_product(product_id):
  if 'username' not in session:
    return jsonify({'message': 'Unauthorized'})

  result = products.delete_one({'_id': ObjectId(product_id)})

  if result.deleted_count == 1:
    return jsonify({'message': 'Product deleted'})
  else:
    return jsonify({'message': 'Product not found'}), 404



@app.route('/filters')
def get_filters():
  titles = products.distinct('title')
  brands = products.distinct('brand')
  colors = products.distinct('color')
  prices = products.distinct('price')
  images = products.distinct('image')    # new field
  discounts = products.distinct('discount')    # new field

  return jsonify({
    'titles': titles,
    'brands': brands,
    'colors': colors,
    'prices': prices,
    'images': images,    # new field
    'discounts': discounts    # new field
  })


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)