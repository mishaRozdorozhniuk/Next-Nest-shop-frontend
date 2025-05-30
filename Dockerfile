FROM node:20 AS base
WORKDIR /app
COPY package*.json ./
RUN npm install

FROM base AS dev
WORKDIR /app
COPY . .
CMD ["npm", "run", "dev"]

FROM base AS prod
WORKDIR /app
COPY . .
RUN npm run build
CMD ["npm", "run", "start"]
