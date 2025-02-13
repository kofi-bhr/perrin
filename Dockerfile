FROM node:18-alpine

WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install ALL dependencies (including devDependencies)
RUN npm install

# Copy project files
COPY api/ ./api/
COPY app/ ./app/
COPY components/ ./components/
COPY lib/ ./lib/
COPY public/ ./public/
COPY types/ ./types/
COPY next.config.js ./
COPY tsconfig.json ./
COPY postcss.config.js ./
COPY tailwind.config.js ./
COPY .env* ./

# Build the application
RUN npm run build

# Debug - List all files
RUN ls -la /app

# Remove specific port exposure since Railway will handle this
# EXPOSE 3001

# Start the application
CMD ["npm", "start"] 