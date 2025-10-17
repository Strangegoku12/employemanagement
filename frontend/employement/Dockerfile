# Use Node.js 18 (full image instead of alpine to avoid optional deps issues)
FROM node:18

WORKDIR /app

# Copy only dependency files first (for caching)
COPY package*.json ./

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Install project dependencies
RUN npm install

# Copy project files
COPY . .

# Expose Angular dev server port
EXPOSE 4200

# Start Angular dev server
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200", "--poll", "2000"]

