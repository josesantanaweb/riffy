# Docker Setup para Riffy

Este documento explica cómo usar Docker para ejecutar todo el proyecto Riffy en contenedores.

## Estructura

El proyecto está configurado con los siguientes servicios:

- **PostgreSQL**: Base de datos principal
- **Redis**: Caché y sesiones
- **API**: Backend NestJS con GraphQL
- **Web**: Frontend Next.js (puerto 3000)
- **Admin**: Panel de administración Next.js (puerto 3001)
- **Nginx**: Proxy reverso (puerto 80)

## Requisitos Previos

- Docker
- Docker Compose

## Configuración

1. **Clonar el repositorio y configurar variables de entorno:**

```bash
# Copiar el archivo de ejemplo
cp .env.example .env

# Editar las variables de entorno según tu configuración
nano .env
```

2. **Variables de entorno importantes:**

```env
# Base de datos
DATABASE_URL=postgresql://riffy:riffy123@postgres:5432/riffy
REDIS_URL=redis://redis:6379

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# AWS S3 (para subida de imágenes)
AWS_ACCESS_KEY_ID=your-aws-access-key-id
AWS_SECRET_ACCESS_KEY=your-aws-secret-access-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-s3-bucket-name

# URLs de las aplicaciones
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:4000/graphql
```

## Comandos de Docker

### Construir y ejecutar todos los servicios:

```bash
# Construir y ejecutar en modo detached
docker-compose up -d

# Ver logs en tiempo real
docker-compose logs -f

# Ver logs de un servicio específico
docker-compose logs -f api
```

### Comandos útiles:

```bash
# Parar todos los servicios
docker-compose down

# Parar y eliminar volúmenes (CUIDADO: elimina datos de BD)
docker-compose down -v

# Reconstruir un servicio específico
docker-compose build api
docker-compose up -d api

# Ejecutar comandos dentro de un contenedor
docker-compose exec api sh
docker-compose exec postgres psql -U riffy -d riffy

# Ver estado de los servicios
docker-compose ps

# Ver uso de recursos
docker stats
```

### Migraciones de base de datos:

```bash
# Ejecutar migraciones de Prisma
docker-compose exec api npx prisma migrate deploy

# Abrir Prisma Studio
docker-compose exec api npx prisma studio
```

## Acceso a las Aplicaciones

Una vez que todos los servicios estén ejecutándose:

- **Aplicación Web**: http://localhost:3000
- **Panel Admin**: http://localhost:3001
- **API GraphQL**: http://localhost:4000/graphql
- **API REST**: http://localhost:4000/api
- **Con Nginx**: http://localhost (rutea automáticamente)

## Desarrollo

Para desarrollo, puedes ejecutar solo algunos servicios:

```bash
# Solo base de datos y Redis
docker-compose up -d postgres redis

# Solo API
docker-compose up -d postgres redis api

# Ejecutar frontend en modo desarrollo local
cd apps/web
pnpm dev
```

## Producción

Para producción, asegúrate de:

1. **Configurar SSL/TLS** en Nginx
2. **Cambiar passwords** por defecto
3. **Configurar variables de entorno** de producción
4. **Usar un reverse proxy** externo si es necesario
5. **Configurar backups** de la base de datos

### Ejemplo de configuración de producción:

```bash
# Usar docker-compose con archivo de producción
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

## Troubleshooting

### Problemas comunes:

1. **Puertos ocupados**: Cambia los puertos en `docker-compose.yml`
2. **Permisos de archivos**: En Linux, asegúrate de que los archivos tengan los permisos correctos
3. **Memoria insuficiente**: Aumenta la memoria disponible para Docker
4. **Base de datos no conecta**: Verifica que PostgreSQL esté completamente iniciado antes que la API

### Logs útiles:

```bash
# Ver logs de todos los servicios
docker-compose logs

# Ver logs de un servicio específico
docker-compose logs api
docker-compose logs postgres

# Ver logs en tiempo real
docker-compose logs -f --tail=100
```

### Limpiar Docker:

```bash
# Eliminar contenedores parados
docker container prune

# Eliminar imágenes no utilizadas
docker image prune

# Eliminar volúmenes no utilizados
docker volume prune

# Limpiar todo (CUIDADO)
docker system prune -a
```
