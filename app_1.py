from flask import Flask, request, jsonify, session
from flask_pymongo import PyMongo
from bson.json_util import dumps
from dotenv import load_dotenv
import bcrypt
import os

# Load the environment variables file
load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY')
app.config["MONGO_URI"] = os.getenv('MONGO_URI')
mongo = PyMongo(app)

products = mongo.db.products
users = mongo.db.users

@app.route('/users', methods=['POST'])
def register_user():
    try:
        data = request.get_json()
        username = data['username']
        password = data['password']

        user = users.find_one({'username': username})

        if user:
            return jsonify({'message': 'User already exists'}), 400

        hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

        users.insert_one({
            'username': username,
            'password': hashed
        })

        return jsonify({'message': 'User created'})
    except Exception as e:
        return jsonify(str(e))

@app.route('/login', methods=['POST'])
def login_user():
    try:
        data = request.get_json()
        username = data['username']
        password = data['password']

        user = users.find_one({'username': username})

        if user and bcrypt.checkpw(password.encode('utf-8'), user['password']):
            session['username'] = username
            return jsonify({'message': 'Login successful'})

        return jsonify({'message': 'Invalid credentials'})
    except Exception as e:
        return jsonify(str(e))

@app.route('/logout')
def logout():
    session.pop('username', None)
    return jsonify({'message': 'Logged out'})

@app.route('/products', methods=['POST'])
def add_product():
    try:
        if 'username' not in session:
            return jsonify({'message': 'Unauthorized'})

        data = request.get_json()
        title = data['title']
        brand = data['brand']
        price = data['price']
        color = data['color']

        products.insert_one({
            'title': title,
            'brand': brand,
            'price': price,
            'color': color
        })

        return jsonify({'message': 'Product added'})
    except Exception as e:
        return jsonify(str(e))

@app.route('/products', methods=['GET'])
def get_products():
    try:
        products_list = []
        for product in products.find():
            products_list.append(product)
        return dumps(products_list)
    except Exception as e:
        return jsonify(str(e))

@app.route('/products/search')
def search_products():
    try:
        query = request.args.get('query')

        result = products.find({'$text': {'$search': query}})

        output = [prod for prod in result]

        if not output:
            return jsonify({'message': 'Product does not exist'}), 404

        return dumps(output)
    except Exception as e:
        return jsonify(str(e))

@app.route('/filters')
def get_filters():
    try:
        brands = products.distinct('brand')
        colors = products.distinct('color')
        prices = products.distinct('price')

        return jsonify({
            'brands': brands,
            'colors': colors,
            'prices': prices
        })
    except Exception as e:
        return jsonify(str(e))

if __name__ == '__main__':
    app.run(debug=True)
