FROM mhart/alpine-node:11.5 as base
RUN mkdir -p /usr/src/app
RUN apk add --update \
    gcc \
    python \
    make \
    g++
WORKDIR /usr/src/app
EXPOSE 3000

# For development run
FROM base as development
ENV NODE_ENV=development
COPY package.json yarn.lock ./
RUN yarn --pure-lockfile
COPY .babelrc webpack.config.js nodemon.json ./
COPY src ./src
COPY bin ./bin
CMD ["yarn", "dev"]

# For production build
# FROM base as build
# ENV NODE_ENV=production
# COPY package.json yarn.lock ./
# COPY .babelrc webpack.config.js ./
# COPY src ./src
# RUN yarn build

# # nginx
# FROM nginx:alpine as nginx
# RUN rm -rf /usr/share/nginx/html/*
# COPY --from=build /usr/src/app/public/ /usr/share/nginx/html
# CMD ["nginx", "-g", "daemon off;"]

# # For production run
# FROM base as production
# ENV NODE_ENV=production
# COPY package.json yarn.lock ./
# RUN yarn install --production
# COPY src ./src
# COPY --from=build /usr/src/app/public ./public
# CMD ["yarn", "start"]