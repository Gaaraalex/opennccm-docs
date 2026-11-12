---
title: Preguntas frecuentes
description: Respuestas rápidas sobre OpenNCCM.
---

## ¿Es gratis?

Sí. OpenNCCM es software libre con licencia GPL-3.0: se puede usar, estudiar, modificar y compartir sin pagar. El [soporte profesional](/ayuda/planes/) es un servicio aparte y opcional que no limita ninguna función.

## ¿Dónde quedan mis configuraciones?

En su propio servidor. OpenNCCM se instala en un Ubuntu suyo y guarda las configuraciones cifradas con AES-256 en su base de datos. Solo sale a internet lo que usted active: consultas de CVE a NVD, avisos por correo, Teams, Slack o Telegram, el proveedor del [asistente IA](/consola/asistente/) o la [copia en Git](/administracion/sistema/).

## ¿Qué sistema necesito?

Ubuntu Server 22.04 o 24.04 LTS de 64 bits, recién instalado. Con 2 vCPU y 4 GB de RAM alcanza para unos 300 equipos. Los detalles están en [Requisitos](/instalacion/requisitos/).

## ¿Qué equipos puede gestionar?

133 plataformas de unos 70 fabricantes, por SSH o Telnet. Cualquier otro equipo con SSH se gestiona con el perfil genérico. Lista completa en [Plataformas soportadas](/referencia/plataformas/).

## ¿Hace falta instalar algo en los equipos?

No. OpenNCCM entra por SSH con un usuario del equipo. Solo conviene configurar el envío de [syslog](/primeros-pasos/syslog/) para detectar los cambios al momento.

## ¿Qué pasa si pierdo la clave de cifrado?

Sin `/etc/opennccm/secret.key` no se pueden leer los respaldos ni las credenciales guardadas. Guárdela aparte junto con las [copias de recuperación](/instalacion/migrar/).

## ¿Cómo actualizo?

Desde **Sistema → Actualizar** o con el aviso de versión nueva. Antes se guarda una copia y, si la versión nueva no responde, vuelve sola a la anterior. Ver [Actualizar y volver atrás](/instalacion/actualizar/).

## ¿Cómo está hecho por dentro? ¿Puedo continuar el proyecto?

La [Guía del desarrollador](https://github.com/Gaaraalex/opennccm/tree/main/docs/desarrollo) (también en [PDF](https://github.com/Gaaraalex/opennccm/raw/main/docs/OpenNCCM-Guia-del-desarrollador.pdf)) explica la arquitectura, el mapa del código, los datos y las migraciones, cómo agregar una plataforma, la interfaz, la API, las pruebas, el laboratorio, la publicación y el rendimiento.

## ¿Dónde pido ayuda?

En [Comunidad y soporte](/ayuda/soporte/).
