---
title: "Asistente IA"
description: "Un asistente opcional con el proveedor de IA de su organización."
---

1.  En **Administración → Ajustes → Asistente IA**, actívelo y elija el proveedor: **Anthropic (Claude)**, **OpenAI**, **Google (Gemini)**, **Mistral** o **Compatible con OpenAI** (OpenRouter, Groq, DeepSeek, Azure…, con la dirección del servicio).
2.  Escriba la **clave de API** (se guarda cifrada, una por proveedor), pulse **Cargar de la cuenta** para ver los modelos, elija uno y pulse **Probar conexión** (muestra el tiempo de respuesta).
3.  Revise la privacidad: lo que se pregunta y el contexto del equipo salen al proveedor. **Antes de enviar se ocultan siempre** contraseñas, comunidades SNMP y claves de VPN y wifi (la vista previa muestra cómo se envía un respaldo). Puede incluir o no el respaldo del equipo y las últimas 200 líneas de la consola.
4.  Elija qué roles pueden usarlo y el límite de preguntas por usuario y día. «Uso este mes» muestra preguntas y tokens; si escribe el precio por millón de tokens de su modelo, también un costo estimado (lo cobra el proveedor).

| Dónde aparece | Qué hace |
| --- | --- |
| Consola | Panel **Asistente de red** con el proveedor y el modelo, el contexto (equipo, sistema, respaldo, salida de la consola, secretos ocultos) y preguntas sugeridas. Cada comando de la respuesta lleva su riesgo (**solo lectura**, **cambia la configuración**, **corta el servicio**) y los botones **Copiar**, **Insertar** y, si es un cambio, **Enviar como solicitud de cambio**. Indica la fuente (el respaldo del equipo o la referencia del fabricante). |
| Barra superior | Botón **✦ Asistente** en todas las páginas. |
| Comparar configuraciones | **✦ Explicar este cambio**. |
| Cumplimiento | **✦ ¿Cómo lo corrijo?** en cada regla con infracciones. |

Cada pregunta queda en Auditoría con el usuario, el equipo y el proveedor.
