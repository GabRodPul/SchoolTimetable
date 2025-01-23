### Pull Request: "[TÍTULO BREVE DEL CAMBIO]"
**Descripción del PR**
Este PR mejora la accesibilidad en la aplicación corrigiendo [breve descripción del problema
resuelto].
---
### Cambios realizados
Mejoras implementadas:
- Se añadió `alt` a todas las imágenes.
- Se corrigió el contraste en los botones (`#ff0000` → `#d90000`).
- Se implementó navegación accesible con `tabindex`.
- Se agregaron roles ARIA (`aria-labelledby`, `aria-hidden`).
Antes y después (capturas de pantalla)
_Añadir capturas de Lighthouse o Axe DevTools mostrando la mejora._
---
### Resultados tras la mejora
| | Antes | Después |
|------|------|------|
| Lighthouse Score | 75% | 100% |
| Contraste en botones| No cumple | Cumple WCAG 2.1 |
| Uso de ARIA| No presente | Correctamente implementado |
Issue relacionado: Closes #_ID del Issue relacionado_
---
### ¿Cómo probar estos cambios?
1. Abrir la aplicación en un navegador.
2. Probar la navelgación con `Tab`, `Shift + Tab`, `Enter`
3. Ejecutar `Lighthouse` en DevTools (Chrome).
4. Revisar el score de accesibilidad.
---
### Referencias
- [Guía de accesibilidad WCAG 2.1](https://www.w3.org/TR/WCAG21/)
- [Pruebas con Axe DevTools](https://www.deque.com/axe/devtools/)
**Revisado por:** `@usuario_revisor`
**Aprobado por:** `@usuario_aprobador`