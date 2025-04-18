#build
FROM node:20.12.1 AS builder

WORKDIR /usr/app

ENV TZ=America/Manaus
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . ./
RUN yarn build

#production
FROM node:20.12.1 AS production

ARG PORT
ENV NODE_ENV=production
ENV TZ=America/Manaus

WORKDIR /usr/app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production

COPY --from=builder /usr/app/dist ./dist
COPY --from=builder /usr/app/prisma ./prisma
COPY --from=builder /usr/app/.env ./

EXPOSE ${PORT}

CMD ["yarn", "prod"]
