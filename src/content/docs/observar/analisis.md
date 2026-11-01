---
title: "Análisis, IP y mapa de red"
description: "Identificar patrones: qué equipos cambian más, quién cambia, por qué vía, qué versiones de firmware predominan y cómo está el cumplimiento y el ciclo de vida."
curso: ["8.2"]
---

Elija el período (7, 30 o 90 días). La página muestra:

-   **Indicadores**: cambios del período con su minigráfica y la comparación con el período anterior, cambios **fuera de solicitud** (detectados por syslog), cambios **revertidos** y **equipos con cambios**.
-   **Cuándo cambia la red**: mapa de calor por día de la semana y hora (más intenso = más cambios). Sirve para ver cambios fuera del horario laboral.
-   **Origen de los cambios**: anillo con el total en el centro y el porcentaje de cada origen (programado, syslog, manual o aplicado por OpenNCCM).
-   Barras de **equipos con más cambios**, **quién hace los cambios**, **equipos por fabricante**, **firmware más usado**, **ciclo de vida** y **cumplimiento por política**.

Al pasar el cursor sobre una barra o celda aparece su valor exacto. Los nombres de equipos y políticas son enlaces.

![Página de Análisis.](../../../assets/manual/22-analisis.png)

## IP y VLAN

**IP y VLAN** (menú lateral) reúne las direcciones IP y las VLAN configuradas en todos los equipos, leídas de su última configuración guardada (no se ejecuta nada en los equipos). Reconoce Cisco y similares, Huawei, EdgeSwitch, VOSS, FortiGate, Junos, VyOS/EdgeRouter, MikroTik, EXOS y airOS; solo IPv4. Avisa de las **IP configuradas en más de un sitio** (en dos equipos o dos interfaces) y de las **VLAN con nombres distintos** según el equipo. Se puede filtrar por grupo o texto y exportar a CSV.

## Mapa de la red

**Mapa de la red** (menú lateral) dibuja los equipos y los enlaces entre ellos, con el puerto de cada extremo. Los enlaces salen de los vecinos **LLDP o CDP** que cada equipo anuncia, leídos en cada respaldo con una orden de solo lectura (por ejemplo `show cdp neighbors detail` en Cisco o `/ip neighbor print` en MikroTik). Lo admiten Cisco, Arista, Juniper, Huawei, HP/Aruba, Dell, Ruckus, Allied, MikroTik, EdgeSwitch, UniFi Switch y EXOS, si tienen LLDP o CDP activado.

-   Cada equipo tiene tres capas: el **anillo** dice el estado, el **icono** del centro qué es (router, switch, antena, firewall o desconocido) y el **distintivo** de la esquina su fabricante (marcas propias de OpenNCCM, no los logotipos de las marcas). El tipo sale del modelo o la plataforma y, si no dicen nada, de las capacidades que anuncia por LLDP o CDP. Los chips **Fabricante** de arriba resaltan los de una marca, y el panel de cada equipo explica **cómo se reconoció**. Los puertos solo se muestran en los enlaces del equipo seleccionado.
-   Los equipos se colorean según su último respaldo. Los **vecinos que no están en OpenNCCM** llevan borde discontinuo: al pulsarlos, **Agregar a OpenNCCM** abre el alta con su nombre e IP.
-   Un vecino se reconoce como equipo de OpenNCCM por su nombre (sin dominio) o, si no, por su IP de gestión.
-   Solo salen **equipos de red**. Si por un puerto se ven **varios equipos por su radio**, son los CPE de los clientes de un punto de acceso: se quitan (el punto de acceso sí sale) y una nota dice cuántos. Si se ve **uno solo**, es el otro extremo de un PtP o la estación, y sale, salvo que sea un modelo de antena de cliente (LiteBeam, NanoStation, NanoBeam, SXT, LHG…), que nunca sale: así no aparecen los clientes que van cada uno en su VLAN. En MikroTik, en un puerto con varios vecinos por cable solo cuenta el visto por LLDP.
-   Los **enlaces inalámbricos** (un extremo es una radio: ath0, wlan1…) se dibujan con línea discontinua.
-   En **Ajustes › Mapa de la red** se eligen los **tipos de equipo descubiertos** que salen: MikroTik, Ubiquiti, Juniper, Cisco, Huawei, HP/Aruba, Extreme y otros. El tipo se reconoce por lo que anuncia el vecino (plataforma, modelo), por el fabricante de su MAC (los switches UniFi que no dicen su modelo) o por el nombre de sus puertos. Los equipos que ya están en OpenNCCM salen siempre. Bajo el mapa se nombran los vecinos que no salen por su tipo.
-   Al elegir un equipo se ven los **puertos** de sus enlaces, junto a cada extremo; con más de 8 enlaces, solo el del vecino (los propios están en la lista *Enlaces* del panel). Al pasar el ratón por un enlace se ven los dos. El panel ocupa su propio espacio a la derecha (abajo en pantallas estrechas) y el mapa se mueve para que se vean el equipo y sus vecinos.
-   Las **redes aisladas** (equipos sin enlaces conocidos entre sí) se colocan juntas, en filas; el selector **Red** muestra solo una.
-   Se puede filtrar por grupo, buscar y arrastrar los equipos. Para recorrerlo: arrastrar el fondo, la rueda o los botones + y − para el zoom, «Ver todo el mapa» y «Pantalla completa». Debajo, la lista de enlaces.
-   Se desactiva en **Ajustes › Mapa de la red** (entonces los respaldos no leen vecinos).
