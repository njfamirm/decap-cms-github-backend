ARG NODE_IMAGE=docker.io/library/node:20-alpine

FROM $NODE_IMAGE as builder

WORKDIR /app

ENV NODE_ENV production

# Install dependencies
COPY package.json *.lock ./
RUN if [ -f *.lock ]; then \
      yarn install --frozen-lockfile --non-interactive --production false; \
    else \
      yarn install --non-interactive --production false; \
    fi;

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
# ENV ALWATR_DEBUG 1
ENV HOST 0.0.0.0
ENV PORT 80
EXPOSE 80

# Copy all deps from last stage
COPY --from=builder /app/node_modules ./node_modules

# Copy builded files from last stage
ARG PACKAGE_SOURCE
COPY --from=builder /app/package.json ./
COPY --from=builder /app/dist ./dist
RUN pwd; ls -lAhF;
