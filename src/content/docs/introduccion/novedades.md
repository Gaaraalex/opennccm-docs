---
title: "Novedades de la versión"
description: "Lo nuevo de OpenNCCM 2.45.5 y las versiones anteriores."
resumen:
  - "2.44.0 muestra los problemas de Zabbix junto a los cambios de configuración de cada equipo: se ve de un vistazo si un problema empezó justo después de un cambio."
  - "Administración › Capacidad dice cuánto aguanta el servidor con la red de hoy y qué conviene ampliar, y permite hacer de 1 a 16 respaldos a la vez en «Respaldar todos»."
  - "Redes grandes más rápidas: medido en la prueba de carga con 5.000 equipos simulados, «Respaldar todos» tardó 27 minutos y el Panel abrió en 0,35 s."
---

Las 6 últimas versiones. El historial completo está en [opennccm.com/novedades](https://opennccm.com/novedades.html) y cada versión se descarga desde [GitHub](https://github.com/Gaaraalex/opennccm/releases).

## Versión 2.45.5
- **Intercambio o reemplazo de equipos.** Cada copia guarda la serie del aparato. Si en un respaldo cambia, la ficha
  dice de dónde viene el aparato (o que se intercambió con otra ficha), protege las últimas copias del anterior y **no deja
  revertir a la configuración de otro aparato** (ni al pedirlo, ni al aprobarlo, ni sola; antes de enviar una reversión vuelve
  a leer la serie). No se heredan la línea base, los puertos vistos ni la licencia. En las OLT ZTE C300/C320 distingue un
  cambio de la tarjeta de control.
- **Copias completas «Al cambiar»** (.fxi de WatchGuard, .backup/.rsc de MikroTik), por omisión: después de cada
  respaldo con cambios; sin cambios, solo la primera y una de seguridad cada 30 días. Los que tenían «Semanal» pasan a esto.
- **Copias protegidas por cambio de firmware:** la última copia de la versión anterior no se borra sola; solo un
  administrador decide.
- **Quitar línea base…** en la ficha: se desactiva como se activa, a mano.

## Versión 2.45.4
- **MikroTik: .backup y .rsc guardados en OpenNCCM.** La ficha de cada MikroTik tiene la pestaña **Respaldos**: además
  de la configuración en texto, OpenNCCM trae una vez por semana (o a diario, o a mano) el **.backup** cifrado y el **.rsc** del
  equipo por SFTP, los borra del equipo y los guarda, el .backup junto a su clave (se ve en **Cómo restaurar**, queda en
  Auditoría). Antes de crear nada lee los permisos de la cuenta en el equipo: con una de solo lectura no toca el equipo y lo
  avisa; si solo puede el .rsc, trae ese. Se puede elegir otra credencial solo para esto y **Comprobar permisos** sin crear
  nada. Probado con RouterOS 6.49 y 7.24, restaurando el .backup en el equipo.
- **MikroTik, «Descargar .backup del equipo…»:** en RouterOS 6 podía bajar un .backup incompleto (el equipo
  contesta «saved» antes de terminar); ahora espera a que termine y comprueba los permisos antes de crearlo.
- **Respaldo al volver a responder:** también reintenta cada hora los equipos que aceptan la conexión y la cortan
  enseguida («Connection reset», visto en una OLT ZTE C300 por Telnet), que antes quedaban sin respaldo hasta respaldarlos a mano.

## Versión 2.45.3
- [cambio] **Pro: todo se instala solo.** Desde que la licencia es válida (al activar la clave o una prueba, o al
  renovar), los módulos que incluye se bajan, se instalan y quedan funcionando al momento, sin reiniciar. Las versiones
  nuevas de un módulo también se bajan solas una vez al día; si el módulo está en uso, se aplican al reiniciar o con
  **Reiniciar ahora** en Licencia y módulos.
- **Respaldo al volver a responder:** Si un respaldo falló porque el equipo no respondía, cada hora OpenNCCM mira si
  ya responde y, cuando vuelve, lo respalda solo. Queda el evento «Respaldo al volver a responder». No se aplica a equipos
  desactivados, en mantenimiento, de un recolector ni con errores de credenciales.
- **Estadística de uso:** Los avisos diarios no llegaban a comunidad.opennccm.com (la web rechazaba el formato
  del número de instalación). Ahora llegan; el número de cada servidor se conserva.
- **Licencia:** Si a un servidor le falta el dato que lo identifica ante comunidad.opennccm.com, Licencia y
  módulos lo explica y muestra **Activar aquí**, en lugar de «respondió 400».
- [cambio] **Actualizar:** `opennccm update`, el aviso de `opennccm status` y el instalador ofrecen la última versión
  publicada (como el aviso de la web), nunca una sin publicar.
- **Avisos en tu idioma:** Los avisos de la campana y el historial de Alta disponibilidad se ven en el idioma
  de quien los lee, también los que ya estaban guardados.
- Instalado con `--no-nginx`, las pantallas que se actualizan solas ya no pierden la conexión entre consultas.

## Versión 2.45.2
- **OpenNCCM Pro: módulos opcionales de pago.** OpenNCCM sigue siendo gratis y de código abierto, y todo lo demás que
  ya usabas sigue igual, sin límites de equipos ni de tiempo (salvo el Documento de la red, ver abajo). Pro suma tres módulos para quien los necesite:
  - **Informes profesionales:** el Documento de la red, un informe ejecutivo y uno de auditoría, el inventario para
    gerencia con el costo de renovación, comparar periodos, envíos programados por correo y tu marca en los informes.
  - **Recolectores por sede:** un recolector en cada sede respalda los equipos de su red y manda las copias a este
    servidor, aunque la sede no tenga acceso directo. Se instala con un comando en Linux o en Windows.
  - **Alta disponibilidad:** un segundo servidor en espera copia los datos cada minuto y toma el control solo si el
    principal cae.

  Se activan en Administración › Licencia y módulos con una clave de comunidad.opennccm.com. Necesitan conexión a internet
  para activar y comprobar la licencia, y solo se envían la clave, el id de esta instalación, la huella y el nombre del
  servidor (la huella es un código que no identifica tu red). Planes y precios: comunidad.opennccm.com/pro
- **Prueba gratis:** Desde Licencia y módulos puedes pedir una prueba de cada módulo, una vez por servidor. Se
  aprueba en comunidad.opennccm.com y, cuando está lista, la activas con un clic.
- [cambio] **El Documento de la red pasa a Informes profesionales.** Los documentos que ya generaste se siguen viendo y
  descargando sin licencia, en Informes › «Mis documentos».
- **Estadística de uso:** Una vez al día, OpenNCCM avisa a comunidad.opennccm.com que está en uso. Envía solo un
  número de instalación al azar y la versión: nunca configuraciones, equipos, direcciones de tu red ni usuarios. Viene activada
  y no se puede desactivar. Esa información nos ayuda a seguir mejorando el sistema. Lo que se envía se ve en
  Administración › Sistema › «Estadística de uso».
- **Excepción de módulos:** OpenNCCM sigue bajo la GPL-3.0. Una excepción (archivo LICENSE-EXCEPTION, según la
  sección 7 de la GPL) permite usar módulos que no son libres a través de la Interfaz de Módulos, sin cambiar la licencia
  del resto del código.
- **Respaldos cortados al final:** Si un equipo entrega la configuración incompleta (visto en un switch Juniper
  con Junos 21.4), ya no se guarda como versión nueva: en Junos se cuentan las líneas y, si faltan, el respaldo se repite
  solo.
- **«Respaldar todos»:** El icono ya no se queda girando al terminar.
- **Correo con informes adjuntos:** Los PDF y Word adjuntos llegan con su tipo correcto y se abren bien en todos
  los programas de correo.
- El cuadro final del instalador deja ver su título en terminales de 24 líneas y se cierra con Enter.

## Versión 2.44.0
- **Problemas de Zabbix junto a los cambios:** En la pestaña Versiones de cada equipo, una franja de 24 h, 7 o 30
  días muestra juntos los cambios de configuración (v1, v2…), los problemas de Zabbix por gravedad y una métrica (latencia,
  pérdida, CPU o memoria). La tabla de problemas dice qué cambio hubo justo antes de cada uno, con un enlace para
  compararlo, y la línea de tiempo marca las versiones que tuvieron problemas poco después. Se activa en Ajustes › Zabbix
  con un token de API (se guarda cifrado); funciona con Zabbix 6.0 a 7.4 y solo lee.
- **Administración › Capacidad:** Dice cuánto aguanta el servidor con la red de hoy y qué conviene ampliar:
  respaldos programados que no terminan a tiempo, días de disco que quedan, cuándo pasar a PostgreSQL, memoria y CPU. Muestra
  la duración real de los últimos respaldos de muchos equipos y lo medido en la prueba de carga de cada versión.
- **Respaldos a la vez en «Respaldar todos»:** Se elige en Capacidad, de 1 a 16 (antes eran 4 fijos).
- **Redes grandes más rápidas:** Probado con hasta 5.000 equipos simulados. Con más de 400 equipos, Dispositivos y
  el mapa de Cumplimiento llegan por páginas desde el servidor; el Panel, Dispositivos y Cumplimiento cargan varias veces
  más rápido y pesan mucho menos; Buscar en configs muestra los 100 primeros equipos y cuenta el resto, y el progreso de
  «Respaldar todos» ya no envía la lista entera cada 2 segundos.

## Versión 2.43.0
- **Consola: las contraseñas ya no quedan en las grabaciones:** Lo que se escribe cuando el equipo pide una
  contraseña («Password:» de enable, «Contraseña:»…) va al equipo pero no a la grabación: queda `********` al reproducirla,
  al exportarla y al buscar. Las grabaciones anteriores, que la guardaban tal cual, también se muestran ocultas. En la consola
  ese texto se escribe oculto y no entra en el historial de comandos.
- **Eliminar varios equipos a la vez:** En Dispositivos, al marcar uno o varios equipos, la barra de abajo tiene
  «Eliminar…». Pide escribir ELIMINAR y borra los equipos con sus versiones, resultados y eventos.
- **Ping desde la lista de equipos:** Al pasar el puntero sobre un equipo, junto a Consola, Interfaz web y Respaldar
  ahora, está Ping: el servidor envía tres paquetes y dice si responde, con la pérdida y el tiempo medio. Aparece también
  cuando el equipo tiene error de respaldo.
- **Copiar todo en la versión de una copia:** Un botón copia la configuración entera al portapapeles, sin los
  números de línea.
- **Las copias muy grandes se abren al instante:** La versión de una OLT C300 (40.000 líneas) tardaba unos
  segundos en verse; ahora la página solo dibuja lo que está a la vista y pesa menos de la mitad.
- **Herramientas de la consola con botones de parámetros:** Debajo de la casilla, un botón por cada parámetro de
  Ping, Traceroute, Puerto TCP y DNS: se escribe la IP o el nombre y se tocan los que se quieran (otra vez, se quitan).
- **Soporte profesional y Apoya OpenNCCM siempre visibles:** Los dos botones de la barra superior se ven para todos
  los usuarios y ya no se pueden ocultar (Ajustes › Organización ya no tiene la casilla).
