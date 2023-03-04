FROM node
WORKDIR /app
COPY package.json .
RUN npm i
COPY . .
EXPOSE 7201
CMD ["npm", "start"]