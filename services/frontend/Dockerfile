# Build stage - use a specific architecture image
FROM --platform=linux/amd64 node:18 AS builder
WORKDIR /app
COPY . .

# Clean install to avoid dependency issues
RUN rm -rf node_modules package-lock.json
RUN npm install
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]