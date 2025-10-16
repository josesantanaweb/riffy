#!/bin/bash

# Script de monitoreo de salud para Riffy con Traefik
# Verifica el estado de todos los servicios y certificados SSL

LOG_FILE="/var/log/riffy-health.log"
DATE=$(date '+%Y-%m-%d %H:%M:%S')

echo "🏥 Verificación de salud de Riffy - $DATE" | tee -a "$LOG_FILE"
echo "==========================================" | tee -a "$LOG_FILE"

# Función para verificar servicio
check_service() {
    local service_name="$1"
    local url="$2"
    local expected_status="${3:-200}"
    
    echo -n "🔍 Verificando $service_name... "
    
    if curl -s -o /dev/null -w "%{http_code}" "$url" | grep -q "$expected_status"; then
        echo "✅ OK" | tee -a "$LOG_FILE"
        return 0
    else
        echo "❌ FALLO" | tee -a "$LOG_FILE"
        return 1
    fi
}

# Función para verificar contenedor Docker
check_container() {
    local container_name="$1"
    
    echo -n "🐳 Verificando contenedor $container_name... "
    
    if docker ps --filter "name=$container_name" --filter "status=running" | grep -q "$container_name"; then
        echo "✅ OK" | tee -a "$LOG_FILE"
        return 0
    else
        echo "❌ FALLO" | tee -a "$LOG_FILE"
        return 1
    fi
}

# Función para verificar certificado SSL
check_ssl_cert() {
    local domain="$1"
    
    echo -n "🔒 Verificando certificado SSL para $domain... "
    
    # Obtener información del certificado
    cert_info=$(echo | openssl s_client -servername "$domain" -connect "$domain:443" 2>/dev/null | openssl x509 -noout -dates 2>/dev/null)
    
    if [[ -n "$cert_info" ]]; then
        # Extraer fecha de expiración
        expiry_date=$(echo "$cert_info" | grep "notAfter" | cut -d= -f2)
        expiry_timestamp=$(date -d "$expiry_date" +%s 2>/dev/null)
        current_timestamp=$(date +%s)
        days_until_expiry=$(( (expiry_timestamp - current_timestamp) / 86400 ))
        
        if [[ $days_until_expiry -gt 30 ]]; then
            echo "✅ OK (expira en $days_until_expiry días)" | tee -a "$LOG_FILE"
            return 0
        elif [[ $days_until_expiry -gt 7 ]]; then
            echo "⚠️  ADVERTENCIA (expira en $days_until_expiry días)" | tee -a "$LOG_FILE"
            return 1
        else
            echo "❌ CRÍTICO (expira en $days_until_expiry días)" | tee -a "$LOG_FILE"
            return 2
        fi
    else
        echo "❌ FALLO (no se pudo verificar)" | tee -a "$LOG_FILE"
        return 2
    fi
}

# Contadores de fallos
total_checks=0
failed_checks=0
critical_checks=0

# Verificar contenedores Docker
echo "📋 Verificando contenedores Docker..." | tee -a "$LOG_FILE"
containers=("riffy-traefik" "riffy-postgres" "riffy-redis" "riffy-api" "riffy-web" "riffy-admin")

for container in "${containers[@]}"; do
    total_checks=$((total_checks + 1))
    if ! check_container "$container"; then
        failed_checks=$((failed_checks + 1))
    fi
done

# Verificar servicios HTTP/HTTPS
echo "" | tee -a "$LOG_FILE"
echo "🌐 Verificando servicios HTTP/HTTPS..." | tee -a "$LOG_FILE"

# Obtener dominio del archivo .env si existe
if [[ -f .env ]]; then
    DOMAIN=$(grep "^DOMAIN=" .env | cut -d= -f2 | tr -d '"' | tr -d "'")
else
    DOMAIN="localhost"
fi

if [[ "$DOMAIN" != "localhost" && "$DOMAIN" != "tu-dominio.com" ]]; then
    # Verificar servicios en producción
    services=(
        "Web:https://$DOMAIN"
        "Admin:https://admin.$DOMAIN"
        "API:https://api.$DOMAIN"
        "Traefik Dashboard:https://traefik.$DOMAIN"
    )
    
    for service in "${services[@]}"; do
        IFS=':' read -r name url <<< "$service"
        total_checks=$((total_checks + 1))
        if ! check_service "$name" "$url"; then
            failed_checks=$((failed_checks + 1))
        fi
    done
    
    # Verificar certificados SSL
    echo "" | tee -a "$LOG_FILE"
    echo "🔒 Verificando certificados SSL..." | tee -a "$LOG_FILE"
    
    domains=("$DOMAIN" "admin.$DOMAIN" "api.$DOMAIN" "traefik.$DOMAIN")
    
    for domain in "${domains[@]}"; do
        total_checks=$((total_checks + 1))
        result=$(check_ssl_cert "$domain")
        exit_code=$?
        if [[ $exit_code -eq 1 ]]; then
            failed_checks=$((failed_checks + 1))
        elif [[ $exit_code -eq 2 ]]; then
            failed_checks=$((failed_checks + 1))
            critical_checks=$((critical_checks + 1))
        fi
    done
else
    echo "⚠️  Configuración de desarrollo detectada, saltando verificaciones de dominio" | tee -a "$LOG_FILE"
fi

# Verificar recursos del sistema
echo "" | tee -a "$LOG_FILE"
echo "💻 Verificando recursos del sistema..." | tee -a "$LOG_FILE"

# Verificar espacio en disco
disk_usage=$(df / | awk 'NR==2 {print $5}' | sed 's/%//')
if [[ $disk_usage -gt 90 ]]; then
    echo "❌ CRÍTICO: Espacio en disco bajo ($disk_usage%)" | tee -a "$LOG_FILE"
    critical_checks=$((critical_checks + 1))
elif [[ $disk_usage -gt 80 ]]; then
    echo "⚠️  ADVERTENCIA: Espacio en disco alto ($disk_usage%)" | tee -a "$LOG_FILE"
else
    echo "✅ Espacio en disco OK ($disk_usage%)" | tee -a "$LOG_FILE"
fi

# Verificar memoria
memory_usage=$(free | awk 'NR==2{printf "%.0f", $3*100/$2}')
if [[ $memory_usage -gt 90 ]]; then
    echo "❌ CRÍTICO: Uso de memoria alto ($memory_usage%)" | tee -a "$LOG_FILE"
    critical_checks=$((critical_checks + 1))
elif [[ $memory_usage -gt 80 ]]; then
    echo "⚠️  ADVERTENCIA: Uso de memoria alto ($memory_usage%)" | tee -a "$LOG_FILE"
else
    echo "✅ Uso de memoria OK ($memory_usage%)" | tee -a "$LOG_FILE"
fi

# Resumen final
echo "" | tee -a "$LOG_FILE"
echo "📊 RESUMEN DE VERIFICACIÓN" | tee -a "$LOG_FILE"
echo "=========================" | tee -a "$LOG_FILE"
echo "Total de verificaciones: $total_checks" | tee -a "$LOG_FILE"
echo "Verificaciones fallidas: $failed_checks" | tee -a "$LOG_FILE"
echo "Verificaciones críticas: $critical_checks" | tee -a "$LOG_FILE"

if [[ $critical_checks -gt 0 ]]; then
    echo "🚨 ESTADO: CRÍTICO - Acción inmediata requerida" | tee -a "$LOG_FILE"
    exit 2
elif [[ $failed_checks -gt 0 ]]; then
    echo "⚠️  ESTADO: ADVERTENCIA - Revisar servicios" | tee -a "$LOG_FILE"
    exit 1
else
    echo "✅ ESTADO: SALUDABLE - Todos los servicios funcionando correctamente" | tee -a "$LOG_FILE"
    exit 0
fi
