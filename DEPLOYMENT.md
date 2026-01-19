# Guía de Deployment en Vercel

## Opción 1: Deploy desde GitHub (Recomendado)

1. **Sube tu código a GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/tu-usuario/perfect-sound.git
   git push -u origin main
   ```

2. **Conecta con Vercel**
   - Ve a [vercel.com](https://vercel.com)
   - Haz clic en "New Project"
   - Importa tu repositorio de GitHub
   - Vercel detectará automáticamente que es un proyecto React
   - Haz clic en "Deploy"

3. **Configuración automática**
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`

## Opción 2: Deploy con Vercel CLI

1. **Instala Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login en Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   # Deploy en preview
   vercel
   
   # Deploy en producción
   vercel --prod
   ```

## Configuración del Proyecto

El proyecto ya incluye:
- ✅ `vercel.json` - Configuración de Vercel
- ✅ `.vercelignore` - Archivos a ignorar
- ✅ `.gitignore` - Archivos a ignorar en Git
- ✅ `.env.production` - Variables de entorno para producción

## Variables de Entorno

No se requieren variables de entorno adicionales. La app usa localStorage para persistencia.

## Dominios Personalizados

Después del deploy, puedes agregar un dominio personalizado:
1. Ve a tu proyecto en Vercel Dashboard
2. Settings → Domains
3. Agrega tu dominio personalizado

## Actualizaciones Automáticas

Una vez conectado con GitHub:
- Cada push a `main` desplegará automáticamente a producción
- Los pull requests crearán previews automáticos

## Verificación del Build

Antes de hacer deploy, verifica que el build funcione localmente:

```bash
npm run build
npx serve -s build
```

Abre http://localhost:3000 para verificar.

## Troubleshooting

### Error: "Module not found"
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Error de rutas en producción
El archivo `vercel.json` ya incluye la configuración de rewrites para React Router.

### Build muy lento
El archivo `.env.production` ya optimiza el build deshabilitando source maps.

## Monitoreo

Vercel proporciona:
- Analytics automáticos
- Logs en tiempo real
- Métricas de rendimiento
- Alertas de errores

Accede desde: Dashboard → Tu Proyecto → Analytics
