# Use official Node.js lightweight LTS image
FROM node:20-alpine

# Set working directory inside container
WORKDIR /app

# Copy dependency manifests
COPY package*.json ./

# Install dependencies inside container
RUN npm install --production

# Copy all application source code, assets, and database
COPY . .

# Expose port 3000
EXPOSE 3000

# Set environment variables
ENV PORT=3000
ENV NODE_ENV=production

# Command to launch application server
CMD ["node", "server.js"]
