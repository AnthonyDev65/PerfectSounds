# Configuración de GitHub

## Paso 1: Inicializar Git

```bash
git init
git add .
git commit -m "Initial commit: Perfect Sound v1.0.0"
```

## Paso 2: Crear Repositorio en GitHub

1. Ve a [github.com/new](https://github.com/new)
2. Nombre del repositorio: `perfect-sound`
3. Descripción: "Aplicación web interactiva para explorar escalas musicales y crear progresiones de acordes"
4. Público o Privado (tu elección)
5. **NO** inicialices con README, .gitignore o licencia (ya los tenemos)
6. Haz clic en "Create repository"

## Paso 3: Conectar con GitHub

```bash
git remote add origin https://github.com/TU-USUARIO/perfect-sound.git
git branch -M main
git push -u origin main
```

## Paso 4: Configurar GitHub Actions (Opcional)

Para habilitar el deploy automático a Vercel:

1. Ve a tu proyecto en Vercel
2. Settings → General → Project ID (copia el ID)
3. Ve a tu cuenta de Vercel → Settings → Tokens
4. Crea un nuevo token y cópialo
5. En GitHub, ve a tu repositorio → Settings → Secrets and variables → Actions
6. Agrega estos secrets:
   - `VERCEL_TOKEN`: Tu token de Vercel
   - `VERCEL_ORG_ID`: Tu Organization ID de Vercel
   - `VERCEL_PROJECT_ID`: El Project ID que copiaste

Ahora cada push a `main` desplegará automáticamente a Vercel.

## Paso 5: Configurar Branch Protection (Recomendado)

1. Settings → Branches → Add rule
2. Branch name pattern: `main`
3. Habilita:
   - ✅ Require a pull request before merging
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging

## Paso 6: Agregar Topics

En la página principal del repositorio:
1. Haz clic en el ⚙️ junto a "About"
2. Agrega topics: `react`, `typescript`, `music`, `music-theory`, `chords`, `scales`, `metronome`, `progressive-web-app`

## Paso 7: Personalizar README

Actualiza estos campos en `README.md`:
- `[Ver Demo](https://tu-proyecto.vercel.app)` → Tu URL de Vercel
- `https://github.com/tu-usuario/perfect-sound` → Tu URL de GitHub
- Agrega screenshots en la sección correspondiente
- Actualiza la información del autor

## Paso 8: Crear Primera Release

```bash
git tag -a v1.0.0 -m "Release v1.0.0: Initial release"
git push origin v1.0.0
```

En GitHub:
1. Releases → Create a new release
2. Tag: v1.0.0
3. Title: "Perfect Sound v1.0.0"
4. Descripción:
   ```markdown
   ## 🎉 Primera Release de Perfect Sound
   
   ### Características
   - ✨ Exploración de escalas musicales
   - 🎹 Progresiones de acordes personalizadas
   - 🎼 Editor avanzado con secciones
   - ⏱️ Metrónomo integrado
   - 📱 Diseño responsivo
   
   ### Instalación
   Ver [README.md](README.md) para instrucciones
   ```

## Comandos Útiles

```bash
# Ver estado
git status

# Crear nueva rama
git checkout -b feature/nueva-funcionalidad

# Actualizar desde main
git pull origin main

# Push de cambios
git add .
git commit -m "feat: descripción del cambio"
git push origin nombre-rama

# Ver ramas
git branch -a

# Cambiar de rama
git checkout nombre-rama

# Eliminar rama local
git branch -d nombre-rama

# Ver historial
git log --oneline --graph
```

## Estructura de Commits

Usa conventional commits:
- `feat:` Nueva funcionalidad
- `fix:` Corrección de bugs
- `docs:` Cambios en documentación
- `style:` Formato (no afecta código)
- `refactor:` Refactorización
- `test:` Tests
- `chore:` Mantenimiento

Ejemplos:
```bash
git commit -m "feat: add chord transposition feature"
git commit -m "fix: resolve metronome timing issue"
git commit -m "docs: update installation instructions"
```

## Badges para README

Agrega estos badges personalizados:

```markdown
![Build Status](https://github.com/TU-USUARIO/perfect-sound/workflows/Deploy%20to%20Vercel/badge.svg)
![Vercel](https://vercelbadge.vercel.app/api/TU-USUARIO/perfect-sound)
```

## Próximos Pasos

1. ✅ Sube el código a GitHub
2. ✅ Conecta con Vercel
3. ✅ Configura GitHub Actions
4. ✅ Agrega screenshots al README
5. ✅ Crea la primera release
6. 📢 Comparte tu proyecto!

## Recursos

- [GitHub Docs](https://docs.github.com)
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
