# Configuración de Supabase para Perfect Sound

Esta guía te ayudará a configurar Supabase para habilitar la sincronización en la nube de tus canciones y favoritos.

## 1. Crear Proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com) y crea una cuenta gratuita
2. Haz clic en "New Project"
3. Completa los datos:
   - **Name**: Perfect Sound
   - **Database Password**: Genera una contraseña segura (guárdala)
   - **Region**: Selecciona la más cercana a tu ubicación
4. Haz clic en "Create new project" y espera 1-2 minutos

## 2. Configurar la Base de Datos

1. En tu proyecto de Supabase, ve a **SQL Editor** en el menú lateral
2. Haz clic en "New query"
3. Copia y pega todo el contenido del archivo `supabase-schema.sql`
4. Haz clic en "Run" para ejecutar el script
5. Verifica que se crearon las tablas en **Table Editor**

## 3. Configurar Autenticación

1. Ve a **Authentication** > **Providers** en el menú lateral
2. Asegúrate de que **Email** esté habilitado
3. Configura las opciones:
   - **Enable email confirmations**: Activado (recomendado)
   - **Enable email change confirmations**: Activado
   - **Secure email change**: Activado

### Configurar Email Templates (Opcional)

Ve a **Authentication** > **Email Templates** para personalizar:
- Confirmation email
- Magic Link email
- Change Email Address
- Reset Password

## 4. Obtener las Credenciales

1. Ve a **Settings** > **API** en el menú lateral
2. Copia los siguientes valores:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: Una clave larga que empieza con `eyJ...`

## 5. Configurar Variables de Entorno

### Desarrollo Local

1. Crea un archivo `.env.local` en la raíz del proyecto:

```bash
REACT_APP_SUPABASE_URL=https://tu-proyecto.supabase.co
REACT_APP_SUPABASE_ANON_KEY=tu_anon_key_aqui
```

2. Reinicia el servidor de desarrollo:

```bash
npm start
```

### Producción (Vercel)

1. Ve a tu proyecto en Vercel
2. Settings > Environment Variables
3. Agrega las variables:
   - `REACT_APP_SUPABASE_URL`: Tu Project URL
   - `REACT_APP_SUPABASE_ANON_KEY`: Tu anon public key
4. Redeploy el proyecto

## 6. Verificar la Configuración

1. Abre la aplicación
2. Haz clic en "Iniciar Sesión" en el navbar
3. Crea una cuenta de prueba
4. Verifica que recibes el email de confirmación
5. Crea una canción y verifica que aparece en Supabase:
   - Ve a **Table Editor** > **songs** o **advanced_songs**
   - Deberías ver tu canción guardada

## 7. Políticas de Seguridad (RLS)

Las políticas de Row Level Security (RLS) ya están configuradas en el schema. Esto asegura que:

- Los usuarios solo pueden ver sus propias canciones
- Los usuarios solo pueden editar/eliminar sus propias canciones
- Los usuarios solo pueden ver sus propios favoritos
- Cada usuario tiene su propio perfil privado

## 8. Límites del Plan Gratuito

El plan gratuito de Supabase incluye:

- ✅ 500 MB de almacenamiento en base de datos
- ✅ 1 GB de transferencia de archivos
- ✅ 2 GB de ancho de banda
- ✅ 50,000 usuarios activos mensuales
- ✅ Autenticación ilimitada
- ✅ Row Level Security
- ✅ Backups automáticos (7 días)

Esto es más que suficiente para uso personal y proyectos pequeños.

## 9. Monitoreo

Puedes monitorear el uso de tu proyecto en:

- **Home** > **Usage**: Ver estadísticas de uso
- **Database** > **Logs**: Ver logs de queries
- **Authentication** > **Users**: Ver usuarios registrados

## 10. Backup Manual (Opcional)

Para hacer un backup manual de tu base de datos:

1. Ve a **Database** > **Backups**
2. Haz clic en "Create backup"
3. Espera a que se complete

## Solución de Problemas

### Error: "Invalid API key"

- Verifica que copiaste correctamente el `anon public key`
- Asegúrate de que las variables de entorno están configuradas
- Reinicia el servidor de desarrollo

### Error: "Row Level Security policy violation"

- Verifica que ejecutaste el script SQL completo
- Revisa que las políticas RLS estén habilitadas en cada tabla

### No recibo emails de confirmación

- Verifica la configuración de SMTP en **Settings** > **Auth**
- Revisa la carpeta de spam
- En desarrollo, puedes desactivar la confirmación de email

### Las canciones no se sincronizan

- Verifica que estás autenticado (icono de usuario en navbar)
- Abre la consola del navegador para ver errores
- Verifica que las tablas existen en Supabase

## Recursos Adicionales

- [Documentación de Supabase](https://supabase.com/docs)
- [Guía de Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)

## Soporte

Si tienes problemas con la configuración:

1. Revisa los logs en la consola del navegador
2. Verifica los logs en Supabase Dashboard
3. Consulta la documentación oficial de Supabase
4. Abre un issue en el repositorio de GitHub
