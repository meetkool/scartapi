#!/bin/bash

# Log in and save cookies to a file
curl -c cookies.txt -X POST -H "Content-Type: application/json" -d '{"username":"user1","password":"mypass"}' http://localhost:5000/login

# Declare an array of product data
declare -a products=(
'{"title":"Product 1","brand":"Brand 1","price":100,"color":"Red"}'
'{"title":"Product 2","brand":"Brand 2","price":200,"color":"Blue"}'
'{"title":"Product 3","brand":"Brand 3","price":300,"color":"Green"}'
)

# Iterate over the array and send each product
for product in "${products[@]}"
do
   curl -b cookies.txt -X POST -H "Content-Type: application/json" -d "$product" http://localhost:5000/products
done