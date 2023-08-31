#!/bin/bash

# Step 1: Login and store the session cookie
curl -c cookie.txt -X GET "https://scart-xebia.onrender.com/login?username=user1&password=mypass"

# Step 2: Insert new products using the stored session cookie

# Adding iPhone 13
curl -b cookie.txt -X POST "https://scart-xebia.onrender.com/products" \
-H "Content-Type: application/json" \
-d '{
  "title": "iPhone 13",
  "brand": "Apple",
  "price": 799.99,
  "color": "blue",
  "image": "https://rukminim2.flixcart.com/image/850/1000/ktketu80/mobile/a/j/u/iphone-13-mini-mlkc3hn-a-apple-original-imag6vp6swvmsbnn.jpeg?q=90",
  "discount": 10.0
}'

# Adding Galaxy S22
curl -b cookie.txt -X POST "https://scart-xebia.onrender.com/products" \
-H "Content-Type: application/json" \
-d '{
  "title": "Galaxy S22",
  "brand": "Samsung",
  "price": 699.99,
  "color": "black",
  "image": "https://rukminim2.flixcart.com/image/850/1000/xif0q/mobile/y/c/t/-original-imaggj699hhujaqe.jpeg?q=90",
  "discount": 5.0
}'

# Adding MacBook Pro
curl -b cookie.txt -X POST "https://scart-xebia.onrender.com/products" \
-H "Content-Type: application/json" \
-d '{
  "title": "MacBook Pro",
  "brand": "Apple",
  "price": 1199.99,
  "color": "space grey",
  "image": "https://www.apple.com/newsroom/images/product/mac/standard/Apple_MacBook-Pro_14-16-inch_10182021_big.jpg.small_2x.jpg",
  "discount": 8.0
}'

# Adding PlayStation 5
curl -b cookie.txt -X POST "https://scart-xebia.onrender.com/products" \
-H "Content-Type: application/json" \
-d '{
  "title": "PlayStation 5",
  "brand": "Sony",
  "price": 499.99,
  "color": "white",
  "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxASEA8PEBAQEA8PEA8QEA8PEA8QDw8QFRUWFhURFRUYHSggGBolGxUWITEhJSktLi4uFx8zODMsNygtLisBCgoKDg0OGg8PFS0dHR0rKystLS0rKystLS0rLSsrLS0rLS0tNy0tKy03Ny0tKys3LTcrLS0rLSsrKzctKy0tLf/AABEIAOoA2AMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAAAgMEBgcIBQH/xABIEAACAQICBQgGBwQHCQAAAAAAAQIDEQQhBQcSMVEGMkFhcYGRoRMiUnKx0RQjJGKSosFCQ7LhFTNTgoOzwzRjZHOTwtPi8P/EABgBAQEBAQEAAAAAAAAAAAAAAAABAgME/8QAIREBAQACAgIBBQAAAAAAAAAAAAECERIxAyFBBDNRsfD/2gAMAwEAAhEDEQA/AN4gAAAAAAAAAAAAAAAAAAAAAAAAjOaSu3Ysa+KbyWS82XQr4jFqOSzfkixhXltxbb5yXVZshIpt9PBpmpEe8D4j6YUAKdStGO92AqA8vE6Ta5q3bO/pu7AvGpt6gAIoAAAAAAAAAAAAAAAAAABSrVkut8CNat0LxLSTNSJtGrNt3b/kU2SkRZpEJFOZUZTkwMRq60K9CpUhitFYnYhUnCNbCyjWUoRbSm45Wus956ej9bOh6r2ZYiWHn0wxNGpTt2ys4rxMX0ppRRxFeDfNqyXmWtarh6qtUp05r78Yy+JOMNtpUNPUq8dvD1adWm/3lOcZq/C63Mi23m3dmr9EYLDYesq+GTozeU405yVOpH2ZQ3PwyM5wOlVK2e864eLl0lr0HG80uM6Kt3tgnh2nUpW6ZpvuTByy3LprTIAAYUAAAAAAAAAAAAAAAAKNap0IrHnYjEpVYUmpXqKclJW2Vs2unne+fDoZcUqTKcibISNogyDJMiwIMhImymwNGawcRKlpPFq7tN0prvpwT81fvPGpaYfE9XXLDZ0k37VChLx24/6ZgqqM6+TVss/E/WmYzClpx8TL+SulvSR35xlbuyZqNYhmXcgMW9urH3H47XyO30d15ffztMum9uT1Tbqw+6pPyBT5Gq8pPhH5A831H3K6Y9MuABxUAAAAAAAAAAAAAAAAPFxTlLEwUcthNyk1fJ/s99vPqPaLOpvfazWKVTkU5E5EGaRCRBkmQYEWQkTZTYGldeNC2KoVOmeGUe6FSX/lNZ3Ns69qeeClxpYqP4Z4d/8AcajNZX1P75RO5k/IOf11Tsp/GRihkvIb+un2Q+LNeLLjnKV0XyGj6k31JArch4fUN8Wv1Bx8l3la1PUZKADKgAAAAAAAAAAAAAAABZz3l4WMt5rFKhIpsnIgzSIMhImymwIsgyTIsDWOvGinhsLPpjVqwX96G0/8tGkzfOumlfR8JeziF50qv8jQxq9RAyXkLC+IbvuSVuN3v8vMxoyrV/SvXlL3Y+dzM7HSnI+FsMutgr8mIWw1Prz8kfTF7bj1QAQAAAAAAAAAAAAAAAAGWMi9ZYs1ilQkU5E2QkaRFlNk2QYEJEGTZTkBhmtmnfRdZ+zOi13zUX5SZz0dJaxKSlozGX6IQl4Tizm2wAzHVzTfpZy6LxXek3+vkYfYzjVpTe3J9Dkrdy/mIjpPQkLUKa+6Cto6NqVNfdQOdbi5AAAAAAAAAAAAAAAAAAHyW5lgy+qbn2FjI1ilQZTZNkJGkRZBkmRYFNkJE5EGB4fLOntaPx0en6NXa7VBteaOaFE6j01T2sNiI+1QrLxgzmKEcl2EFLZM+1YU3tZ7nUy7PV/W5hCibE1X07yj7/ldFg6EwqtCHux+B9JUl6qXUvgDm0mAAAAAAAAAAAAAAAAAAIVuayxky9r81llI1ilU2QZORBmkRZBkmRYEGU5FRlOQFGvDajKPtRlHxVjlynuR1Mcw4yns1a0PYq1Yfhm1+hBRhJO9uhtd6Nl6q43lD3n8Wa0hG21ne8m+y5tXVNC7pvr+Yit6oBbgYV9AAAAAAAAAAAAAAAAAAFLEP1e9FlIvMU8u8smbnSVGRBkpEGVEWRZJkGBFlORNkJAQZzTyghs4zGR4YrE/5sjpWRzryzhs6Rx6/wCKrS/FJy/UDxoJ534u2aeXQbe1Q0/6vx8/5mokbj1UPZhGVr2Sy7bL9RBuWDyXYD5S3LsPhzaioAAAAAAAAAAAAAAAAAALfFvJFoy6xfR3lozc6SoMiyTIsqIMiSZECDISJshICnI581gwtpXHddWD8aVNvzZ0HI0LrOhbSmK61Rl404/IDF0bp1XQ+pXZD4o0qjeWrGNqC/wl+ZCDatDmoHzD80HOtKoBQxmIcItxhKpLohFxTffJpJAVweH9Ix8s7YSguDdbEy8vRovv6QW1Gm+fKMpJ/svZ2U7fiReNTa+Ba/SX1eZ8+kvq8H8xqm12C1+kvq8H8yFfHqEXOSyVt29ttJJdd2vEcabXoPJxuIxLadCVBRW+NanUk5PipxmrL+6yWBx2IctivQhG+6rRq+kp/wB5SUZR8GusaNvUAQIoAALXFvNdhasr4rndyLdm50yiyLJMgyiLIskyLAgyEibISApyNF62Y20pV+9Rw7/Lb9DekjSOuCNtJRftYSg/z1V+gGFG+NW8fqI+9SX5jQ6N/au4/Z6f/MpgbIw3N72Bhub3g53tqKpY168U7tpXyV3bIuq8rRb7jza9NtpxaWVs02vJo1ilUIYt+o5TXrb1l6uTv52W/pKGOajLD1U8lXUG79FVOml+J0z5SptbElKN57V7xVs05dHh1eRiGsjlGqFKOFozTxU6lKtKUd1GMJRnFvfm3COXC74HTG6rNbBuDV9PWzsxiqmEvOy2nGrsxb6Wlsuy7ycdb1HPaw7i0sk6knd8MoZGVbNuWOk3eWHp+3XhJ9SpJ1fjCK7zX8dbtN7sJL/q/wDoWEtYc547D1qlP0eFpqdOVOL2qiVRbMqrfS1k7Loi+JrG6u0vtth5J7Du79r/APtxKlUdvWyW5X395bYWpFxjVjNThKKcHCzUk800TnLas4tZX37nfpMq9ehO67CqWOj3a0b3y39hfGKsAARVjiH6zKDKtZ+s+1lKR0ZQZEkyNwIs+M+kWBBkWTZBgU5Gl9c0Pt1GXHCxXhUn8zdEjT2uuP2rCPjh5+UwNeR3rtR0HyAj9npe/H4HPtPeu1HQ/ISP2ej76/hAz3C83vPp8wvN7z6c72sUsbLmrruWk5FfGy9ZLhH4t/Is6kjc6Hh8r9NQwWFqYi0fSO0KUbJbdWWUV2dL6kzQ2NxTnVnKpLbqTl6SUpPnt9L7+joyMk1taddfF/RoP6vCeq+Eq8knN9ytHtUjCo0KklfeuNv1KivVrLJdrdtyRa1JO+6/Xa59dBpcXwR8Tl0pd4FejUSV+tN9SvmV1USs8ss27rMsqcZEvokm8s+xNg02Tqu5S7M/oFaTcK154e/7upvlT6k1mlxT4m1aTS73dt9Jy/RnUpzU4ycZwkpRkt8Zp3T7nY6L5O6VjisNQxMcvSwTlFfsVFlOPdJNAZFhp2afBo9U8Ok8j2oO6T4pGcliQB8ZlXnz3vtZTkTkUqjOjKEmRuRcj5tASPjFwBFkJE2RYFNmoNd6+0YF8aNdeE4fM3AzUmvGP1mj3xhi14Oj8wNa0udH3o/FHRfIZfZ6HbL+E50oc+Hvw+KOjuRK+ow66pvySAzbC83vPow3N7wc721FjjX677EeLyg0nHD4eviJbqNOU7cWl6se92XeexpPKfbFfqaw1x6T2MLSoJ54iqnJf7umtp/m2DcZYzqw5N/0hjpVMQtujSbrV+FWpJtqD6m831ZdJ0NSoQjFQjGMYrJRSSilwSRheqPQ30fR9ObVqmIfpZu1nnuXctldxnBmtRTdGPsx8EPQw9mP4UVAQU/Qw9mPgj6qa6El2JEwBgutHkhTxeFnXp00sXQi5wlFJSqxXOpy45buD7zBNUOlf9owbeWWIpLqyjUt1XcH3s3pON009zyOesdR/o3T0VzaU6uSW70Ve8bdil/CaxSty4eZ7uH5kfdXwMZwtQyeirRiuCS8hkRMjPc+xkgZV5snY0ppPlnjY4utVpV26TqS2KM0pUthN7MbdGVs00zcnK/HegwWJqdPo3GL+9P1V8TnHFzzZ0x9s1svQ+sejO0cVB0JZLbjedJ9fGPn2mZYXF06kVUpTjUg90oSUovvRzhVm1ubRW0fpmvQlt0Zypy6XTbjftW5rqaLYjpCMioaj0PrTnG0cVR9Iv7SlaM+1x3PusZRh9aGinZTq1KTf9pRqW8Y3XmRWaEWjw8Ny10XU5mPw2fRKoqb8JWZ6lHHUZ/1dalO/sVIS+DAqM1Nr0Tvo5pN5YxZdfoPkbbsa21uxjJ4ODecfTyaW9RexZ267PwA0/hoy26d00vSU/4kdO8iY2wkEap0dq/xFSlQxUKTq0Z7FWLpyi3k72cd97o27yTpSVDZcJRcZNNSi0/MDI8Nu7wfaEWlnxPhzvbS10nSUo79mUdzadn1OxpPlzoXGYvSmGhKi1hFKFKNVShKOw5bVWUkneN0rZroRvshKCe9J9yLKaWmDq0oQhTjJWhFJWLlV4vcz46ceC8EfVFcF4EEvSLiNtcQkuAsgG2uI9IuIsj7YCDrxXSai13aAnXeFxOGhOpUTlRnGmvWtJXjJ9ScfzG39lcD64rgWUYdyOo1atGjPEx9HV2I+lpq8vXSz9ZZWvnvMzR8PqFuzQACC30hgqdenOjVgp06itKL3NGv9JansFUu6WIxWH+6pwqx/Om/M2QBsaaxWpGf7vSK/wATDX/hmefV1I479nG4WXvU60Phc3oDXKmmgp6ltKLdXwD7Z4hf6Ra19S2lmufgX2Vq1/OkdEIE5VNOZ6mp3S8f3dCXuVb/AKIgtWOk476MV17DkdNAcqac7YTkZpWNkq1Wl1U9qNvM9PDcgK85beIqV60na7qTlmb2DS4DdNMf0H6alSp0rR2KcYwitm1opWSyPbpVJPfG3eVT6RQAAf/Z",
  "discount": 7.0
}'

# Adding ThinkPad X1 Carbon
curl -b cookie.txt -X POST "https://scart-xebia.onrender.com/products" \
-H "Content-Type: application/json" \
-d '{
  "title": "ThinkPad X1 Carbon",
  "brand": "Lenovo",
  "price": 899.99,
  "color": "black",
  "image": "https://www.stepstrade.com/wp-content/uploads/2021/03/lenovo-laptop-thinkpad-x1-carbon-gen8-subseries-hero.png",
  "discount": 9.0
}'

# Cleanup: remove the cookie file
# rm cookie.txt
