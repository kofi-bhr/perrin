FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY .eslintrc.js ./

# Install dependencies
RUN npm install

# Copy project files
COPY app/ ./app/
COPY components/ ./components/
COPY lib/ ./lib/
COPY public/ ./public/
COPY types/ ./types/
COPY next.config.js ./
COPY tsconfig.json ./
COPY postcss.config.js ./
COPY tailwind.config.js ./

# Build the application
RUN npm run build

# Remove specific port exposure since Railway will handle this
# EXPOSE 3001

# Start the application
CMD ["npm", "start"] 