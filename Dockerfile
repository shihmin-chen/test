FROM node:16-alpine3.14

RUN mkdir -p /app/release

WORKDIR /app/release

COPY release .

ENV PORT=80

EXPOSE 80

CMD ["node", "index.js"]
