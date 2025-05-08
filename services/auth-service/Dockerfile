# services/auth-service/Dockerfile
FROM node:18
WORKDIR /app
COPY . .
RUN npm install
RUN npm install --save-dev @types/express
RUN npm run build
CMD ["npm", "start"]
EXPOSE 5002
