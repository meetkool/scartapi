from flask import Flask, request, jsonify
from flask_pymongo import PyMongo, DESCENDING
import bcrypt
from flask_jwt_extended import JWTManager, jwt_required, create_access_token
from flask_cors import CORS
from dotenv import load_dotenv
from marshmallow import Schema, fields
import os

# Schema definition
class UserSchema(Schema):
  username = fields.Str(required=True)
  password = fields.Str(required=True)

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

app.config["MONGO_URI"] = os.getenv("MONGO_URI")
app.config["JWT_SECRET_KEY"] = os.getenv("SECRET_KEY")

mongo = PyMongo(app)
jwt = JWTManager(app)

users = mongo.db.users
products = mongo.db.products

@app.route('/')
def get_routes():
    routes = []
    for rule in app.url_map.iter_rules():
        routes.append(str(rule))
    return jsonify({"Available Routes": routes})

@app.route('/users', methods=['POST'])
def register_user():
  """Registers a new user"""
  data = UserSchema().load(request.json)

  if data.errors:
    return jsonify(data.errors), 400

  username = data.data['username']
  password = data.data['password']
  
  user = users.find_one({'username': username})
  
  if user:
    return jsonify({'message': 'User already exists'}), 400

  hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
  
  users.insert_one({
    'username': username, 
    'password': hashed
  })
  
  return jsonify({'message': 'User created'}), 201

@app.route('/login', methods=['POST'])
def login_user():
  """Logs in a user"""
  data = UserSchema().load(request.json)

  if data.errors:
    return jsonify(data.errors), 400

  username = data.data['username']
  password = data.data['password']

  user = users.find_one({ 'username': username })

  if user and bcrypt.checkpw(password.encode('utf-8'), user['password']):
    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token)

  return jsonify({'message': 'Invalid credentials'}), 400

@app.route('/products', methods=['POST'])
@jwt_required
def add_product():
  """Adds a new product"""
  # Only a logged-in user can add a product
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

  return jsonify({'message': 'Product added'}), 201 

@app.route('/products', methods=['GET'])
def get_products():
  """Get all products"""
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
  """Searches for products based on a query"""
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
  """Gets distinct brands, colors, and prices"""
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
