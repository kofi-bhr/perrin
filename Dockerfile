FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Remove specific port exposure since Railway will handle this
# EXPOSE 3001

# Start the application
CMD ["npm", "start"] 