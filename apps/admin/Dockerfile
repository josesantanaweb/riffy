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

# Copiar configuración de la aplicación admin
COPY apps/admin/package.json ./apps/admin/
COPY apps/admin/tsconfig.json ./apps/admin/
COPY apps/admin/next.config.js ./apps/admin/
COPY apps/admin/postcss.config.js ./apps/admin/

# Instalar dependencias
RUN pnpm install

# Stage de build
FROM base AS builder

# Copiar código fuente de la aplicación admin
COPY apps/admin/src ./apps/admin/src
COPY apps/admin/public ./apps/admin/public
COPY apps/admin/.env ./apps/admin/.env

# Build de la aplicación
WORKDIR /app/apps/admin
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

# Copiar configuración de la aplicación admin
COPY apps/admin/package.json ./apps/admin/
COPY apps/admin/tsconfig.json ./apps/admin/
COPY apps/admin/next.config.js ./apps/admin/
COPY apps/admin/postcss.config.js ./apps/admin/

# Instalar solo dependencias de producción (saltar scripts de prepare)
RUN pnpm install --prod --ignore-scripts

# Copiar archivos compilados y públicos
COPY --from=builder /app/apps/admin/.next/standalone ./
COPY --from=builder /app/apps/admin/.next/static ./apps/admin/.next/static
COPY --from=builder /app/apps/admin/public ./apps/admin/public
COPY apps/admin/.env ./apps/admin/.env

# Cambiar ownership al usuario nextjs
RUN chown -R nextjs:nodejs /app
USER nextjs

# Exponer puerto
EXPOSE 3001

# Variables de entorno
ENV PORT 3001
ENV HOSTNAME "0.0.0.0"

# Comando por defecto
WORKDIR /app
CMD ["node", "apps/admin/server.js"]
