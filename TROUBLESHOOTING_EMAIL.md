# Solución de Problemas - Emails de Confirmación

## Problema: No llegan los correos de confirmación

### Causas comunes y soluciones

#### 1. Verificar configuración de Email Provider

**Pasos:**
1. Ve a tu dashboard de Supabase: https://supabase.com/dashboard
2. Selecciona tu proyecto: **Perfect Sound**
3. Ve a **Authentication** → **Providers**
4. Busca **Email** en la lista
5. Verifica que esté **habilitado** (toggle en verde)

**Configuración recomendada:**
- ✅ Enable Email provider: **ON**
- ⚠️ Confirm email: **OFF** (para desarrollo) o **ON** (para producción)
- ✅ Secure email change: **ON**

#### 2. Verificar URL Configuration

**Pasos:**
1. Ve a **Authentication** → **URL Configuration**
2. Configura:

```
Site URL: https://perfect-sounds.vercel.app

Redirect URLs:
- https://perfect-sounds.vercel.app/**
- http://localhost:3001/**
```

3. Haz clic en **Save**

#### 3. Revisar Email Templates

**Pasos:**
1. Ve a **Authentication** → **Email Templates**
2. Selecciona **Confirm signup**
3. Verifica que el template contenga: `{{ .ConfirmationURL }}`
4. Si editaste el template y no funciona, haz clic en **Reset to default**

**Template por defecto:**
```html
<h2>Confirm your signup</h2>

<p>Follow this link to confirm your user:</p>
<p><a href="{{ .ConfirmationURL }}">Confirm your mail</a></p>
```

#### 4. Verificar Rate Limits

Supabase tiene límites de emails por hora para prevenir spam.

**Pasos:**
1. Ve a **Authentication** → **Rate Limits**
2. Verifica los límites actuales
3. Si alcanzaste el límite, espera 1 hora o aumenta los límites

**Límites por defecto:**
- Email sends: 4 por hora por IP
- Si necesitas más, aumenta el límite

#### 5. Revisar Logs

**Pasos:**
1. Ve a **Authentication** → **Logs**
2. Busca eventos recientes de tipo "signup"
3. Verifica si hay errores relacionados con emails
4. Busca mensajes como:
   - ✅ "Email sent successfully"
   - ❌ "Failed to send email"
   - ❌ "Rate limit exceeded"

#### 6. Verificar SMTP Settings

**Pasos:**
1. Ve a **Settings** → **Auth**
2. Busca la sección **SMTP Settings**
3. Verifica la configuración:

**Opción 1: Usar Supabase SMTP (Recomendado para empezar)**
- Selecciona "Use Supabase SMTP"
- No requiere configuración adicional

**Opción 2: SMTP Personalizado**
- Solo si configuraste un servidor SMTP propio
- Verifica host, puerto, usuario y contraseña

#### 7. Revisar carpeta de Spam

Los emails de Supabase a veces llegan a spam:

1. Revisa tu carpeta de **Spam** o **Correo no deseado**
2. Busca emails de: `noreply@mail.app.supabase.io`
3. Marca como "No es spam" si lo encuentras

#### 8. Probar con otro email

A veces ciertos proveedores de email bloquean emails automáticos:

**Proveedores recomendados para pruebas:**
- ✅ Gmail
- ✅ Outlook/Hotmail
- ⚠️ Yahoo (a veces bloquea)
- ⚠️ Dominios corporativos (pueden tener filtros estrictos)

#### 9. Desactivar confirmación temporalmente (Solo desarrollo)

Si necesitas probar la app sin esperar confirmación:

**Pasos:**
1. Ve a **Authentication** → **Providers** → **Email**
2. Desactiva **Confirm email**
3. Guarda los cambios
4. Ahora las cuentas se crearán sin necesidad de confirmar
5. ⚠️ **IMPORTANTE**: Reactiva esto antes de ir a producción

#### 10. Verificar en la consola del navegador

**Pasos:**
1. Abre la consola del navegador (F12)
2. Ve a la pestaña **Console**
3. Intenta crear una cuenta
4. Busca mensajes de log:
   - `Signup successful:` - Muestra si el usuario se creó
   - `confirmed:` - Muestra si el email está confirmado
   - Errores en rojo

### Solución rápida para desarrollo

Si solo quieres probar la app sin emails:

1. **Desactiva confirmación de email** en Supabase
2. Las cuentas se crearán instantáneamente
3. Podrás iniciar sesión de inmediato

### Solución para producción

1. **Mantén confirmación de email activada**
2. Configura correctamente las URLs
3. Personaliza los templates en español
4. Prueba con varios proveedores de email
5. Considera configurar SMTP personalizado para mejor deliverability

### Verificar que el código está actualizado

El código ya incluye:
- ✅ Mejor manejo de errores
- ✅ Logs para debugging
- ✅ Mensaje claro al usuario
- ✅ Redirect URL configurada

Para aplicar los cambios:

```bash
# En desarrollo local
npm start

# En producción (Vercel)
git add .
git commit -m "Mejorar manejo de confirmación de email"
git push
```

### Contactar soporte de Supabase

Si nada funciona:

1. Ve a https://supabase.com/dashboard/support
2. Describe el problema:
   - "Los emails de confirmación no llegan"
   - Incluye tu Project ID: `xymkqhnspyrkntpxgtkx`
   - Menciona que revisaste logs y configuración
3. El soporte suele responder en 24-48 horas

### Alternativa: Magic Link

Si los emails de confirmación no funcionan, puedes usar Magic Links:

1. Ve a **Authentication** → **Providers** → **Email**
2. Activa **Enable Magic Link**
3. Los usuarios podrán iniciar sesión sin contraseña
4. Recibirán un link por email para acceder

## Checklist de verificación

- [ ] Email provider está habilitado
- [ ] Site URL está configurada correctamente
- [ ] Redirect URLs incluyen tu dominio
- [ ] Email template tiene {{ .ConfirmationURL }}
- [ ] No has excedido rate limits
- [ ] Revisaste logs en Supabase
- [ ] SMTP está configurado (Supabase SMTP o personalizado)
- [ ] Revisaste carpeta de spam
- [ ] Probaste con diferentes emails
- [ ] Consola del navegador no muestra errores

## Estado actual

✅ Código actualizado con mejor manejo de confirmación
✅ Mensajes más claros al usuario
✅ Logs para debugging
✅ Redirect URL configurada

⚠️ Pendiente: Verificar configuración en Supabase Dashboard

