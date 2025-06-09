# Using the official Node.js image as a base
FROM node:16
# Setting the working directory inside the container
WORKDIR /usr/src/app
# Copying package.json and package-lock.json
COPY package*.json ./
# Installing dependencies
RUN npm install
# Copying the rest of the application code
COPY . .
# Exposing the application port
EXPOSE 5000
# Command to run the application
CMD ["node", "src/server.js"]
