FROM node:18-alpine

WORKDIR /usr/cases-app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3030

CMD ["npm", "run", "container"]
