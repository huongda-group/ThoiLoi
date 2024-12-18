FROM node:21

WORKDIR /app

COPY package.json ./
COPY tsconfig.json ./
COPY src ./src

RUN npm install
RUN npm run build

FROM node:21

ENV NODE_ENV production

WORKDIR /app

RUN apt-get update -y && apt upgrade -y
RUN npm install -g cross-env
RUN npm config set ignore-scripts true

COPY package.json ./
COPY .env ./

COPY --from=0 /app/dist .
COPY public ./public

RUN cd /app && npm install --only=production

EXPOSE 2208

CMD ["npm", "start"]
