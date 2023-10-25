FROM node:18.16.1

WORKDIR /src/services/app/

ENV PORT=4002

COPY package.json package-lock.json /src/services/app/

RUN npm install && npm cache clean --force

RUN npm install -g nodemon

COPY ./ ./

CMD ["npm", "run", "start"]