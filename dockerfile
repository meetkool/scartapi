# Use an official Python runtime as a parent image
FROM python:3.9-slim-buster

# Set the working directory in the container to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install pymongo>=3.11.0 && \
    pip install flask_cors>=3.0.10 && \
    pip install MarkupSafe==1.1.1 && \
    pip install Flask>=2.0.1 && \
    pip install itsdangerous>=2.0.1 && \
    pip install flask_pymongo>=2.3.0 && \
    pip install bcrypt>=3.2.0\
    pip install flask-restx>=1.1.0


# Make port 5000 available to the world outside this container
EXPOSE 5000

# Define environment variable
ENV NAME World

# Run app.py when the container launches
CMD ["python", "app.py"]
