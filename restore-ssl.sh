#!/bin/bash

# Script de restauración para certificados SSL de Traefik
# Uso: ./restore-ssl.sh /path/to/backup-file.tar.gz

if [[ $# -eq 0 ]]; then
    echo "❌ Error: Debes especificar el archivo de backup"
    echo "💡 Uso: $0 /path/to/backup-file.tar.gz"
    echo ""
    echo "📋 Backups disponibles:"
    ls -la /var/backups/riffy-ssl/traefik-ssl-backup-*.tar.gz 2>/dev/null || echo "   No hay backups disponibles"
    exit 1
fi

BACKUP_FILE="$1"

# Verificar que el archivo de backup existe
if [[ ! -f "$BACKUP_FILE" ]]; then
    echo "❌ Error: El archivo de backup no existe: $BACKUP_FILE"
    exit 1
fi

echo "🔄 Iniciando restauración de certificados SSL..."
echo "📦 Archivo de backup: $BACKUP_FILE"
echo "📅 Fecha: $(date)"

# Parar Traefik temporalmente
echo "⏸️  Parando Traefik..."
docker-compose stop traefik

# Crear directorio temporal para extraer
TEMP_DIR="/tmp/traefik-restore-$$"
mkdir -p "$TEMP_DIR"

# Extraer archivo de backup
echo "📤 Extrayendo archivo de backup..."
tar -xzf "$BACKUP_FILE" -C "$TEMP_DIR"

# Verificar que se extrajo correctamente
if [[ ! -f "$TEMP_DIR/ssl-backup-acme.json" ]]; then
    echo "❌ Error: No se encontró el archivo acme.json en el backup"
    rm -rf "$TEMP_DIR"
    exit 1
fi

# Copiar archivo acme.json al volumen de Traefik
echo "📋 Restaurando certificados SSL..."

# Crear el directorio del volumen si no existe
docker volume create traefik_acme 2>/dev/null || true

# Copiar el archivo acme.json
docker run --rm -v traefik_acme:/data -v "$TEMP_DIR:/backup" alpine \
    cp /backup/ssl-backup-acme.json /data/acme.json

# Limpiar directorio temporal
rm -rf "$TEMP_DIR"

# Verificar permisos del archivo acme.json
docker run --rm -v traefik_acme:/data alpine \
    chmod 600 /data/acme.json

echo "✅ Certificados SSL restaurados"

# Reiniciar Traefik
echo "🚀 Reiniciando Traefik..."
docker-compose up -d traefik

# Esperar a que Traefik se inicie
echo "⏳ Esperando a que Traefik se inicie..."
sleep 10

# Verificar que Traefik esté corriendo
if docker-compose ps traefik | grep -q "Up"; then
    echo "✅ Traefik reiniciado exitosamente"
    echo ""
    echo "🔍 Verificando certificados..."
    
    # Verificar que los certificados estén disponibles
    if docker-compose exec traefik test -f /etc/traefik/acme.json; then
        echo "✅ Archivo acme.json encontrado en Traefik"
        echo "🔒 Certificados SSL restaurados correctamente"
    else
        echo "⚠️  Advertencia: No se pudo verificar el archivo acme.json"
    fi
    
else
    echo "❌ Error: Traefik no se inició correctamente"
    echo "📋 Revisa los logs: docker-compose logs traefik"
    exit 1
fi

echo ""
echo "🎉 Restauración completada exitosamente!"
echo ""
echo "💡 Próximos pasos:"
echo "   1. Verifica que tu sitio web funcione con HTTPS"
echo "   2. Revisa el dashboard de Traefik para confirmar certificados"
echo "   3. Configura un backup automático regular"
