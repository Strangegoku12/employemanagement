# Use Node.js 18
FROM node:18-alpine

WORKDIR /app

# Copy only dependency files first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install -g @angular/cli && npm install

# Copy project files
COPY . .

# Expose Angular's default dev port
EXPOSE 4200

# Start Angular dev server
CMD ["npm", "start"]
