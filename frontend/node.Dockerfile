FROM node:20-bullseye

WORKDIR /app

ARG VITE_BACKEND
ENV VITE_BACKEND=$VITE_BACKEND

COPY package.json ./

RUN npm install

COPY . .

CMD ["node", "serverInit.js"]