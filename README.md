# DP-600 · App de estudio

App web estática para preparar el examen **DP-600: Implementing Analytics Solutions Using Microsoft Fabric** (Microsoft Certified: Fabric Analytics Engineer Associate).

El temario sigue la [guía de estudio oficial de Microsoft Learn](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/dp-600) (actualizada el 2026-10-30): 4 dominios, 11 secciones y 57 habilidades evaluadas.

## Qué incluye

- **Temario**: dominios con su peso, notas de estudio por sección, estado por habilidad (Pendiente / Estudiando / Dominado), notas personales y enlace de búsqueda en Microsoft Learn.
- **Práctica**: preguntas por dominio o sección, con explicación inmediata; modos "solo no respondidas" y "solo falladas".
- **Simulacro**: 30 preguntas en 45 minutos, repartidas según el peso de cada dominio, con revisión al final.
- **Progreso**: avance y precisión por dominio, secciones a reforzar, historial de simulacros, exportar/importar.
- **Recursos**: enlaces al material oficial.

## Uso

Abre `index.html` en el navegador (funciona sin servidor) o publícalo con GitHub Pages.
El progreso se guarda en `localStorage`; usa Exportar/Importar en la pestaña Progreso para moverlo de equipo.

## Estructura

```
index.html          # la app (HTML + CSS + JS, sin dependencias)
data/temario.js     # dominios, secciones, notas y habilidades
data/preguntas.js   # banco de preguntas
```

## Añadir contenido

- Preguntas: añade una fila a `data/preguntas.js` con `[dominio, sección, pregunta, [opciones], [índices correctos], explicación]`. Dos o más índices correctos la convierten en pregunta de selección múltiple.
- Temario: si Microsoft actualiza la guía, edita `data/temario.js` y cambia el campo `actualizado`.

## Aviso

Las preguntas están redactadas para práctica y no son preguntas reales del examen. Contrasta siempre con la guía oficial vigente.
