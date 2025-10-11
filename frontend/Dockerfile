FROM node:20-alpine

WORKDIR /frontend

COPY package.json package-lock.json* ./ 

RUN npm install

COPY . .

EXPOSE 3333

CMD ["npm", "run", "dev"]
