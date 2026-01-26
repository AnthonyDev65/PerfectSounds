# Perfect Sound 🎵

Una aplicación web moderna e interactiva para explorar escalas musicales, crear progresiones de acordes y practicar con un metrónomo integrado.

![Perfect Sound](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/React-18.2.0-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9.0-3178c6)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Características Principales

### 🎹 Notas Básicas
- **Exploración de tonalidades**: Todas las 12 tonalidades mayores y menores
- **Acordes diatónicos**: Visualiza los 7 acordes de cada tonalidad con sus grados (I, II, III, etc.)
- **Sistema de favoritos**: Marca tus tonalidades favoritas para acceso rápido
- **Orden personalizado**: Los acordes se organizan en el orden que los seleccionas
- **Metrónomo visual**: Pulso verde sincronizado con tus progresiones

### 🎼 Notas Avanzadas
- **Secciones personalizadas**: Crea Intro, Verso, Coro, Puente, Outro y más
- **Drag & Drop**: Reordena acordes arrastrándolos
- **Tiempos configurables**: Define cuántos beats dura cada acorde (1-16)
- **Repeticiones**: Configura cuántas veces se repite cada sección
- **Estimación de duración**: Calcula automáticamente la duración de cada sección
- **Colores identificadores**: Cada sección tiene su propio color

### 📚 Gestión de Canciones
- **Guardar progresiones**: Almacena tus progresiones con nombre
- **Organización**: Por tonalidad, BPM y número de secciones
- **Carga rápida**: Recupera tus canciones con un clic
- **Sincronización en la nube**: Guarda tus canciones en Supabase (opcional)
- **Autenticación**: Sistema de cuentas para acceso desde cualquier dispositivo
- **Persistencia local**: Todo se guarda en tu navegador (sin cuenta)

### 🎨 Diseño Responsivo
- **Móviles**: Interfaz optimizada para touch con navbar inferior
- **Tablets**: Layout adaptativo con elementos centrados
- **Desktop**: Sidebar lateral elegante con cards separadas

## 🚀 Demo en Vivo

[Ver Demo](https://perfect-sounds.vercel.app/)


## 🛠️ Tecnologías

- **Frontend**: React 18 con TypeScript
- **Routing**: React Router v6
- **Estado**: Context API
- **Estilos**: CSS Modules con diseño responsivo
- **Persistencia**: LocalStorage
- **Build**: Create React App
- **Deploy**: Vercel

## 📦 Instalación

### Prerrequisitos
- Node.js 16+ 
- npm o yarn

### Pasos

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/AnthonyDev65/PerfectSounds.git
   cd perfect-sound
   ```

2. **Instala dependencias**
   ```bash
   npm install
   ```

3. **Ejecuta en desarrollo**
   ```bash
   npm start
   ```
   Abre [http://localhost:3000](http://localhost:3000)

4. **Build para producción**
   ```bash
   npm run build
   ```

## 📖 Uso

### Notas Básicas
1. Selecciona una tonalidad desde la página de inicio
2. Haz clic en los acordes para agregarlos a tu progresión
3. Usa el metrónomo para practicar
4. Guarda tu progresión como canción

### Notas Avanzadas
1. Ve a la sección "Avanzado"
2. Crea una nueva canción con nombre, tonalidad y BPM
3. Agrega secciones (Intro, Verso, Coro, etc.)
4. Arrastra acordes a cada sección
5. Configura tiempos y repeticiones
6. Usa el playback para escuchar tu estructura

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Por favor lee [CONTRIBUTING.md](CONTRIBUTING.md) para detalles.

### Proceso rápido:
1. Fork el proyecto
2. Crea tu rama (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Roadmap

- [ ] Reproducción de audio real de acordes
- [ ] Exportar/importar canciones (JSON)
- [ ] Modo oscuro/claro
- [ ] Diferentes tipos de acordes (7ª, 9ª, sus, etc.)
- [ ] Círculo de quintas interactivo
- [ ] Integración MIDI
- [ ] Compartir canciones por URL
- [ ] PWA para uso offline

## 🐛 Reportar Bugs

Encontraste un bug? [Abre un issue](https://github.com/AnthonyDev65/PerfectSounds/issues/new?template=bug_report.md)

## 💡 Solicitar Features

Tienes una idea? [Abre un issue](https://github.com/AnthonyDev65/PerfectSounds/issues/new?template=feature_request.md)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver [LICENSE](LICENSE) para detalles.

## 👨‍💻 Autor

**Tu Nombre**
- GitHub: [@AnthoniDev65](https://github.com/AnthonyDev65)

## 🙏 Agradecimientos

- Iconos por [Remix Icon](https://remixicon.com/)
- Inspiración de teoría musical
- Comunidad de React

## 📊 Estado del Proyecto

![GitHub issues](https://img.shields.io/github/issues/AnthonyDev65/PerfectSounds)
![GitHub pull requests](https://img.shields.io/github/issues-pr/AnthonyDev65/PerfectSounds)
![GitHub stars](https://img.shields.io/github/stars/AnthonyDev65/PerfectSounds)
![GitHub forks](https://img.shields.io/github/forks/AnthonyDev65/PerfectSounds)

---

⭐ Si te gusta este proyecto, dale una estrella en GitHub!

🎵 Hecho con ❤️ para músicos y desarrolladores
