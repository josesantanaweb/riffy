#!/bin/bash

# Script de backup para certificados SSL de Traefik
# Ejecutar periódicamente para respaldar los certificados Let's Encrypt

BACKUP_DIR="/var/backups/riffy-ssl"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="traefik-ssl-backup-$DATE.tar.gz"

echo "🔒 Iniciando backup de certificados SSL..."
echo "📅 Fecha: $(date)"

# Crear directorio de backup si no existe
mkdir -p "$BACKUP_DIR"

# Verificar que Traefik esté corriendo
if ! docker-compose ps traefik | grep -q "Up"; then
    echo "❌ Traefik no está corriendo. Iniciando servicios..."
    docker-compose up -d traefik
    sleep 10
fi

# Crear backup del volumen de Traefik
echo "📦 Creando backup de certificados..."

# Copiar archivo acme.json del contenedor
docker cp riffy-traefik:/etc/traefik/acme.json ./ssl-backup-acme.json

# Crear archivo comprimido
tar -czf "$BACKUP_DIR/$BACKUP_FILE" \
    ./ssl-backup-acme.json \
    ./traefik.yml \
    ./dynamic.yml \
    ./docker-compose.yml \
    2>/dev/null

# Limpiar archivo temporal
rm -f ./ssl-backup-acme.json

# Verificar que el backup se creó correctamente
if [[ -f "$BACKUP_DIR/$BACKUP_FILE" ]]; then
    echo "✅ Backup creado exitosamente: $BACKUP_DIR/$BACKUP_FILE"
    echo "📊 Tamaño del archivo: $(du -h "$BACKUP_DIR/$BACKUP_FILE" | cut -f1)"
    
    # Mantener solo los últimos 10 backups
    echo "🧹 Limpiando backups antiguos..."
    cd "$BACKUP_DIR"
    ls -t traefik-ssl-backup-*.tar.gz | tail -n +11 | xargs -r rm
    cd - > /dev/null
    
    echo "📋 Backups disponibles:"
    ls -la "$BACKUP_DIR"/traefik-ssl-backup-*.tar.gz 2>/dev/null || echo "   No hay backups anteriores"
    
else
    echo "❌ Error al crear el backup"
    exit 1
fi

echo "🎉 Backup completado exitosamente!"
echo ""
echo "💡 Para restaurar un backup:"
echo "   ./restore-ssl.sh $BACKUP_DIR/$BACKUP_FILE"
