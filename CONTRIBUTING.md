# Contribuyendo a Perfect Sound

¡Gracias por tu interés en contribuir a Perfect Sound! 🎵

## Cómo Contribuir

### Reportar Bugs

Si encuentras un bug, por favor abre un issue con:
- Descripción clara del problema
- Pasos para reproducirlo
- Comportamiento esperado vs actual
- Screenshots si es posible
- Información del navegador/dispositivo

### Sugerir Mejoras

Para sugerir nuevas características:
- Abre un issue con la etiqueta "enhancement"
- Describe la funcionalidad deseada
- Explica por qué sería útil
- Proporciona ejemplos de uso

### Pull Requests

1. **Fork el repositorio**
   ```bash
   git clone https://github.com/AnthonyDev65/PerfectSounds.git
   cd perfect-sound
   ```

2. **Crea una rama para tu feature**
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```

3. **Instala dependencias**
   ```bash
   npm install
   ```

4. **Haz tus cambios**
   - Sigue las convenciones de código existentes
   - Mantén el código limpio y documentado
   - Asegúrate de que el build funcione: `npm run build`

5. **Commit tus cambios**
   ```bash
   git add .
   git commit -m "feat: descripción de la nueva funcionalidad"
   ```

6. **Push a tu fork**
   ```bash
   git push origin feature/nueva-funcionalidad
   ```

7. **Abre un Pull Request**
   - Describe los cambios realizados
   - Referencia issues relacionados
   - Incluye screenshots si hay cambios visuales

## Convenciones de Código

### TypeScript/React
- Usa TypeScript para todos los componentes
- Componentes funcionales con hooks
- Props tipadas con interfaces
- Nombres descriptivos para variables y funciones

### CSS
- CSS modular por componente
- Usa variables CSS cuando sea posible
- Mobile-first approach
- Media queries para desktop (min-width: 1024px)

### Commits
Usa conventional commits:
- `feat:` Nueva funcionalidad
- `fix:` Corrección de bugs
- `docs:` Cambios en documentación
- `style:` Cambios de formato (no afectan código)
- `refactor:` Refactorización de código
- `test:` Agregar o modificar tests
- `chore:` Tareas de mantenimiento

## Estructura del Proyecto

```
src/
├── components/      # Componentes reutilizables
├── context/         # Context API providers
├── models/          # Interfaces y tipos
├── pages/           # Páginas principales
├── services/        # Lógica de negocio
└── constants/       # Constantes globales
```

## Testing

Antes de hacer un PR:
```bash
npm run build    # Verifica que el build funcione
npm start        # Prueba en desarrollo
```

## Código de Conducta

- Sé respetuoso y constructivo
- Acepta críticas constructivas
- Enfócate en lo mejor para el proyecto
- Ayuda a otros contribuidores

## Preguntas

Si tienes preguntas, abre un issue con la etiqueta "question".

¡Gracias por contribuir! 🎶
