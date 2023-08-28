# Use an official Python runtime as a parent image
FROM python:3.9-slim-buster

# Set the working directory in the container to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install pymongo>=3.11.0 \
    flask_cors>=3.0.10 \
    MarkupSafe==1.1.1 \
    Flask>=2.0.1 \
    itsdangerous>=2.0.1 \
    flask_pymongo>=2.3.0 \
    bcrypt>=3.2.0\
    flask-restx>=1.1.0\
    flask_bcrypt

# Make port 10000 available to the world outside this container
EXPOSE 10000

# Define environment variable
ENV NAME World

# Run app.py when the container launches
CMD python app.py