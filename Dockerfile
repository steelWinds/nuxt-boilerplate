# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# BUILDER STAGE - Application compilation
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FROM node:lts-alpine AS builder
WORKDIR /app

RUN corepack enable

# For disable husky prepare install
ENV HUSKY=0

ARG NODE_ENV=production
ARG NUXT_PUBLIC_I18N_BASE_URL=/
ARG OWN_SW=true

COPY package*.json .
COPY pnpm-lock.yaml* .
COPY yarn.lock* .

RUN if [ -f "pnpm-lock.yaml" ]; then \
      npm install -g pnpm && \
      pnpm install --prod=false; \
    elif [ -f "yarn.lock" ]; then \
      npm install -g yarn && \
      yarn install --production=false; \
    else \
      npm install --include=dev; \
    fi && \
    npm cache clean --force && \
    rm -rf /tmp/.npm

COPY . .

RUN if [ -f "pnpm-lock.yaml" ]; then \
      pnpm run build; \
    elif [ -f "yarn.lock" ]; then \
      yarn run build; \
    else \
      npm run build; \
    fi
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# RUNTIME STAGE - Production deployment
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FROM node:lts-alpine AS runtime
WORKDIR /app

USER node

ENV NODE_ENV=production
ENV NUXT_PUBLIC_I18N_BASE_URL=/
ENV OWN_SW=true

COPY --from=builder --chown=node:node /app/.output ./.output
COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/node_modules ./node_modules
COPY --from=builder --chown=node:node /app/.env ./

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (r) => { \
  process.exit(r.statusCode === 200 ? 0 : 1); \
  }).on('error', () => process.exit(1))"

CMD ["node", ".output/server/index.mjs"]
