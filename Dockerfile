FROM node:20-bookworm-slim

WORKDIR /opt/app

COPY package*.json ./

RUN npm ci --include=dev

COPY . .

RUN npm run build && npm prune --omit=dev

EXPOSE 1337

CMD ["npm", "run", "start"]