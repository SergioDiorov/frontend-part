FROM node

WORKDIR /app

COPY package.json .

ENV REACT_APP_SERVER_URL http://localhost:3000/
ENV REACT_APP_STATIC_IMAGES_URL http://localhost:3000/profiles/images/

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]