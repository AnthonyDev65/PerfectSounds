# Perfect Sound - Guía de Inicio Rápido

## 🚀 Inicio Rápido (Sin Supabase)

La app funciona perfectamente sin configuración adicional usando localStorage.

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm start

# 3. Abrir en navegador
# http://localhost:3000
```

¡Listo! Ya puedes usar todas las funciones excepto sincronización en la nube.

## ☁️ Habilitar Sincronización en la Nube (Opcional)

### Paso 1: Crear Proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com)
2. Crea una cuenta gratuita
3. Crea un nuevo proyecto
4. Espera 1-2 minutos a que se inicialice

### Paso 2: Configurar Base de Datos

1. En Supabase, ve a **SQL Editor**
2. Crea una nueva query
3. Copia y pega el contenido de `supabase-schema.sql`
4. Ejecuta el script (botón "Run")

### Paso 3: Obtener Credenciales

1. Ve a **Settings** > **API**
2. Copia:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: Empieza con `eyJ...`

### Paso 4: Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```bash
REACT_APP_SUPABASE_URL=https://tu-proyecto.supabase.co
REACT_APP_SUPABASE_ANON_KEY=tu_anon_key_aqui
```

### Paso 5: Reiniciar App

```bash
# Detén el servidor (Ctrl+C)
# Inicia de nuevo
npm start
```

### Paso 6: Crear Cuenta

1. Abre la app
2. Haz clic en "Iniciar Sesión"
3. Selecciona "Crear Cuenta"
4. Completa el formulario
5. ¡Listo! Tus datos se sincronizan automáticamente

## 📱 Uso Básico

### Explorar Notas
1. Página de inicio → Selecciona una nota (C, D, E, etc.)
2. Explora los 7 acordes diatónicos
3. Marca favoritos con la estrella ⭐

### Crear Progresión Simple
1. Selecciona acordes haciendo clic
2. Aparecen en orden de selección
3. Usa el metrónomo para practicar
4. Guarda con el botón "Guardar"

### Crear Canción Avanzada
1. Ve a "Avanzado"
2. Crea una nueva canción
3. Agrega secciones (Intro, Verso, Coro, etc.)
4. Arrastra acordes a cada sección
5. Configura beats y repeticiones
6. Dale play para escuchar

### Editar BPM
1. En modo avanzado, haz clic en el badge de BPM
2. Ajusta con +/- o escribe directamente
3. Usa presets rápidos
4. Guarda

### Transponer Tonalidad
1. En modo avanzado, haz clic en el badge de tonalidad
2. Selecciona la nueva tonalidad
3. Todos los acordes se transponen automáticamente

## 🎯 Atajos Útiles

### Navegación
- **Inicio**: Ver todas las notas
- **Notas**: Explorar acordes de una tonalidad
- **Avanzado**: Crear canciones estructuradas
- **Canciones**: Ver canciones guardadas

### Metrónomo
- **8**: 8 beats por acorde
- **4**: 4 beats por acorde
- **2**: 2 beats por acorde
- **Play**: Iniciar metrónomo
- **Stop**: Detener y resetear

### Modo Avanzado
- **Drag & Drop**: Reordenar acordes
- **+/-**: Ajustar beats de acorde
- **×N**: Repeticiones de sección
- **Play**: Reproducir canción completa

## 🔧 Solución Rápida de Problemas

### No se escucha el metrónomo
- Verifica el volumen del dispositivo
- Haz clic en la página antes de dar play
- Algunos navegadores bloquean audio automático

### Las canciones no se guardan
- Verifica que localStorage esté habilitado
- No uses modo incógnito
- Revisa la consola del navegador (F12)

### No puedo crear cuenta
- Verifica las variables de entorno
- Revisa que ejecutaste el SQL schema
- Verifica la consola del navegador

### La app no carga
```bash
# Limpia cache y reinstala
rm -rf node_modules package-lock.json
npm install
npm start
```

## 📚 Documentación Completa

- **FEATURES.md**: Todas las características en detalle
- **SUPABASE_SETUP.md**: Guía completa de Supabase
- **DEPLOYMENT.md**: Cómo deployar a producción
- **CONTRIBUTING.md**: Cómo contribuir al proyecto

## 🎓 Tutoriales

### Tutorial 1: Primera Progresión
1. Inicio → Selecciona "C"
2. Haz clic en: C, Am, F, G
3. Dale play al metrónomo
4. Practica la progresión
5. Guarda como "Mi Primera Progresión"

### Tutorial 2: Canción Completa
1. Avanzado → Nueva Canción
2. Nombre: "Mi Canción", Tonalidad: C, BPM: 120
3. Agrega sección "Intro"
4. Agrega acordes: C (4 beats), Am (4 beats)
5. Configura repeticiones: ×2
6. Agrega sección "Verso"
7. Agrega acordes: F (4), G (4), C (4), Am (4)
8. Dale play para escuchar

### Tutorial 3: Transponer
1. Abre una canción en modo avanzado
2. Haz clic en el badge de tonalidad (ej: "C")
3. Selecciona nueva tonalidad (ej: "G")
4. Todos los acordes se transponen
5. Dale play para escuchar en la nueva tonalidad

## 💡 Tips Pro

1. **Usa favoritos**: Marca tus tonalidades más usadas
2. **Nombra descriptivamente**: "Balada en Am - 80 BPM"
3. **Experimenta con BPM**: Prueba diferentes tempos
4. **Usa secciones**: Organiza canciones complejas
5. **Practica con metrónomo**: Mejora tu timing
6. **Transpone para practicar**: Prueba en diferentes tonalidades

## 🎉 ¡Disfruta Perfect Sound!

Si tienes preguntas o sugerencias:
- Abre un issue en GitHub
- Consulta la documentación completa
- Revisa los ejemplos en FEATURES.md

¡Feliz composición! 🎵
