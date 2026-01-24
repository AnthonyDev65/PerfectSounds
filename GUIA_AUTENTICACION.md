# 🔐 Guía de Autenticación - Perfect Sound

## 📍 Ubicación del Botón de Login

### En Mobile (< 1024px)
- **Ubicación**: Navbar inferior, extremo derecho
- **Apariencia**: Icono de usuario circular
- **Color**: Gradiente verde-azul

### En Desktop (≥ 1024px)
- **Ubicación**: Sidebar izquierdo, parte inferior
- **Apariencia**: Botón "Iniciar Sesión" con icono
- **Color**: Gradiente verde-azul

---

## ✨ Crear Cuenta Nueva

### Paso 1: Abrir Modal de Autenticación
1. Abre la app: http://localhost:3001
2. Busca el botón de usuario en el navbar
3. Haz clic en él

### Paso 2: Ir a Registro
1. En el modal que aparece, verás "Iniciar Sesión"
2. Abajo hay un link: "¿No tienes cuenta? **Regístrate**"
3. Haz clic en "Regístrate"

### Paso 3: Completar Formulario
El formulario tiene 3 campos:

```
┌─────────────────────────────────────┐
│  Crear Cuenta                       │
│  Guarda tus canciones en la nube    │
├─────────────────────────────────────┤
│                                     │
│  Nombre completo                    │
│  ┌───────────────────────────────┐ │
│  │ Tu nombre                     │ │
│  └───────────────────────────────┘ │
│                                     │
│  Email                              │
│  ┌───────────────────────────────┐ │
│  │ tu@email.com                  │ │
│  └───────────────────────────────┘ │
│                                     │
│  Contraseña                         │
│  ┌───────────────────────────────┐ │
│  │ ••••••••                      │ │
│  └───────────────────────────────┘ │
│                                     │
│  ┌───────────────────────────────┐ │
│  │      Crear Cuenta             │ │
│  └───────────────────────────────┘ │
│                                     │
│  ¿Ya tienes cuenta? Inicia sesión  │
└─────────────────────────────────────┘
```

**Requisitos:**
- ✅ Email válido (ej: usuario@gmail.com)
- ✅ Contraseña mínimo 6 caracteres
- ⚠️ Nombre completo es opcional

### Paso 4: Crear Cuenta
1. Haz clic en el botón "Crear Cuenta"
2. Espera unos segundos
3. Si todo está bien:
   - ✅ Verás el mensaje: "¡Cuenta creada! Revisa tu email para confirmar."
   - ✅ El modal se cierra automáticamente
   - ✅ Tu avatar aparece en el navbar

**Nota**: La confirmación de email es opcional. Puedes usar la app inmediatamente.

---

## 🔑 Iniciar Sesión

### Paso 1: Abrir Modal
1. Haz clic en el botón de usuario en el navbar
2. Verás el formulario de "Iniciar Sesión"

### Paso 2: Ingresar Credenciales

```
┌─────────────────────────────────────┐
│  Iniciar Sesión                     │
│  Guarda tus canciones en la nube    │
├─────────────────────────────────────┤
│                                     │
│  Email                              │
│  ┌───────────────────────────────┐ │
│  │ tu@email.com                  │ │
│  └───────────────────────────────┘ │
│                                     │
│  Contraseña                         │
│  ┌───────────────────────────────┐ │
│  │ ••••••••                      │ │
│  └───────────────────────────────┘ │
│                                     │
│  ┌───────────────────────────────┐ │
│  │      Iniciar Sesión           │ │
│  └───────────────────────────────┘ │
│                                     │
│  ¿Olvidaste tu contraseña?         │
│  ¿No tienes cuenta? Regístrate     │
└─────────────────────────────────────┘
```

### Paso 3: Iniciar Sesión
1. Haz clic en "Iniciar Sesión"
2. Espera unos segundos
3. Si las credenciales son correctas:
   - ✅ El modal se cierra
   - ✅ Tu avatar aparece en el navbar
   - ✅ Tus datos se sincronizan automáticamente

---

## 👤 Ver Perfil

Una vez iniciada la sesión, verás tu **avatar** (círculo con tu inicial):

### En Mobile
```
┌─────────────────────────────────────┐
│  [🏠] [🎵] [⚡] [📁]          [A]  │
└─────────────────────────────────────┘
                                   ↑
                              Tu avatar
```

### En Desktop
```
┌──────────────┐
│ Perfect Sound│
│              │
│ 🏠 Inicio    │
│ 🎵 Notas     │
│ ⚡ Avanzado  │
│ 📁 Canciones │
│              │
│ ─────────────│
│              │
│     [A]      │ ← Tu avatar
└──────────────┘
```

### Menú de Perfil

Haz clic en tu avatar para ver el menú:

```
┌─────────────────────────────────────┐
│  [A]  Anthony                       │
│       anthony@email.com             │
├─────────────────────────────────────┤
│  🚪 Cerrar Sesión                   │
└─────────────────────────────────────┘
```

---

## 🔄 Sincronización Automática

### ¿Qué se sincroniza?

Cuando inicias sesión, se sincronizan automáticamente:

1. **Canciones Simples** (de la página "Notas")
   - Nombre
   - Acordes
   - Grados
   - Tonalidad

2. **Canciones Avanzadas** (de la página "Avanzado")
   - Nombre
   - Tonalidad
   - BPM
   - Todas las secciones con sus acordes

3. **Favoritos**
   - Notas marcadas como favoritas

### ¿Cuándo se sincroniza?

- ✅ **Al iniciar sesión**: Se cargan tus datos de la nube
- ✅ **Al guardar una canción**: Se sube automáticamente
- ✅ **Al eliminar una canción**: Se elimina de la nube
- ✅ **Al marcar/desmarcar favorito**: Se actualiza en la nube

### Indicadores de Sincronización

- No hay indicadores visuales (es automático y silencioso)
- Si hay error, verás un mensaje en la consola (F12)
- Los datos locales siempre se mantienen como respaldo

---

## 🚪 Cerrar Sesión

### Paso 1: Abrir Menú
1. Haz clic en tu avatar
2. Se abre el menú de perfil

### Paso 2: Cerrar Sesión
1. Haz clic en "Cerrar Sesión"
2. El menú se cierra
3. Tu avatar desaparece
4. Vuelve a aparecer el botón "Iniciar Sesión"

**Nota**: Tus datos locales NO se borran al cerrar sesión. Siguen en localStorage.

---

## 🔐 Recuperar Contraseña

### Paso 1: Abrir Modal
1. Haz clic en "Iniciar Sesión"
2. Haz clic en "¿Olvidaste tu contraseña?"

### Paso 2: Ingresar Email

```
┌─────────────────────────────────────┐
│  Recuperar Contraseña               │
│  Guarda tus canciones en la nube    │
├─────────────────────────────────────┤
│                                     │
│  Email                              │
│  ┌───────────────────────────────┐ │
│  │ tu@email.com                  │ │
│  └───────────────────────────────┘ │
│                                     │
│  ┌───────────────────────────────┐ │
│  │      Enviar Email             │ │
│  └───────────────────────────────┘ │
│                                     │
│  Volver a Iniciar sesión           │
└─────────────────────────────────────┘
```

### Paso 3: Revisar Email
1. Haz clic en "Enviar Email"
2. Verás: "Email enviado. Revisa tu bandeja de entrada."
3. Revisa tu email
4. Haz clic en el link del email
5. Ingresa tu nueva contraseña

---

## ❌ Errores Comunes

### "Error al iniciar sesión"
**Causas:**
- Email o contraseña incorrectos
- Cuenta no existe
- Problemas de conexión

**Solución:**
- Verifica tu email y contraseña
- Intenta crear una cuenta nueva
- Verifica tu conexión a internet

### "Error al crear cuenta"
**Causas:**
- Email ya registrado
- Contraseña muy corta (< 6 caracteres)
- Email inválido

**Solución:**
- Usa otro email
- Usa una contraseña más larga
- Verifica el formato del email

### "No se sincronizan los datos"
**Causas:**
- No has iniciado sesión
- Problemas de conexión
- Error en Supabase

**Solución:**
- Verifica que tu avatar esté visible
- Revisa la consola del navegador (F12)
- Intenta cerrar sesión y volver a entrar

---

## 💡 Tips y Trucos

### 1. Usar sin Cuenta
✅ **Puedes usar la app completamente sin crear cuenta**
- Todo se guarda en localStorage
- Funciona offline
- No necesitas internet

### 2. Múltiples Dispositivos
✅ **Con cuenta puedes acceder desde cualquier dispositivo**
- Inicia sesión en tu PC
- Inicia sesión en tu tablet
- Inicia sesión en tu móvil
- Todos comparten las mismas canciones

### 3. Backup Automático
✅ **Tus datos están seguros**
- localStorage: Backup local
- Supabase: Backup en la nube
- Si borras el navegador, tus datos están en la nube

### 4. Privacidad
✅ **Tus datos son privados**
- Solo tú puedes ver tus canciones
- Row Level Security en Supabase
- Nadie más tiene acceso

---

## 🎯 Flujo Completo de Ejemplo

### Escenario: Usuario Nuevo

1. **Abrir app**: http://localhost:3001
2. **Explorar sin cuenta**: Crear algunas canciones
3. **Crear cuenta**: Clic en "Iniciar Sesión" → "Regístrate"
4. **Completar formulario**:
   - Nombre: Anthony
   - Email: anthony@gmail.com
   - Contraseña: mipassword123
5. **Crear cuenta**: Clic en "Crear Cuenta"
6. **Verificar sincronización**: Las canciones locales se suben a la nube
7. **Crear más canciones**: Se guardan automáticamente en la nube
8. **Cerrar sesión**: Clic en avatar → "Cerrar Sesión"
9. **Iniciar sesión de nuevo**: Las canciones siguen ahí

---

## 🆘 Soporte

### Consola del Navegador
Presiona **F12** para ver:
- Errores de autenticación
- Errores de sincronización
- Logs de Supabase

### Verificar Conexión
```javascript
// En la consola del navegador
localStorage.getItem('supabase.auth.token')
// Si devuelve algo, estás autenticado
```

### Limpiar Datos Locales
```javascript
// En la consola del navegador
localStorage.clear()
// Recarga la página
```

---

## ✅ Checklist de Prueba

- [ ] Abrir app en http://localhost:3001
- [ ] Ver botón "Iniciar Sesión" en navbar
- [ ] Hacer clic y ver modal
- [ ] Ir a "Regístrate"
- [ ] Crear cuenta con email y contraseña
- [ ] Ver avatar en navbar
- [ ] Crear una canción
- [ ] Cerrar sesión
- [ ] Iniciar sesión de nuevo
- [ ] Verificar que la canción sigue ahí
- [ ] Hacer clic en avatar y ver menú
- [ ] Cerrar sesión

---

**¡Listo! Ya sabes cómo usar el sistema de autenticación de Perfect Sound! 🎉**
