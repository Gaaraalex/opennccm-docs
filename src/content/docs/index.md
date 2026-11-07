---
title: "¿Qué es OpenNCCM?"
description: "Respaldos, cambios y cumplimiento de su red, en su propio servidor."
curso: ["0.1"]
---

OpenNCCM respalda, versiona, compara y audita la configuración de switches, routers y firewalls de unos 70 fabricantes (133 plataformas). Detecta los cambios en tiempo real, controla quién cambia qué y vuelve atrás cuando algo sale mal.

Es software libre (licencia GPL-3.0) y gratuito: se instala en un servidor suyo y las configuraciones no salen de su red.

## Qué puede hacer

- **Respaldar y comparar:** una versión nueva en cada cambio, con la comparación lado a lado entre versiones o entre equipos.
- **Cambiar con control:** configlets con plantillas, solicitudes con aprobación y reversión segura por plataforma.
- **Cumplir normas:** PCI DSS, HIPAA, SOX y hardening por fabricante, con corrección en un clic.
- **Proteger el parque:** vulnerabilidades (CVE) del firmware, actualizaciones y fin de vida de cada equipo.
- **Consola y asistente:** consola SSH en el navegador y un asistente de IA opcional que nunca ejecuta nada.

## Por dónde empezar

1. Revise los [requisitos](/instalacion/requisitos/) e [instale OpenNCCM](/instalacion/instalar/) con un solo comando.
2. Cargue una [credencial](/primeros-pasos/credenciales/) y [agregue su primer equipo](/primeros-pasos/primer-equipo/).
3. Configure el [envío de syslog](/primeros-pasos/syslog/) para detectar los cambios al momento.

Si prefiere verlo antes, el [curso en video](/ayuda/curso/) recorre todo en 30 lecciones cortas.

## Cómo funciona

OpenNCCM es una aplicación web que se instala en un único servidor Ubuntu. Se conecta a sus switches, routers y firewalls por SSH (o Telnet) para respaldar su configuración, compararla, auditarla y aplicar cambios. Los equipos le avisan de los cambios en tiempo real enviando mensajes syslog.

| Componente | Función |
| --- | --- |
| nginx | Recibe las conexiones HTTPS (puerto 443) y las pasa a la aplicación. Redirige HTTP (80) a HTTPS. |
| Servicio `opennccm` | Aplicación web (FastAPI + Uvicorn) escuchando solo en el propio servidor (127.0.0.1:8000). Incluye el planificador de tareas y el receptor syslog. |
| Netmiko | Biblioteca que habla con cada fabricante por SSH/Telnet y SCP. |
| Base de datos | SQLite en `/var/lib/opennccm` por defecto. Configuraciones y contraseñas cifradas. |
| Clave de cifrado | `/etc/opennccm/secret.key`. Sin ella los datos no se pueden leer. |
