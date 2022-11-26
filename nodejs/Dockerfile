FROM node:latest
WORKDIR /app
COPY package*.json .
RUN npm install
COPY ./app /app/src
EXPOSE 3000
CMD ["npm", "run", "server"]