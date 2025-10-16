# 🚀 Riffy con Traefik - Configuración Completa

¡Tu aplicación Riffy ahora está configurada con Traefik como reverse proxy principal! Esta configuración incluye SSL automático con Let's Encrypt, routing inteligente y herramientas de monitoreo.

## 📁 Archivos Creados/Modificados

### Archivos de Configuración Principal
- ✅ `traefik.yml` - Configuración principal de Traefik
- ✅ `dynamic.yml` - Configuración dinámica y routing
- ✅ `docker-compose.yml` - Actualizado con Traefik
- ✅ `docker-compose.prod.yml` - Configuración adicional para producción

### Scripts de Automatización
- ✅ `setup-traefik.sh` - Script de configuración automática
- ✅ `backup-ssl.sh` - Backup automático de certificados SSL
- ✅ `restore-ssl.sh` - Restauración de certificados SSL
- ✅ `health-check.sh` - Monitoreo de salud de servicios

### Archivos de Configuración
- ✅ `traefik.env.example` - Variables de entorno de ejemplo
- ✅ `crontab-example` - Configuración de cron para backups automáticos

### Documentación
- ✅ `TRAEFIK.md` - Documentación completa de Traefik
- ✅ `README-TRAEFIK.md` - Este archivo de resumen

## 🚀 Pasos para Iniciar

### 1. Configuración Inicial
```bash
# Ejecutar script de configuración automática
./setup-traefik.sh
```

### 2. Configurar DNS en Namecheap
Configura estos registros DNS:
```
A Record: tu-dominio.com -> IP_DEL_SERVIDOR
A Record: admin.tu-dominio.com -> IP_DEL_SERVIDOR
A Record: api.tu-dominio.com -> IP_DEL_SERVIDOR
A Record: traefik.tu-dominio.com -> IP_DEL_SERVIDOR
```

### 3. Iniciar Servicios
```bash
# Desarrollo
docker-compose up -d

# Producción (con configuraciones adicionales)
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

## 🌐 URLs de Acceso

Una vez configurado, accede a:

| Servicio | URL | Descripción |
|----------|-----|-------------|
| **Web Principal** | `https://tu-dominio.com` | Aplicación principal de Riffy |
| **Panel Admin** | `https://admin.tu-dominio.com` | Panel de administración |
| **API GraphQL** | `https://api.tu-dominio.com/graphql` | API GraphQL |
| **API REST** | `https://api.tu-dominio.com/api` | API REST |
| **Dashboard Traefik** | `https://traefik.tu-dominio.com` | Panel de control de Traefik |

## 🔒 Características de Seguridad

- ✅ **SSL Automático**: Certificados Let's Encrypt con renovación automática
- ✅ **Redirección HTTPS**: HTTP se redirige automáticamente a HTTPS
- ✅ **Headers de Seguridad**: HSTS, X-Frame-Options, CSP, etc.
- ✅ **Rate Limiting**: Protección contra ataques DDoS
- ✅ **CORS Configurado**: Acceso controlado desde dominios específicos

## 🛠️ Comandos Útiles

### Gestión de Servicios
```bash
# Ver estado de servicios
docker-compose ps

# Ver logs en tiempo real
docker-compose logs -f

# Reiniciar un servicio específico
docker-compose restart traefik

# Parar todos los servicios
docker-compose down
```

### Monitoreo y Salud
```bash
# Verificación completa de salud
./health-check.sh

# Ver logs de salud
tail -f /var/log/riffy-health.log
```

### Backup y Restauración
```bash
# Backup manual de certificados
./backup-ssl.sh

# Restaurar certificados
./restore-ssl.sh /path/to/backup-file.tar.gz

# Configurar backups automáticos
crontab crontab-example
```

## 📊 Monitoreo

### Dashboard de Traefik
Accede a `https://traefik.tu-dominio.com` para ver:
- Estado de todos los servicios
- Configuración de rutas activas
- Certificados SSL y su estado
- Métricas de tráfico en tiempo real

### Logs del Sistema
```bash
# Logs de Traefik
docker-compose logs traefik

# Logs de salud del sistema
tail -f /var/log/riffy-health.log

# Logs de backup
tail -f /var/log/riffy-backup.log
```

## 🔧 Configuración Avanzada

### Variables de Entorno
Edita el archivo `.env` para configurar:
- Dominios personalizados
- Configuración de base de datos
- Claves de API (AWS, JWT, etc.)
- URLs de aplicaciones

### Configuración de Producción
Para producción, usa la configuración adicional:
```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

Esto incluye:
- Límites de recursos para contenedores
- Configuración optimizada de PostgreSQL
- Logging estructurado
- Headers de seguridad adicionales

## 🐛 Troubleshooting

### Problemas Comunes

#### Certificados SSL no se generan
```bash
# Verificar logs de Traefik
docker-compose logs traefik | grep -i acme

# Verificar conectividad DNS
nslookup tu-dominio.com

# Verificar puertos abiertos
netstat -tlnp | grep :80
netstat -tlnp | grep :443
```

#### Servicios no responden
```bash
# Verificar estado de contenedores
docker-compose ps

# Verificar conectividad interna
docker-compose exec traefik ping api

# Verificar configuración de red
docker network ls
docker network inspect riffy-network
```

#### Problemas de CORS
```bash
# Verificar configuración CORS en dynamic.yml
cat dynamic.yml | grep -A 10 cors

# Verificar headers en respuesta
curl -I https://api.tu-dominio.com/graphql
```

## 📞 Soporte

Si encuentras problemas:

1. **Ejecuta el health check**: `./health-check.sh`
2. **Revisa los logs**: `docker-compose logs -f`
3. **Verifica configuración DNS**: Asegúrate de que los dominios apunten correctamente
4. **Consulta la documentación**: `TRAEFIK.md` tiene información detallada

## 🎉 ¡Listo!

Tu aplicación Riffy ahora está configurada con:
- ✅ Traefik como reverse proxy
- ✅ SSL automático con Let's Encrypt
- ✅ Routing inteligente por dominio
- ✅ Herramientas de monitoreo y backup
- ✅ Configuración de producción optimizada

¡Disfruta de tu aplicación con SSL automático y alta disponibilidad! 🚀
