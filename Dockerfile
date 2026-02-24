# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# BUILDER STAGE - Application compilation
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FROM node:lts-alpine AS builder
WORKDIR /app

RUN corepack enable

ARG NODE_ENV
ARG OWN_SW

ENV HUSKY=0 \
    NODE_ENV=$NODE_ENV \
    OWN_SW=$OWN_SW

COPY package*.json .
COPY pnpm-lock.yaml* .
COPY yarn.lock* .

RUN if [ -f "pnpm-lock.yaml" ]; then \
        echo "pnpm" > .pm; \
    elif [ -f "yarn.lock" ]; then \
        echo "yarn" > .pm; \
    else \
        echo "npm" > .pm; \
    fi

RUN PM=$(cat .pm); \
    if [ "$PM" = "pnpm" ]; then \
        pnpm install --prod=false --frozen-lockfile; \
    elif [ "$PM" = "yarn" ]; then \
        yarn install --production=false --frozen-lockfile; \
    else \
        npm ci --include=dev; \
    fi

COPY . .

RUN PM=$(cat .pm); \
    if [ "$PM" = "pnpm" ]; then \
        pnpm run build; \
    elif [ "$PM" = "yarn" ]; then \
        yarn run build; \
    else \
        npm run build; \
    fi

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# RUNTIME STAGE - Production deployment
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FROM node:lts-alpine AS runtime
WORKDIR /app

RUN apk add --no-cache curl

USER node

ENV NUXT_PUBLIC_I18N_BASE_URL=http://localhost:3000 \
    NUXT_APP_CDN_URL=/ \
    NITRO_PORT=3000 \
    NITRO_HOST=0.0.0.0

COPY --from=builder --chown=node:node /app/.output ./.output

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:$NITRO_PORT || exit 1

CMD ["node", ".output/server/index.mjs"]
