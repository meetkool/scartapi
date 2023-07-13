Here is an example of how to create a simple user login API with Flask and MongoDB:

```python
from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
import bcrypt

app = Flask(__name__)

app.config['MONGO_DBNAME'] = 'users'
mongo = PyMongo(app)

@app.route('/users', methods=['POST'])
def create_user():
    username = request.json['username']
    password = request.json['password']
    password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    mongo.db.users.insert({
        'username': username,
        'password': password_hash 
    })

    return jsonify({'message': 'User created successfully!'})

@app.route('/users/login', methods=['POST'])  
def login():
    username = request.json['username'] 
    password = request.json['password']

    user = mongo.db.users.find_one({'username': username})

    if user and bcrypt.checkpw(password.encode('utf-8'), user['password']):
        return jsonify({'message': 'Login successful!'})

    return jsonify({'message': 'Invalid username or password'})


if __name__ == '__main__':
    app.run(debug=True)
```

To test it:

```
# Create new user
curl -X POST -H "Content-Type: application/json" -d '{"username":"amigo","password":"delta"}' http://localhost:5000/users

# Login
curl -X POST -H "Content-Type: application/json" -d '{"username":"amigo","password":"delta"}' http://localhost:5000/users/login 
```

This stores the user with a hashed password in MongoDB, and validates the login credentials by comparing the hashed password.

Some key points:

- Use PyMongo to integrate MongoDB with Flask 
- Hash passwords with bcrypt before storing for security
- Validate username/password on login by comparing hashed password

Let me know if you have any other questions!