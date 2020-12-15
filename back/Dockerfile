FROM node:12.18.3-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install --ignore-scripts
COPY . .
EXPOSE 3000
CMD npm start