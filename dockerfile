# Use the official Node.js 14 image as the base image
FROM node:20.1.0

# Set the working directory inside the container
WORKDIR /

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY . .

# Expose the port that the Node.js application will listen on
EXPOSE 3000

# Start the Node.js application
CMD ["npm", "run", "dev"]
