You can use cURL to make HTTP requests to the API endpoints to insert and retrieve data.

To add a product:

```
curl -X POST -H "Content-Type: application/json" -d '{"title":"Product 1","brand":"Brand 1","price":100,"color":"Red"}' http://localhost:5000/products
```

This sends a POST request to /products with the product data in JSON format.

To get list of products:

```
curl http://localhost:5000/products
```

This makes a GET request to fetch all products.

To search products:

```  
curl "http://localhost:5000/products/search?query=shirt"
```

Pass the search query as a parameter.

To get filters:

```
curl http://localhost:5000/filters
```

For user registration:

```
curl -X POST -H "Content-Type: application/json" -d '{"username":"user1","password":"mypass"}' http://localhost:5000/users
```

And login:

```
curl -X POST -H "Content-Type: application/json" -d '{"username":"user1","password":"mypass"}' http://localhost:5000/login
```

The JSON data will be automatically inserted into the MongoDB database.

Let me know if you need help with any specific cURL examples!