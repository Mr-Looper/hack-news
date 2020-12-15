FROM node:12.18.3-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install --ignore-scripts
COPY . .
EXPOSE 4200
CMD npm run start:docker
