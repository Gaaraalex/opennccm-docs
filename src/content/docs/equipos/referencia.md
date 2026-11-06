---
title: "Configuración de referencia por modelo"
description: "Comparar los equipos del mismo modelo con el que está bien configurado, sección por sección, e igualarlos con una solicitud de cambio."
---

**Dispositivos › Configuración de referencia** compara los equipos del mismo tipo (mismo modelo y sistema) con el que está bien configurado. La referencia se elige en la página o desde la ficha del equipo (**⋯ › Usar como referencia**).

-   A la izquierda, cada tipo de equipo con su referencia; a la derecha, cada equipo con la cantidad de diferencias, las secciones donde están (AAA, SNMP, NTP, VLAN…) y la fecha de su respaldo. Se compara el último respaldo de cada uno.
-   No se comparan el nombre del equipo, la IP de gestión, las descripciones de interfaces, las contraseñas y claves cifradas, los certificados ni las líneas que se ignoraron.
-   **Ver** muestra las diferencias por sección, lado a lado o solo los cambios: en rojo lo que tiene la referencia y falta, en verde lo que hay y no está en la referencia. Cada bloque se puede ignorar en ese equipo o en todos.
-   **Preparar solicitud** arma una [solicitud de cambio](/cambios/solicitudes/) con los comandos que faltan y los que sobran. Nunca se aplica sola: pasa por la aprobación y su análisis de impacto. Las diferencias con claves o con la IP de gestión quedan para hacer a mano.

La [línea base](/equipos/linea-base/) compara cada equipo con su propia configuración aprobada; la configuración de referencia compara equipos distintos del mismo modelo entre sí.
