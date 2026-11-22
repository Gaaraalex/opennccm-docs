---
title: "Sistema y copias de recuperación"
curso: ["9.2"]
---

## Actualizaciones

La tarjeta **Actualizaciones** muestra la versión instalada y la última publicada. **Buscar ahora** consulta GitHub; OpenNCCM también lo hace una vez al día (desactivable en Ajustes) y, si hay una versión nueva, muestra a los administradores un aviso con sus novedades (**Ver y actualizar** o **Más tarde**, que no lo repite en esa sesión).

**Novedades de cada versión** abre una ventana con lo que agregó o corrigió cada versión (la instalada aparece marcada) y, si hay una nueva, sus novedades antes de actualizar. **Todas las versiones en GitHub** abre la página de publicaciones del proyecto.

**Actualizar ahora** (pide confirmación) hace lo mismo que `sudo opennccm update` en la consola: copia previa del código y la base, instalación, verificación y vuelta automática a la versión anterior si la nueva no arranca. Una página muestra el progreso; OpenNCCM se detiene 1-2 minutos. Por seguridad la aplicación no tiene permisos de administrador del sistema: solo deja una solicitud que atiende un servicio de systemd (`opennccm-webupdate`) instalado a partir de la 1.6.0.

## Copias de recuperación con la clave

Si marca «Incluir la clave de cifrado», el archivo completo se cifra (AES-256-GCM) con una contraseña de al menos 12 caracteres que usted elige, y termina en `.enc`. Sin esa contraseña no se puede restaurar: guárdela aparte. Al restaurar con `sudo opennccm restore ARCHIVO.enc` se la pide.

La pestaña **Sistema** muestra además el rendimiento del servidor, el **espacio**, la **fecha y hora del servidor**, la base de datos y la clave en uso, y las **copias de recuperación**: **Crear copia ahora** (con o sin la clave de cifrado), descargar, eliminar y **Restaurar…** (explica el comando de consola que la restaura). Se ven 4 a la vez; las demás, con la barra del borde (subir y bajar).

## Estadística de uso

Una vez al día, a una hora al azar, OpenNCCM avisa a comunidad.opennccm.com que está en uso. Envía solo esto:

```json
{ "instalacion": "u_…", "version": "2.45.4" }
```

-   `instalacion` es un número al azar propio de la estadística, distinto del id de la licencia. Se genera una vez y se guarda en la base.
-   Nunca se envían configuraciones, equipos, direcciones de tu red, usuarios ni nombres. La web no guarda la IP desde la que llega el aviso.
-   Viene activada y no se puede desactivar. Esa información nos ayuda a seguir mejorando el sistema.
-   Si el servidor no tiene salida a internet, no pasa nada: no se muestra ningún error, no afecta el funcionamiento y se vuelve a intentar al día siguiente.

La tarjeta **Estadística de uso** de la pestaña **Sistema** muestra el **Último aviso** y **Ver exactamente qué se envía**, con el texto real.

![La tarjeta Estadística de uso.](../../../assets/manual/sistema-uso.png)

## Licencia y módulos Pro

**Administración › Licencia y módulos** activa los módulos opcionales de pago. Ver [Licencia y módulos](/pro/licencia/).

## Fecha, hora y zona horaria

-   **Zona horaria:** elíjala de la lista (agrupada por región) y pulse **Cambiar zona**. OpenNCCM se reinicia unos segundos para que el historial y las tareas programadas usen la nueva hora.
-   **Sincronizar con NTP:** interruptor que mantiene la hora exacta automáticamente (recomendado).
-   **Fijar fecha y hora a mano:** al desactivar NTP aparecen los campos de fecha y hora y el botón **Fijar**.

El servicio no tiene privilegios de administrador: el instalador le concede, mediante una regla de polkit, permiso **solo** para estas tres acciones. Cada cambio queda en Auditoría.

![Sistema.](../../../assets/manual/28-sistema.png)

## Copia en Git

Con **Subir cada versión nueva a Git**, cada respaldo con cambios se sube como un commit a un repositorio Git (GitHub, GitLab, Gitea…), con un mensaje como «R1: +3/-1 líneas \[scheduled\]». Cada equipo es un archivo `<grupo>/<equipo>.cfg` con su última configuración. El repositorio se indica por HTTPS con usuario y **token** (se guarda cifrado y nunca se escribe en la URL ni en el disco) o por SSH con la clave del usuario del servicio. **Ocultar contraseñas y claves** (activado por omisión) sustituye por `<oculto>` los secretos, contraseñas, comunidades SNMP y claves que reconoce; aun así, use un repositorio privado. **Probar y subir todo ahora** exporta todos los equipos de una vez. Si la subida falla, se registra una alarma «Copia en Git fallida» y el respaldo no se ve afectado.

## Capacidad

La pestaña **Capacidad** (Administración) dice cuánto aguanta este servidor con la red de hoy y qué conviene ampliar:

-   **Qué conviene hacer:** recomendaciones concretas, de la más urgente a la menos. Por ejemplo, que el respaldo programado no termina antes del siguiente, que «Respaldar todos» tarda mucho (con un botón para usar más respaldos a la vez), que el disco se llenará en N días al ritmo actual, que conviene PostgreSQL por el número de equipos o que falta memoria o CPU. Si todo va bien, lo dice.
-   **Indicadores:** equipos y versiones guardadas, cuánto tarda «Respaldar todos», para cuántos días alcanza el disco y la base de datos con su tamaño.
-   **Respaldos de muchos equipos:** los últimos «Respaldar todos» y respaldos programados, con su duración, el tiempo por equipo y los fallos. Las estimaciones usan lo medido en esta red. Aquí se elige cuántos respaldos hace a la vez «Respaldar todos» (de 1 a 16; 4 de fábrica).
-   **Este servidor:** núcleos, RAM, disco, lo que ocupa OpenNCCM y cuántas versiones nuevas hubo en 30 días.
-   **Medido en la prueba de carga:** cada versión de OpenNCCM se prueba en GitHub con equipos simulados por SSH, de 100 a 5.000, con «Respaldar todos» de verdad, cada página y varios usuarios a la vez. La tabla muestra lo medido; la fila resaltada es la más parecida a esta instalación.

![Capacidad: recomendaciones, indicadores y lo medido en la prueba de carga.](../../../assets/manual/28b-capacidad.png)

## Apoya OpenNCCM

OpenNCCM es software libre y gratis. Todos los usuarios ven en la barra superior los botones **Soporte profesional** y **Apoya OpenNCCM** (no se pueden ocultar), y las páginas Sistema y Acerca de muestran una tarjeta con las formas de donar (GitHub Sponsors y Ko-fi). Tras actualizar a una versión nueva, el primer administrador que entra ve una vez un aviso con **Donar** y **Ahora no**. Los enlaces solo se abren si se pulsan, en una pestaña nueva, y no se envía ningún dato del servidor.

El procedimiento completo de copia, restauración en otro servidor, actualización y vuelta atrás está en [Copias y migrar](/instalacion/migrar/) y [Actualizar y volver atrás](/instalacion/actualizar/).
