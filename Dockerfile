FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Remove specific port exposure since Railway will handle this
# EXPOSE 3001

CMD ["npm", "start"] 