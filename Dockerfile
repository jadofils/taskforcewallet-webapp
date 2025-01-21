# Use Node.js 18 as the base image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /usr/backend/app

# Copy package files first for efficient caching
COPY package*.json ./

# Install production dependencies
RUN npm ci --only=production

# Copy the entire application into the container
COPY . .

# Expose the application port
EXPOSE 5000

# Run the application
CMD ["npm", "start"]
