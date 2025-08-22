# Etapa 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

COPY ../../package.json ../../pnpm-lock.yaml ./
COPY ../../apps/minigames ./apps/minigames
COPY ../../packages ./packages

RUN npm install -g pnpm && pnpm install
RUN pnpm --filter riffy-web build

# Etapa 2: Runtime
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/apps/minigames/web/.next .next
COPY --from=builder /app/apps/minigames/web/public public
COPY --from=builder /app/apps/minigames/web/package.json .
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
CMD ["pnpm", "start"]
