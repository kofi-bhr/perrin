FROM node:18-alpine

WORKDIR /app

# Add volume mount point
RUN mkdir -p /data/data /data/uploads
VOLUME /data

# Copy package files first
COPY package*.json ./
COPY .eslintrc.js ./

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

# Add build arg for API URL
ARG NEXT_PUBLIC_API_URL=https://perrin-production.up.railway.app

# Set as environment variable
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Build the application
RUN npm run build

# Debug - List all files
RUN ls -la /app

# Remove specific port exposure since Railway will handle this
# EXPOSE 3001

# Start the application
CMD ["npm", "start"] 