FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# La ligne suivante est optionnelle si vous n'avez pas de build step
# RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app .
EXPOSE 5000
CMD ["npm", "start"]