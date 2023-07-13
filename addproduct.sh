# Create user
curl -X POST -H "Content-Type: application/json" -d '{"username":"user1","password":"mypass"}' http://localhost:5000/users

# Log in and save cookies to a file
curl -c cookies.txt -X POST -H "Content-Type: application/json" -d '{"username":"user1","password":"mypass"}' http://localhost:5000/login

# Send product data and include cookies from the file
curl -b cookies.txt -X POST -H "Content-Type: application/json" -d '{"title":"Product 1","brand":"Brand 1","price":100,"color":"Red"}' http://localhost:5000/products
