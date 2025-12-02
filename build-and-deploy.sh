#!/bin/bash

# Script para construir y desplegar todas las aplicaciones con Docker
# Dominio: bingoonlinecincoa.live

set -e

echo "🚀 Iniciando construcción y despliegue de Riffy..."
echo "🌐 Dominio: bingoonlinecincoa.live"

# Colores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Verificar que Docker está corriendo
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}❌ Docker no está corriendo. Por favor inicia Docker primero.${NC}"
    exit 1
fi

# Verificar que docker compose está disponible
COMPOSE_CMD="docker compose"
if ! $COMPOSE_CMD version &> /dev/null; then
    COMPOSE_CMD="docker-compose"
fi

# Cargar variables de entorno
if [ -f .env ]; then
    echo -e "${YELLOW}📝 Cargando variables de entorno desde .env...${NC}"
    export $(cat .env | grep -v '^#' | xargs)
fi

# Detener contenedores existentes
echo -e "${YELLOW}🛑 Deteniendo contenedores existentes...${NC}"
$COMPOSE_CMD down 2>/dev/null || true

# Construir las imágenes
echo -e "${YELLOW}🔨 Construyendo imágenes Docker...${NC}"
echo -e "${YELLOW}   Esto puede tardar varios minutos...${NC}"
$COMPOSE_CMD build --no-cache

# Levantar los servicios
echo -e "${YELLOW}🚀 Levantando servicios...${NC}"
$COMPOSE_CMD up -d

# Esperar a que los servicios estén listos
echo -e "${YELLOW}⏳ Esperando a que los servicios estén listos...${NC}"
sleep 15

# Verificar estado de los contenedores
echo -e "${YELLOW}📊 Estado de los contenedores:${NC}"
$COMPOSE_CMD ps

# Mostrar logs recientes
echo -e "\n${YELLOW}📋 Logs recientes de Traefik:${NC}"
$COMPOSE_CMD logs --tail=20 traefik

# Verificar certificados SSL
echo -e "\n${YELLOW}🔒 Verificando certificados SSL...${NC}"
sleep 10
echo -e "${YELLOW}   Los certificados SSL se generarán automáticamente por Let's Encrypt${NC}"
echo -e "${YELLOW}   Esto puede tardar unos minutos la primera vez...${NC}"

# Mostrar información de acceso
echo -e "\n${GREEN}✅ Servicios levantados exitosamente!${NC}"
echo -e "\n${GREEN}📍 URLs de acceso:${NC}"
echo -e "   🌐 Web:        https://bingoonlinecincoa.live"
echo -e "   🌐 Web (www):  https://www.bingoonlinecincoa.live"
echo -e "   🔧 Admin:      https://admin.bingoonlinecincoa.live"
echo -e "   🔌 API:        https://api.bingoonlinecincoa.live"
echo -e "   📊 GraphQL:    https://api.bingoonlinecincoa.live/graphql"
echo -e "   🛠️  Traefik:    https://traefik.bingoonlinecincoa.live"
echo -e "\n${YELLOW}💡 Para ver los logs en tiempo real:${NC}"
echo -e "   $COMPOSE_CMD logs -f"
echo -e "\n${YELLOW}💡 Para verificar certificados SSL:${NC}"
echo -e "   $COMPOSE_CMD exec traefik cat /etc/traefik/acme.json"
echo -e "\n${YELLOW}💡 Para detener los servicios:${NC}"
echo -e "   $COMPOSE_CMD down"

