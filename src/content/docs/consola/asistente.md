---
title: "Asistente IA"
description: "Un asistente opcional con el proveedor de IA de su organización."
resumen:
  - "Opcional: se activa en Administración → Ajustes → Asistente IA con el proveedor y la clave de API de su organización."
  - "Antes de enviar se ocultan siempre contraseñas, comunidades SNMP y claves de VPN y wifi; usted elige qué roles lo usan y cuántas preguntas por día."
  - "Ayuda en la consola, en la comparación de configuraciones, en cumplimiento y en un chat en todas las páginas; las acciones que cambian algo piden confirmación."
---

<p class="captura-tema"><img class="tema-oscuro" src="/capturas/oscuro/asistente.png" alt="Chat del asistente abierto junto al Panel, con la pregunta «¿Qué equipos necesitan atención hoy?» y su respuesta" width="1600" height="1000" loading="lazy" /><img class="tema-claro" src="/capturas/claro/asistente.png" alt="Chat del asistente abierto junto al Panel, con la pregunta «¿Qué equipos necesitan atención hoy?» y su respuesta" width="1600" height="1000" loading="lazy" /><small class="captura-nota">Respuesta de ejemplo, con un proveedor simulado y una red de ejemplo.</small></p>

1.  En **Administración → Ajustes → Asistente IA**, actívelo y elija el proveedor: **Anthropic (Claude)**, **OpenAI**, **Google (Gemini)**, **Mistral** o **Compatible con OpenAI** (OpenRouter, Groq, DeepSeek, Azure…, con la dirección del servicio).
2.  Escriba la **clave de API** (se guarda cifrada, una por proveedor), pulse **Cargar de la cuenta** y elija el modelo en el desplegable con los modelos de su cuenta; pulse **Probar conexión** (muestra el tiempo de respuesta). Ese es el modelo de fábrica: cada usuario puede elegir otro de la misma lista en el chat o en el panel de la consola, sin cambiar el de los demás.
3.  Revise la privacidad: lo que se pregunta y el contexto del equipo salen al proveedor. **Antes de enviar se ocultan siempre** contraseñas, comunidades SNMP y claves de VPN y wifi (la vista previa muestra cómo se envía un respaldo). Puede incluir o no el respaldo del equipo y las últimas 200 líneas de la consola.
4.  Elija qué roles pueden usarlo y el límite de preguntas por usuario y día. «Uso este mes» muestra preguntas y tokens; si escribe el precio por millón de tokens de su modelo, también un costo estimado (lo cobra el proveedor).

| Dónde aparece | Qué hace |
| --- | --- |
| Consola | Panel **Asistente de red** con el proveedor y el modelo, el contexto (equipo, sistema, respaldo, salida de la consola, secretos ocultos) y preguntas sugeridas. La pregunta se escribe al fondo del panel; encima hay una fila con **✦ Preguntas sugeridas** (se pliegan solas al preguntar y se vuelven a abrir ahí), el desplegable del modelo y **ⓘ**, que oculta o muestra la parte de arriba (proveedor, contexto y aviso) para dejar más espacio a las respuestas; el navegador lo recuerda. En **Operar → Consola** cada sesión tiene su botón **✦ Asistente**. Cada comando de la respuesta lleva su riesgo (**solo lectura**, **cambia la configuración**, **corta el servicio**) y los botones **Copiar**, **Insertar** y, si es un cambio, **Enviar como solicitud de cambio**. Indica la fuente (el respaldo del equipo o la referencia del fabricante). El asistente sabe con qué equipo trabaja (plataforma, modelo, versión de firmware y la lista de comandos de ese equipo) y responde solo con comandos de esa plataforma y esa versión; las preguntas sugeridas también dependen del equipo (por ejemplo, túneles VPN y políticas en los cortafuegos). |
| Barra superior | Botón **Asistente** (con el logo del proveedor) en todas las páginas: abre el chat a la derecha, sin salir de la página (ver abajo). |
| Comparar configuraciones | **✦ Explicar este cambio**. |
| Cumplimiento | **✦ ¿Cómo lo corrijo?** en cada regla con infracciones. |

**Solo temas de red:** el asistente ayuda con redes y seguridad de redes, con los equipos que OpenNCCM admite y administra y con el uso de OpenNCCM. A una pregunta ajena (por ejemplo, una receta de cocina) responde en una frase que solo ayuda con la red y con OpenNCCM.

Cada pregunta queda en Auditoría con el usuario, el equipo y el proveedor.

### Chat del asistente en todo el sistema

El botón **Asistente** de la barra superior abre un chat a la derecha en cualquier página. Arriba muestra el proveedor y el modelo (con varios modelos en la cuenta, un desplegable para cambiarlo), **+** (conversación nueva) y la línea «Viendo: página · N equipos · secretos ocultos». La conversación se guarda para retomarla. Debajo del campo de texto hay preguntas sugeridas según la página.

-   **Datos de la red:** consulta OpenNCCM con funciones de solo lectura (equipos, respaldos, alarmas, cambios y versiones, cumplimiento, ciclo de vida, vulnerabilidades, base de conocimiento, configlets, tareas programadas, tipos de equipo admitidos y búsqueda en configuraciones), siempre con el rol y los grupos del usuario y con los secretos ocultos.
-   **Lo que puede preparar:** respaldos, tareas programadas, solicitudes de cambio (por ejemplo, para corregir una vulnerabilidad o una infracción con comandos de esa plataforma y versión), [configlets y scripts](/cambios/configlets/) (los crea el administrador; quedan para revisarlos antes de ejecutarlos) y casos de la [base de conocimiento](/observar/base-de-conocimiento/) (quedan como borrador para revisarlos y enviarlos).
-   **Migraciones:** desde otro sistema (RANCID, Oxidized, una planilla…) traduce los tipos de equipo a los de OpenNCCM y arma el CSV para [Equipos → Importar](/instalacion/desde-otra-herramienta/).
-   **Cómo usar OpenNCCM:** busca en este manual («¿Cómo programo un respaldo diario?»).
-   **Respuestas simples:** una o dos frases, los equipos en una línea cada uno (punto de color, nombre y motivo), como mucho 2 botones y el resto en **Más acciones**, y la fuente en gris.
-   **Acciones:** los botones llevan a la página que corresponde o preparan una acción. Si cambia algo (respaldar, crear una tarea, una solicitud de cambio, un configlet o un borrador de caso), aparece una tarjeta con **Cancelar** y **Confirmar**; se hace solo al confirmar y con los permisos del usuario. Las solicitudes de cambio pasan por aprobación como siempre.

Cada pregunta queda en Auditoría con las funciones que usó y el proveedor.
