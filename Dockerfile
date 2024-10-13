FROM node:18-alpine

WORKDIR /adoption-frontend/
COPY public/ /adoption-frontend/public
COPY src/ /adoption-frontend/src
COPY package.json /adoption-frontend/

RUN npm install

CMD ["npm", "start"]