FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies including SendGrid
RUN npm install
RUN npm install @sendgrid/mail

# Copy all files
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the port
EXPOSE 3001

# Start command
CMD ["node", "api/index.js"] 