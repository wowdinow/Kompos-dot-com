FROM node:18.16.1

WORKDIR /src/services/users/

ENV PORT=4001

COPY package.json package-lock.json /src/services/users/

RUN npm install && npm cache clean --force

RUN npm install -g nodemon

COPY ./ ./

CMD ["npm", "run", "start"]