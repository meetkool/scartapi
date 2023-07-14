from flask import Flask, request, jsonify, session
from flask_pymongo import PyMongo
import bcrypt

app = Flask(__name__)
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

  products.insert_one({
    'title': title,
    'brand': brand,
    'price': price,
    'color': color  
  })

  return jsonify({'message': 'Product added'}) 

@app.route('/products', methods=['GET'])
def get_products():
  output = []

  for product in products.find():
    output.append({
      'title': product['title'],
      'brand': product['brand'],
      'price': product['price'],
      'color': product['color']  
    })

  return jsonify({'products': output})


@app.route('/products/search')
def search_products():
  query = request.args.get('query')

  output = []

  for product in products.find({'title': query}):
    output.append({
      'title': product['title'],
      'brand': product['brand'],
      'price': product['price'],
      'color': product['color']
    })

  if not output:
    return jsonify({'message': 'Product does not exist'}), 404

  return jsonify({'products': output})


@app.route('/filters')
def get_filters():
  brands = products.distinct('brand')
  colors = products.distinct('color')
  prices = products.distinct('price')

  return jsonify({
    'brands': brands,
    'colors': colors,
    'prices': prices  
  })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)