# Perfect Sound - Guía de Características

## 🎵 Nuevas Funcionalidades

### 1. Editor de BPM en Modo Avanzado

Ahora puedes editar el BPM (tempo) de tus canciones avanzadas directamente desde el editor.

**Cómo usar:**
1. Abre una canción en modo avanzado
2. Haz clic en el badge morado de BPM en el header
3. Usa los botones +/- o escribe directamente el valor
4. Selecciona un preset rápido (Lento, Moderado, Normal, Rápido)
5. Haz clic en "Guardar"

**Características:**
- Rango: 40-240 BPM
- Presets rápidos para tempos comunes
- Actualización en tiempo real del playback
- Se guarda automáticamente con la canción

### 2. Sincronización en la Nube con Supabase

Guarda tus canciones, favoritos y progresiones en la nube para acceder desde cualquier dispositivo.

**Configuración:**
1. Sigue la guía en `SUPABASE_SETUP.md`
2. Configura las variables de entorno
3. Crea una cuenta en la app
4. ¡Listo! Tus datos se sincronizan automáticamente

**Características:**
- ✅ Autenticación segura con email/password
- ✅ Sincronización automática de canciones simples
- ✅ Sincronización automática de canciones avanzadas
- ✅ Sincronización de favoritos
- ✅ Acceso desde múltiples dispositivos
- ✅ Backup automático en la nube
- ✅ Row Level Security (RLS) para privacidad

**Funciona sin cuenta:**
Si no configuras Supabase o no creas una cuenta, la app sigue funcionando perfectamente con almacenamiento local (localStorage).

### 3. Sistema de Autenticación

**Crear cuenta:**
1. Haz clic en "Iniciar Sesión" en el navbar
2. Selecciona "¿No tienes cuenta? Regístrate"
3. Completa el formulario
4. Confirma tu email (si está habilitado)

**Iniciar sesión:**
1. Haz clic en "Iniciar Sesión"
2. Ingresa tu email y contraseña
3. ¡Listo! Tus datos se sincronizan automáticamente

**Recuperar contraseña:**
1. Haz clic en "¿Olvidaste tu contraseña?"
2. Ingresa tu email
3. Revisa tu bandeja de entrada
4. Sigue el link para resetear

**Perfil de usuario:**
- Haz clic en tu avatar para ver el menú
- Ver tu nombre y email
- Cerrar sesión

### 4. Metronomo con Sonido

El metrónomo ahora reproduce sonido en ambos modos (Notas y Avanzado).

**Características:**
- Sonido de acento en el primer beat (1200Hz)
- Sonido normal en beats subsecuentes (800Hz)
- Sincronizado con el pulso visual verde
- Funciona en modo Notas y Avanzado

**En modo Notas:**
- Configura beats por acorde (8, 4, 2)
- El sonido marca cada beat
- Acento en el primer beat de cada acorde

**En modo Avanzado:**
- Respeta la duración de cada acorde
- Acento en el primer beat de cada acorde
- Progresa automáticamente por secciones
- Respeta las repeticiones configuradas

### 5. Transposición de Tonalidad

Cambia la tonalidad de tus canciones avanzadas sin perder la estructura.

**Cómo usar:**
1. Abre una canción en modo avanzado
2. Haz clic en el badge verde de la tonalidad
3. Selecciona la nueva tonalidad
4. Todos los acordes se transponen automáticamente

**Características:**
- Transpone todos los acordes de todas las secciones
- Mantiene la estructura y duración
- No sale del editor
- Se guarda automáticamente

## 📊 Estructura de Datos

### Canciones Simples (localStorage/Supabase)
```typescript
{
  id: string,
  name: string,
  chords: string[],
  degrees: string[],
  key: string
}
```

### Canciones Avanzadas (localStorage/Supabase)
```typescript
{
  id: string,
  name: string,
  key: string,
  bpm: number,
  sections: [
    {
      id: string,
      name: string,
      color: string,
      repeatCount: number,
      chords: [
        {
          id: string,
          name: string,
          degrees: string,
          degreesColor: string,
          beats: number
        }
      ]
    }
  ],
  createdAt: number,
  updatedAt: number
}
```

### Favoritos (localStorage/Supabase)
```typescript
{
  favorites: string[] // Array de notas favoritas
}
```

## 🔐 Seguridad y Privacidad

### Row Level Security (RLS)
Todas las tablas en Supabase tienen políticas RLS que aseguran:
- Solo puedes ver tus propias canciones
- Solo puedes editar tus propias canciones
- Solo puedes eliminar tus propias canciones
- Cada usuario tiene datos completamente privados

### Almacenamiento Local
Si no usas autenticación:
- Todos los datos se guardan en localStorage
- Los datos persisten en tu navegador
- No se comparten con nadie
- Puedes exportar/importar manualmente

### Autenticación
- Contraseñas hasheadas con bcrypt
- Tokens JWT seguros
- Sesiones con expiración
- Email de confirmación (opcional)

## 🎯 Casos de Uso

### Para Músicos Principiantes
1. Explora tonalidades en la página de Notas
2. Aprende los acordes diatónicos
3. Marca tus tonalidades favoritas
4. Practica progresiones simples con el metrónomo

### Para Compositores
1. Crea progresiones en modo Notas
2. Guarda tus ideas rápidamente
3. Experimenta con diferentes tonalidades
4. Organiza tus progresiones por proyecto

### Para Arreglistas
1. Usa el modo Avanzado para estructuras completas
2. Define secciones (Intro, Verso, Coro, etc.)
3. Configura tiempos y repeticiones
4. Calcula la duración total
5. Transpone a diferentes tonalidades

### Para Bandas
1. Crea una cuenta compartida
2. Guarda el setlist en la nube
3. Accede desde cualquier dispositivo
4. Practica con el metrónomo sincronizado

## 🚀 Próximas Características (Roadmap)

- [ ] Exportar canciones a PDF
- [ ] Compartir canciones con link público
- [ ] Modo oscuro/claro
- [ ] Acordes extendidos (7, 9, 11, 13)
- [ ] Escalas menores armónicas y melódicas
- [ ] Grabación de audio
- [ ] Integración con MIDI
- [ ] Modo de práctica con loops
- [ ] Estadísticas de uso
- [ ] Colaboración en tiempo real

## 💡 Tips y Trucos

### Atajos de Teclado (Próximamente)
- `Space`: Play/Pause
- `Esc`: Stop
- `+/-`: Ajustar BPM
- `←/→`: Navegar entre acordes

### Mejores Prácticas
1. **Nombra tus canciones descriptivamente**: Incluye tonalidad y tempo
2. **Usa colores de sección**: Ayuda a identificar visualmente la estructura
3. **Configura repeticiones**: Evita duplicar secciones manualmente
4. **Guarda versiones**: Crea copias antes de hacer cambios grandes
5. **Sincroniza regularmente**: Si usas la nube, verifica que se guardó

### Optimización de Performance
- La app funciona offline después de la primera carga
- Los datos locales son más rápidos que la nube
- Limpia canciones antiguas que no uses
- Usa el modo avanzado solo cuando lo necesites

## 🐛 Solución de Problemas

### El metrónomo no suena
- Verifica que el volumen del dispositivo esté alto
- Algunos navegadores bloquean audio automático
- Haz clic en play después de interactuar con la página

### Las canciones no se sincronizan
- Verifica que estás autenticado
- Revisa la consola del navegador (F12)
- Verifica las variables de entorno de Supabase
- Intenta cerrar sesión y volver a entrar

### El BPM no se actualiza
- Asegúrate de hacer clic en "Guardar"
- Verifica que el valor esté entre 40-240
- Recarga la página si persiste el problema

### Los acordes no se transponen
- Verifica que la canción tenga acordes válidos
- Algunos acordes especiales pueden no transponerse
- Reporta el problema con el acorde específico

## 📞 Soporte

¿Necesitas ayuda? Abre un issue en GitHub o contacta al desarrollador.

## 📄 Licencia

MIT License - Ver `LICENSE` para más detalles.
