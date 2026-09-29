# --- Stage 1: Build eka ---
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# React app eka production widiyata build karanawa (static files hadanawa)
RUN npm run build

# --- Stage 2: Serve eka (nginx use karala) ---
FROM nginx:alpine

# Build kalpu static files nginx ekata copy karanawa
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]