#!/bin/bash

# Script de configuración de Traefik para bingly
# Este script te ayudará a configurar Traefik con tu dominio de Namecheap

echo "🚀 Configuración de Traefik para bingly"
echo "======================================"

# Verificar que Docker esté instalado
if ! command -v docker &> /dev/null; then
    echo "❌ Docker no está instalado. Por favor instala Docker primero."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose no está instalado. Por favor instala Docker Compose primero."
    exit 1
fi

echo "✅ Docker y Docker Compose están instalados"

# Solicitar información del dominio
read -p "🌐 Ingresa tu dominio principal (ej: mipagina.com): " DOMAIN
read -p "📧 Ingresa tu email para Let's Encrypt: " EMAIL

# Validar entrada
if [[ -z "$DOMAIN" ]]; then
    echo "❌ El dominio no puede estar vacío"
    exit 1
fi

if [[ -z "$EMAIL" ]]; then
    echo "❌ El email no puede estar vacío"
    exit 1
fi

echo ""
echo "📝 Configurando archivos con tu dominio: $DOMAIN"
echo "📧 Email para SSL: $EMAIL"

# Crear archivo .env si no existe
if [[ ! -f .env ]]; then
    echo "📄 Creando archivo .env..."
    cp traefik.env.example .env
fi

# Actualizar archivos de configuración
echo "🔧 Actualizando configuración..."

# Actualizar traefik.yml
sed -i "s/tu-email@ejemplo.com/$EMAIL/g" traefik.yml

# Actualizar dynamic.yml
sed -i "s/tu-dominio.com/$DOMAIN/g" dynamic.yml

# Actualizar docker-compose.yml
sed -i "s/tu-dominio.com/$DOMAIN/g" docker-compose.yml
sed -i "s/tu-email@ejemplo.com/$EMAIL/g" docker-compose.yml

# Actualizar .env
sed -i "s/tu-dominio.com/$DOMAIN/g" .env
sed -i "s/tu-email@ejemplo.com/$EMAIL/g" .env

echo "✅ Configuración actualizada"

# Crear directorio SSL si no existe
if [[ ! -d ssl ]]; then
    echo "📁 Creando directorio SSL..."
    mkdir -p ssl
    chmod 700 ssl
fi

echo ""
echo "🎉 Configuración completada!"
echo ""
echo "📋 Próximos pasos:"
echo "1. Asegúrate de que tu dominio $DOMAIN apunte a la IP de tu servidor"
echo "2. Configura los siguientes registros DNS en Namecheap:"
echo "   - A record: $DOMAIN -> IP_DEL_SERVIDOR"
echo "   - A record: admin.$DOMAIN -> IP_DEL_SERVIDOR"
echo "   - A record: api.$DOMAIN -> IP_DEL_SERVIDOR"
echo "   - A record: traefik.$DOMAIN -> IP_DEL_SERVIDOR"
echo ""
echo "3. Ejecuta: docker-compose up -d"
echo ""
echo "4. Accede a tu aplicación en:"
echo "   - Web principal: https://$DOMAIN"
echo "   - Panel admin: https://admin.$DOMAIN"
echo "   - API: https://api.$DOMAIN"
echo "   - Dashboard Traefik: https://traefik.$DOMAIN"
echo ""
echo "🔒 Los certificados SSL se generarán automáticamente con Let's Encrypt"
echo "⏳ Puede tomar unos minutos en generar los certificados la primera vez"
