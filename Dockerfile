FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY eatcarefully_zpi_wit_pwr_edu_pl_cert.cer /etc/nginx/ssl/
COPY eatcarefully.zpi.wit.pwr.edu.pl.key /etc/nginx/ssl/
RUN chmod 600 /etc/nginx/ssl/*

EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]