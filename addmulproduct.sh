#!/bin/bash

# Log in and save cookies to a file
curl -c cookies.txt -X POST -H "Content-Type: application/json" -d '{"username":"user1","password":"mypass"}' https://scart-xebia.onrender.com/login

# Declare an array of product data
declare -a products=(
'{"title":"Product 1","brand":"Brand 1","price":100,"color":"Red","image":"https://picsum.photos/seed/picsum/200/300","discount":10}'
'{"title":"Product 2","brand":"Brand 2","price":200,"color":"Blue","image":"https://picsum.photos/seed/picsum/200/300","discount":15}'
'{"title":"Product 3","brand":"Brand 3","price":300,"color":"Green","image":"https://picsum.photos/seed/picsum/200/300","discount":20}'
)

# Iterate over the array and send each product
for product in "${products[@]}"
do
   curl -b cookies.txt -X POST -H "Content-Type: application/json" -d "$product" https://scart-xebia.onrender.com/products
done
