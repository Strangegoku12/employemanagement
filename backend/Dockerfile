FROM node:18-alpine

WORKDIR /app

# Copy dependency files
COPY package*.json ./

RUN npm install

# Copy project files
COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
