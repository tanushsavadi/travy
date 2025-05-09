FROM node:23-alpine

# Set the working directory in the container
WORKDIR /app

# Install curl for testing HTTP endpoints inside the container
RUN apk add --no-cache curl

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3001

# Build the project (assumes a build script is defined in package.json)
RUN npm run build

# Run the app using the start script
CMD ["npm", "start"]
