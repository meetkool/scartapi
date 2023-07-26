from flask import Flask, session
from flask_restx import Api, Resource, fields
from flask_restx import reqparse
from flask_pymongo import PyMongo
from flask import request
import bcrypt
from bson.objectid import ObjectId
from flask_cors import CORS  

app = Flask(__name__)
api = Api(app)

CORS(app)

app.secret_key = 'some-random-string' 
app.config["MONGO_URI"] = "mongodb+srv://kooljool:kooljool@cluster0xebia-scart.9eijce9.mongodb.net/scart"

mongo = PyMongo(app)

products = mongo.db.products
users = mongo.db.users

login_model = api.model('Login', {
'username': fields.String,
'password': fields.String
})

user_model = api.model('UserRegistration', {
'username': fields.String,
'password': fields.String
})

product_model = api.model('Product', {
'title': fields.String,
'brand': fields.String,
'price': fields.Float,
'color': fields.String,
'image': fields.String,
'discount': fields.Float,
})

@api.route('/')
class Home(Resource):
    def get(self):
        routes = []
        for rule in app.url_map.iter_rules():
            routes.append(str(rule))
        return {'Available Routes': routes}


@api.route('/users')
class UserRegistration(Resource):
    @api.expect(user_model)
    def post(self):
        username = api.payload['username']
        password = api.payload['password']

        existing_user = users.find_one({'username': username})

        if existing_user:
            return {'message': 'User already exists'}, 400

        hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

        users.insert_one({'username': username, 'password': hashed})

        return {'message': 'User created successfully'}


@api.route('/login')
class UserLogin(Resource):
    @api.expect(login_model)
    def get(self):
        username = request.args.get('username')
        password = request.args.get('password')

        user = users.find_one({'username': username})

        if user and bcrypt.checkpw(password.encode('utf-8'), user['password']):
            session['username'] = username
            return {'message': 'Login successful'}
        else:
            return {'message': 'Invalid credentials'}



@api.route('/logout')
class LogoutUser(Resource):
    def get(self):
        session.pop('username', None)
        return {'message': 'Logged out'}


@api.route('/products')
class Products(Resource):
    @api.expect(product_model)
    def post(self):
        if 'username' not in session:
            return {'message': 'Unauthorized'}, 401

        title = api.payload['title']
        brand = api.payload['brand']
        price = api.payload['price']
        color = api.payload['color']
        image = api.payload['image']
        discount = api.payload['discount']

        existing_product = products.find_one({'title': title})

        if existing_product:
            return {'message': 'Product already exists'}, 400

        products.insert_one({
            'title': title,
            'brand': brand,
            'price': price,
            'color': color,
            'image': image,
            'discount': discount
        })

        return {'message': 'Product added successfully'}

    def get(self):
        output = []

        for product in products.find():
            output.append({
                'id': str(product['_id']),
                'title': product['title'],
                'brand': product['brand'],
                'price': product['price'],
                'color': product['color'],
                'image': product['image'],
                'discount': product['discount']
            })

        return {'products': output}


parser = reqparse.RequestParser()
# adding arguments to the parser instance
parser.add_argument('query', type=str, help='Search query', required=True)

@api.route('/products/search')
class SearchProducts(Resource):
    @api.expect(parser)
    def get(self):
        args = parser.parse_args()
        query = args['query']

        output = []

        for product in products.find({'title': {'$regex': f'^{query}', '$options': 'i'}}):
            output.append({
                'id': str(product['_id']),
                'title': product['title'],
                'brand': product['brand'],
                'price': product['price'],
                'color': product['color'],
                'image': product['image'],
                'discount': product['discount']
            })

        if not output:
            return {'message': 'No products found'}, 404

        return {'products': output}


@api.route('/products/<product_id>')
class Product(Resource):
    def get(self, product_id):
        product = products.find_one({'_id': ObjectId(product_id)})

        if product:
            return {
                'title': product['title'],
                'brand': product['brand'],
                'price': product['price'],
                'color': product['color'],
                'image': product['image'],
                'discount': product['discount']
            }
        else:
            return {'message': 'Product not found'}, 404


@api.route('/products/delete/<product_id>')
class DeleteProduct(Resource):
    def delete(self, product_id):
        if 'username' not in session:
            return {'message': 'Unauthorized'}, 401

        result = products.delete_one({'_id': ObjectId(product_id)})

        if result.deleted_count:
            return {'message': 'Product deleted'}
        else:
            return {'message': 'Product not found'}, 404


@api.route('/filter')
class FilterProducts(Resource):
    def get(self):
        query_params = request.args
        query = {}

        if 'title' in query_params:
            query['title'] = query_params['title']

        if 'brand' in query_params:
            query['brand'] = query_params['brand']

        if 'color' in query_params:
            query['color'] = query_params['color']

        if 'min_price' in query_params and 'max_price' in query_params:
            query['price'] = {'$gte': float(query_params['min_price']),
                              '$lte': float(query_params['max_price'])}
        elif 'min_price' in query_params:
            query['price'] = {'$gte': float(query_params['min_price'])}
        elif 'max_price' in query_params:
            query['price'] = {'$lte': float(query_params['max_price'])}

        if 'image' in query_params:
            query['image'] = query_params['image']

        if 'discount' in query_params:
            query['discount'] = float(query_params['discount'])

        products_cursor = products.find(query)
        products_list = list(products_cursor)

        if not products_list:
            return {'message': 'No products found'}, 404

        output = []

        for product in products_list:
            output.append({
                'title': product['title'],
                'brand': product['brand'],
                'price': product['price'],
                'color': product['color'],
                'image': product['image'],
                'discount': product['discount']
            })

        return {'products': output}


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=10000)