FROM node:10-alpine

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Install app dependencies
COPY package.json /app
COPY package-lock.json /app
RUN npm install

# Bundle app source
COPY . /app

CMD [ "npm", "start" ]