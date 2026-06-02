FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
ENV CI=false
ENV BROWSER=none
CMD ["npm", "start"]
