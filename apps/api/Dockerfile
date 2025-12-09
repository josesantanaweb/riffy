# Multi-stage build para optimizar el tamaño de la imagen
FROM node:20-slim AS base

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

# Copiar configuración de la API
COPY apps/api/package.json ./apps/api/
COPY apps/api/tsconfig.json ./apps/api/
COPY apps/api/tsconfig.build.json ./apps/api/
COPY apps/api/nest-cli.json ./apps/api/

# Instalar dependencias
RUN pnpm install --frozen-lockfile

# Stage de build
FROM base AS builder

# Copiar código fuente de la API
COPY apps/api/src ./apps/api/src
COPY apps/api/prisma ./apps/api/prisma

# Generar Prisma Client y build de la aplicación
WORKDIR /app/apps/api
RUN npx prisma generate
RUN pnpm build

# Stage de producción
FROM node:20-slim AS runner

# Instalar dependencias del sistema necesarias para Prisma
RUN apt-get update && apt-get install -y \
    openssl \
    ca-certificates \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Instalar pnpm versión específica
RUN npm install -g pnpm@9.15.3

# Crear usuario no-root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de configuración del workspace
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY turbo.json ./

# Copiar configuración de TypeScript
COPY tsconfig.json ./

# Copiar todos los packages
COPY packages/ ./packages/

# Copiar configuración de la API
COPY apps/api/package.json ./apps/api/
COPY apps/api/tsconfig.json ./apps/api/
COPY apps/api/nest-cli.json ./apps/api/
COPY apps/api/prisma ./apps/api/prisma

# Instalar todas las dependencias (saltar scripts de prepare)
RUN pnpm install --frozen-lockfile --ignore-scripts

# Copiar código compilado
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/apps/api/prisma ./apps/api/prisma

# Generar Prisma Client en el contenedor de producción
WORKDIR /app/apps/api
RUN npx prisma generate

# Cambiar ownership al usuario nestjs
RUN chown -R nestjs:nodejs /app
USER nestjs

# Exponer puerto
EXPOSE 4000

# Configurar variables de entorno para la resolución de módulos
ENV NODE_PATH=/app/node_modules/.pnpm/express@4.21.2/node_modules:/app/node_modules/.pnpm/@nestjs+platform-express@11.0.1/node_modules:/app/node_modules

# Comando por defecto
WORKDIR /app
CMD ["node", "apps/api/dist/main.js"]
