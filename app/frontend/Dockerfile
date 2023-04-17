FROM node:16.14-alpine

WORKDIR /app-frontend

EXPOSE 5173

COPY . .

RUN npm install

ENTRYPOINT [ "npm", "run", "dev" ]
