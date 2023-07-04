FROM node:18-alpine as development

# Create app directory
WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./
ENV PUPPETEER_SKIP_DOWNLOAD true


RUN yarn install --frozen-lockfile

COPY --chown=node:node . .

USER node

FROM node:18-alpine as build

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

FROM node:18-alpine as production

ENV NODE_ENV production
USER node

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json yarn.lock ./

RUN yarn install --production --frozen-lockfile

COPY --from=build /usr/src/app/dist ./dist

CMD [ "node", "dist/main.js" ]
