# --- Build stage ---
FROM node:20-alpine AS build
WORKDIR /app

# Install dependencies first (caches better)
COPY package*.json ./
RUN npm ci

# Copy rest of the source code
COPY . .

# Pass API URL during build (optional, defaults to localhost)
ARG VITE_API_URL=http://localhost:4000
ENV VITE_API_URL=$VITE_API_URL

# Build for production
RUN npm run build

# --- Serve stage ---
FROM nginx:alpine
# Remove default nginx page
RUN rm -rf /usr/share/nginx/html/*
# Copy built files from build stage
COPY --from=build /app/build /usr/share/nginx/html
# Copy custom nginx config (optional for SPA routing)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
