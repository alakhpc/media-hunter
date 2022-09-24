FROM node:18-slim
WORKDIR /app

RUN apt-get update
RUN apt-get install -y openssl

COPY . .
RUN yarn --immutable

EXPOSE 3000

RUN yarn prisma generate
RUN yarn build

CMD ["yarn", "docker"]
