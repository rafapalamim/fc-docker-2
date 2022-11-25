FROM node:latest
WORKDIR /app
COPY package*.json .
RUN npm install && npm install -g nodemon
EXPOSE 3000
CMD ["nodemon", "/app/src/app.js"]