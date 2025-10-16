# Configuración de Traefik para Riffy

Esta guía explica cómo usar Traefik como reverse proxy para tu aplicación Riffy con dominio de Namecheap y SSL automático.

## 🚀 Configuración Rápida

### 1. Ejecutar el script de configuración

```bash
./setup-traefik.sh
```

Este script te pedirá:
- Tu dominio principal (ej: mipagina.com)
- Tu email para Let's Encrypt

### 2. Configurar DNS en Namecheap

Configura los siguientes registros DNS en tu panel de Namecheap:

```
A Record: tu-dominio.com -> IP_DEL_SERVIDOR
A Record: admin.tu-dominio.com -> IP_DEL_SERVIDOR  
A Record: api.tu-dominio.com -> IP_DEL_SERVIDOR
A Record: traefik.tu-dominio.com -> IP_DEL_SERVIDOR
```

### 3. Iniciar la aplicación

```bash
docker-compose up -d
```

## 📁 Estructura de Archivos

```
riffy/
├── traefik.yml          # Configuración principal de Traefik
├── dynamic.yml          # Configuración dinámica y routing
├── docker-compose.yml   # Servicios Docker con Traefik
├── setup-traefik.sh     # Script de configuración automática
├── traefik.env.example  # Variables de entorno de ejemplo
└── ssl/                 # Directorio para certificados SSL
```

## 🌐 URLs de Acceso

Una vez configurado, podrás acceder a:

- **Aplicación Web**: https://tu-dominio.com
- **Panel Admin**: https://admin.tu-dominio.com
- **API GraphQL**: https://api.tu-dominio.com/graphql
- **API REST**: https://api.tu-dominio.com/api
- **Dashboard Traefik**: https://traefik.tu-dominio.com

## 🔒 SSL Automático

Traefik automáticamente:
- ✅ Obtiene certificados SSL de Let's Encrypt
- ✅ Renueva certificados automáticamente
- ✅ Redirige HTTP a HTTPS
- ✅ Aplica headers de seguridad

## 🛠️ Configuración Manual

Si prefieres configurar manualmente:

### 1. Editar archivos de configuración

**traefik.yml** - Configuración principal:
```yaml
certificatesResolvers:
  letsencrypt:
    acme:
      email: tu-email@ejemplo.com  # Cambia por tu email
```

**dynamic.yml** - Reemplazar dominios:
```yaml
# Cambiar todas las instancias de "tu-dominio.com"
```

**docker-compose.yml** - Reemplazar dominios:
```yaml
# Cambiar todas las instancias de "tu-dominio.com"
```

### 2. Crear archivo .env

```bash
cp traefik.env.example .env
# Editar .env con tus valores
```

## 🔧 Comandos Útiles

### Ver logs de Traefik
```bash
docker-compose logs -f traefik
```

### Ver estado de servicios
```bash
docker-compose ps
```

### Reiniciar solo Traefik
```bash
docker-compose restart traefik
```

### Ver configuración de Traefik
```bash
curl http://localhost:8080/api/rawdata
```

### Verificar certificados SSL
```bash
docker-compose exec traefik cat /etc/traefik/acme.json
```

## 🐛 Troubleshooting

### Problemas comunes:

#### 1. Certificados SSL no se generan
- ✅ Verifica que el dominio apunte a tu servidor
- ✅ Verifica que el puerto 80 esté abierto
- ✅ Revisa logs: `docker-compose logs traefik`

#### 2. Error "Host not found"
- ✅ Verifica configuración DNS
- ✅ Espera propagación DNS (hasta 24 horas)
- ✅ Verifica que el servicio esté corriendo

#### 3. Redirección HTTP no funciona
- ✅ Verifica que el entrypoint web esté configurado
- ✅ Verifica redirección en traefik.yml

#### 4. CORS errors en API
- ✅ Verifica configuración CORS en dynamic.yml
- ✅ Verifica que los dominios estén en la lista de orígenes permitidos

### Logs útiles:

```bash
# Logs de todos los servicios
docker-compose logs

# Logs específicos de Traefik
docker-compose logs traefik

# Logs de API
docker-compose logs api

# Logs en tiempo real
docker-compose logs -f --tail=100
```

## 🔄 Migración desde Nginx

Si ya tenías Nginx configurado:

1. ✅ Backup de configuración anterior
2. ✅ Parar servicios: `docker-compose down`
3. ✅ Ejecutar script de configuración
4. ✅ Iniciar con Traefik: `docker-compose up -d`

## 📊 Monitoreo

### Dashboard de Traefik
Accede a https://traefik.tu-dominio.com para ver:
- Estado de servicios
- Configuración de rutas
- Certificados SSL
- Métricas de tráfico

### Health Checks
```bash
# Verificar estado de API
curl -f https://api.tu-dominio.com/health

# Verificar estado de Web
curl -f https://tu-dominio.com

# Verificar estado de Admin
curl -f https://admin.tu-dominio.com
```

## 🔐 Seguridad

La configuración incluye:
- ✅ Headers de seguridad automáticos
- ✅ Rate limiting configurado
- ✅ CORS configurado correctamente
- ✅ Compresión habilitada
- ✅ HTTPS obligatorio

## 🚀 Producción

Para producción, considera:
- ✅ Usar secrets para variables sensibles
- ✅ Configurar backups de certificados
- ✅ Monitoreo con herramientas externas
- ✅ Configurar alertas de renovación SSL

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs de Traefik
2. Verifica configuración DNS
3. Confirma que los puertos 80 y 443 estén abiertos
4. Verifica que el dominio apunte correctamente

¡Tu aplicación Riffy ahora está lista para producción con Traefik! 🎉
