FROM node:22.14.0 AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY build ./build
COPY package*.json ./
COPY prisma ./prisma

RUN npm ci --omit=dev

EXPOSE 3333
CMD ["node", "build/server.js"]
