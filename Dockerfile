ARG NODE_IMAGE=docker.io/library/node:22-alpine

FROM $NODE_IMAGE as builder

WORKDIR /app

ENV NODE_ENV production

# Install dependencies
COPY package.json *.lock ./
RUN yarn install --frozen-lockfile --non-interactive --production false

COPY . .

RUN set -ex;\
    yarn build;\
    cd dist; pwd; ls -lahF;

# Clean devDependencies
RUN set -ex;\
    rm -rf node_modules;\
    yarn install --frozen-lockfile --non-interactive --production true;

# ---

FROM $NODE_IMAGE as app

WORKDIR /app

CMD ["yarn", "serve"]

ENV NODE_ENV production
ENV NODE_OPTIONS --enable-source-maps
ENV HOST 0.0.0.0
ENV PORT 80

EXPOSE 80

# Copy all deps from last stage
COPY --from=builder /app/node_modules ./node_modules

COPY --from=builder /app/package.json ./

COPY --from=builder /app/dist ./dist
