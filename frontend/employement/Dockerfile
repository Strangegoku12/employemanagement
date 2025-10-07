# Use official Node image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install deps
COPY package*.json ./
RUN npm install

# Copy all source code
COPY . .

# Expose Angular default port
EXPOSE 4200

# Start the Angular dev server
CMD ["npm", "run", "start", "--", "--host", "0.0.0.0"]
