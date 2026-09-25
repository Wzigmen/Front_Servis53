# ---------- Сборка ----------
FROM node:22-alpine AS build

WORKDIR /app

# сначала только зависимости — слой кешируется, пока не меняется package-lock.json
COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build


# ---------- Nginx ----------
FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
