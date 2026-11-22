---
title: "Recolectores por sede"
description: "Módulo Pro: respaldar los equipos de sedes remotas sin abrir la red, con un recolector en Linux o Windows."
---

Un **recolector** en cada sede respalda los equipos de su red y manda las copias a este servidor (el **central**), aunque desde el central no se llegue a esos equipos. Es un módulo de [OpenNCCM Pro](/pro/licencia/): la licencia dice cuántas sedes puedes tener.

## Cómo funciona

-   El recolector **es OpenNCCM** instalado en modo recolector: usa los mismos perfiles y conexiones que el central, pero no tiene interfaz web. Se actualiza solo cuando se actualiza el central.
-   La conexión la abre siempre la sede, por **HTTPS hacia el central**. En la sede no se abre ningún puerto. La sede solo necesita llegar a la dirección del central.
-   Las credenciales viven en el central. Al recolector le llegan cifradas solo para él, y en la sede se guardan cifradas como en cualquier OpenNCCM.
-   El central decide cuándo respaldar: las mismas [tareas programadas](/cambios/tareas/), **Respaldar ahora**, el aviso de syslog y el respaldo después de un cambio. Lo que llega se guarda igual que un respaldo hecho desde el central: versiones, inventario, vecinos, puertos, cumplimiento y avisos.
-   Si se corta el enlace, el recolector guarda los resultados en una **cola** (hasta 30 días o 2 GB) y los manda cuando vuelve.

## Agregar una sede

1.  Entra a **Administración › Recolectores por sede** y pulsa **Agregar sede**.
2.  Escribe el **Nombre de la sede** y elige **Qué equipos respalda**:
    -   **Por ubicación:** los equipos con esa ubicación, también los que se agreguen después.
    -   **Elegir equipos a mano.** Un equipo elegido a mano gana sobre su ubicación.
3.  Pulsa **Crear sede**. La ventana muestra la **Clave de alta** y el comando de instalación. Guárdala: no se vuelve a mostrar, vale 7 días y una sola vez. Si se pierde, usa **Nueva clave de alta**.
4.  Revisa la **Dirección de este servidor desde la sede**: la sede tiene que poder llegar a ella por HTTPS. El recolector guarda la huella del certificado de esa dirección y solo vuelve a conectarse a ella.
5.  Copia el comando en la máquina de la sede (abajo). La ventana dice «Esperando la primera conexión…» y cambia sola a **Conectado**.

### En Linux

Ubuntu 22.04 o 24.04, con sudo. El comando lleva la clave, no hay que escribirla:

```bash
curl -fsSL https://raw.githubusercontent.com/Gaaraalex/opennccm/main/install.sh | sudo bash -s -- --recolector https://CENTRAL --clave ra_…
```

Instala OpenNCCM en modo recolector: sin interfaz web, sin nginx y sin preguntas, solo el servicio. Volver a correrlo con una clave nueva en una máquina que ya es recolector reinstala conservando los datos.

### En Windows

En PowerShell como administrador, con el comando que da la ventana: baja el instalador (`opennccm-recolector-<versión>.exe`) desde el central, comprueba su SHA-256 y lo ejecuta. También está **Descargar el instalador (.exe)**.

-   Se instala en `C:\Program Files\OpenNCCM Recolector` y los datos en `C:\ProgramData\OpenNCCM Recolector` (solo para SYSTEM y Administradores).
-   Crea la tarea programada «OpenNCCM Recolector», que arranca con Windows y se reinicia si falla.
-   El instalador no tiene firma de un certificado comercial: si Windows avisa que el editor es desconocido, comprueba que el SHA-256 coincide con el que muestra el central y elige **Más información › Ejecutar de todas formas**.
-   Comandos: `opennccm-recolector.exe estado` y `opennccm-recolector.exe desinstalar` (`/todo` borra también los datos).

## Qué equipos respalda cada recolector

1.  Si el equipo está **asignado a mano** a un recolector, ese.
2.  Si no, el recolector cuya sede coincide con la **Ubicación** del equipo (sin distinguir mayúsculas).
3.  Si no, el central, como siempre.

En **Dispositivos**, marca equipos y usa **Asignar a una sede…** para asignarlos a mano o volver a «Según su ubicación». La ficha de cada equipo dice **Se respalda desde** y permite **Cambiar**.

:::caution[Lo que no se hace en los equipos de una sede]
Desde el central no se llega a esos equipos: no reciben consola, envío de comandos o configlets, firmware ni reversión automática. Se respaldan desde la sede. Las pantallas lo dicen.
:::

## La pantalla de cada sede

La lista muestra cada sede con su estado (**En línea**, **Sin reportar hace N min**, **Nunca conectó**, **En pausa**, **Revocado**), sus equipos, el último respaldo y la cola. Al entrar a una sede:

-   **Último latido**, **Último respaldo bueno**, la cola («N pendientes · X % del límite»), la máquina y la versión del recolector.
-   **Conexiones:** desde dónde se conectó (y si cambió de dirección).
-   **Equipos:** cada uno con cómo llegó (a mano o por ubicación), su último respaldo y su estado.
-   **Acciones:** **Pausar** / **Reanudar**, **Revocar** (el recolector ya no puede conectarse), **Nueva clave de alta** y **Quitar sede** (sus equipos vuelven a respaldarse desde el central). Ninguna borra respaldos.

Un recolector en pausa o revocado no recibe tareas, y sus equipos **no** se respaldan desde el central (no se llega a ellos).

## Avisos

**Avisar si una sede no reporta en** N minutos (15 de fábrica, de 5 a 60). Los avisos llegan a la campana y por correo, con las [reglas de avisos](/observar/alarmas/) de siempre:

-   «Sucursal Norte no reporta desde hace 15 min» (una sola vez hasta que vuelva) y «volvió a reportar».
-   La cola de una sede casi llena (80 %).
-   El recolector de una sede tiene una versión distinta del central.

El Panel muestra cuántas sedes están en línea y cuántas sin reportar.

## En la sede

`sudo opennccm recolector estado` muestra la sede, el central y la cola. `opennccm status` dice que es un recolector. `sudo opennccm recolector alta URL CLAVE` hace el alta con otra clave. `sudo opennccm update` actualiza el recolector.

## Licencia

La licencia dice cuántas sedes puedes tener. Al llegar al límite, **Agregar sede** se desactiva («Tu licencia permite 5 sedes · Ampliar»). Vencida la licencia, pasada la gracia, los recolectores se pausan hasta renovar. No se borra nada.
