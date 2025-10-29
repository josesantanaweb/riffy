# Multi-stage build para optimizar el tamaño de la imagen
FROM node:18-alpine AS base

# Instalar pnpm versión específica
RUN npm install -g pnpm@9.15.3

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de configuración del workspace
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY turbo.json ./

# Copiar configuración de TypeScript
COPY tsconfig.json ./

# Copiar todos los packages
COPY packages/ ./packages/

# Copiar configuración de la aplicación web
COPY apps/web/package.json ./apps/web/
COPY apps/web/tsconfig.json ./apps/web/
COPY apps/web/next.config.js ./apps/web/
COPY apps/web/postcss.config.js ./apps/web/

# Instalar dependencias
RUN pnpm install --frozen-lockfile

# Stage de build
FROM base AS builder

# Copiar código fuente de la aplicación web
COPY apps/web/src ./apps/web/src
COPY apps/web/public ./apps/web/public
COPY apps/web/.env ./apps/web/.env

# Build de la aplicación
WORKDIR /app/apps/web
RUN pnpm build

# Stage de producción
FROM node:18-alpine AS runner

# Instalar pnpm versión específica
RUN npm install -g pnpm@9.15.3

# Crear usuario no-root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de configuración del workspace
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY turbo.json ./

# Copiar configuración de TypeScript
COPY tsconfig.json ./

# Copiar todos los packages
COPY packages/ ./packages/

# Copiar configuración de la aplicación web
COPY apps/web/package.json ./apps/web/
COPY apps/web/tsconfig.json ./apps/web/
COPY apps/web/next.config.js ./apps/web/
COPY apps/web/postcss.config.js ./apps/web/

# Instalar solo dependencias de producción (saltar scripts de prepare)
RUN pnpm install --prod --frozen-lockfile --ignore-scripts

# Copiar archivos compilados y públicos
COPY --from=builder /app/apps/web/.next/standalone ./
COPY --from=builder /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder /app/apps/web/public ./apps/web/public
COPY apps/web/.env ./apps/web/.env

# Cambiar ownership al usuario nextjs
RUN chown -R nextjs:nodejs /app
USER nextjs

# Exponer puerto
EXPOSE 3000

# Variables de entorno
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Comando por defecto
WORKDIR /app
CMD ["node", "apps/web/server.js"]
