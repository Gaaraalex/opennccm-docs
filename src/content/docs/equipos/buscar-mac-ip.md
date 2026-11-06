---
title: "Buscar una MAC o una IP"
description: "Saber en qué switch y en qué puerto está conectado un equipo a partir de su MAC o su IP, con la VLAN, el camino y cuándo se vio por última vez."
---

En el buscador de la barra superior (**Ctrl K**) se puede escribir una MAC (`aa:bb:cc:dd:ee:ff`, `aabb.ccdd.eeff` o `AA-BB-CC-DD-EE-FF`) o una IP: OpenNCCM dice dónde está conectado, en qué switch y puerto, con su VLAN, la descripción del puerto, cuándo se vio y el camino (por ejemplo «CORE-01 (tabla ARP) → DIST-NORTE Gi1/1/2 → ACC-S-P2 Gi1/0/17»). Con la IP saca la MAC de las tablas ARP. La MAC también aparece en los uplinks y troncales: se muestra el puerto de acceso.

-   Las tablas MAC y ARP se leen en cada respaldo (Cisco, NX-OS, Arista, Huawei, Juniper, EXOS, VOSS, EdgeSwitch, MikroTik y Linux) y se guarda un historial MAC → puerto de 90 días, para mostrar **Visto por última vez**.
-   Si aparece en varios puertos de acceso, salen todos (el más reciente primero) y una explicación de por qué puede pasar.
-   Si no está conectado ahora, **Leer las tablas ahora** (operadores y administradores) vuelve a leerlas en los equipos que las entregan, de a 8 a la vez. Se ven también los equipos que no entregan tablas y por qué.
-   El fabricante de la MAC sale de la base del IEEE que instala el paquete `ieee-data` (lo agrega el [instalador](/instalacion/instalar/)).

Para buscar un texto dentro de las configuraciones, vea [Buscar en las configuraciones](/equipos/buscar/).
