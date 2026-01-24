# Changelog

All notable changes to Perfect Sound will be documented in this file.

## [2.0.0] - 2026-01-23

### 🎉 Major Features Added

#### BPM Editor in Advanced Mode
- Added clickable BPM badge in advanced editor header
- Modal with +/- buttons and direct input
- Quick presets: Slow (60), Moderate (90), Normal (120), Fast (140)
- Range validation: 40-240 BPM
- Real-time playback update

#### Cloud Sync with Supabase
- Full authentication system (email/password)
- User profiles with avatar initials
- Cloud storage for simple songs
- Cloud storage for advanced songs
- Cloud storage for favorites
- Row Level Security (RLS) for data privacy
- Automatic sync when authenticated
- Works offline with localStorage fallback

#### Authentication System
- Sign up with email confirmation
- Sign in with secure password
- Password reset via email
- User profile menu in navbar
- Avatar with user initials
- Responsive auth modal

#### Metronome Sound
- Web Audio API integration
- Accent sound on first beat (1200Hz)
- Normal sound on other beats (800Hz)
- Works in Notes mode
- Works in Advanced mode
- Synchronized with visual pulse

#### Key Transposition
- Transpose entire advanced songs
- All chords in all sections updated
- Maintains structure and timing
- No page reload required
- Automatic save

### 🎨 UI/UX Improvements
- User profile component in navbar
- Clickable badges for key and BPM
- Improved modal designs
- Better mobile responsiveness
- Smooth animations and transitions

### 🔧 Technical Improvements
- Supabase client configuration
- Cloud sync service layer
- Auth context provider
- Better state management
- TypeScript types for database
- SQL schema for Supabase tables

### 📚 Documentation
- `SUPABASE_SETUP.md` - Complete Supabase configuration guide
- `FEATURES.md` - Detailed feature documentation
- `CHANGELOG.md` - Version history
- `.env.example` - Environment variables template
- `supabase-schema.sql` - Database schema
- Updated README with cloud sync info

### 🐛 Bug Fixes
- Fixed playback state management in advanced mode
- Improved useEffect dependencies
- Better error handling in auth flows
- Fixed modal z-index issues

## [1.0.0] - 2026-01-20

### Initial Release

#### Core Features
- Musical scale explorer for all 12 keys
- Diatonic chord visualization
- Favorites system
- Simple song saving
- Advanced song editor with sections
- Drag & drop chord reordering
- Configurable beats per chord
- Section repetitions
- Metronome with visual pulse
- Responsive design (mobile/desktop)
- Desktop sidebar navigation
- localStorage persistence

#### Pages
- Main page (note selection)
- Scales page (chord exploration)
- Songs page (saved progressions)
- Advanced page (structured songs)

#### Components
- NavBar with routing
- DynamicIsland for key display
- ScalesCarousel for chord selection
- SelectedScalesGrid for progression view
- MetronomeControls
- SongsModal for saving
- AdvancedEditor for complex songs

#### Contexts
- ScaleSelectionContext
- FavoritesContext
- SongsContext
- AdvancedSongContext
- MetronomeContext

#### Services
- MusicService for scale/chord logic

---

## Upcoming Features

### Version 2.1.0 (Planned)
- [ ] Export songs to PDF
- [ ] Share songs with public links
- [ ] Dark/Light theme toggle
- [ ] Extended chords (7, 9, 11, 13)
- [ ] Harmonic and melodic minor scales

### Version 2.2.0 (Planned)
- [ ] Audio recording
- [ ] MIDI integration
- [ ] Practice mode with loops
- [ ] Usage statistics
- [ ] Real-time collaboration

### Version 3.0.0 (Future)
- [ ] Mobile apps (iOS/Android)
- [ ] Offline-first architecture
- [ ] Advanced music theory tools
- [ ] Community features
- [ ] Song marketplace

---

## Migration Guides

### Migrating from 1.x to 2.x

#### Local Data
Your existing localStorage data will continue to work. No migration needed.

#### Adding Cloud Sync
1. Follow `SUPABASE_SETUP.md`
2. Create an account in the app
3. Your local data will be uploaded on first sync
4. Future changes sync automatically

#### Environment Variables
Add to your `.env.local`:
```
REACT_APP_SUPABASE_URL=your_url
REACT_APP_SUPABASE_ANON_KEY=your_key
```

---

## Breaking Changes

### Version 2.0.0
- None. Fully backward compatible with 1.x localStorage data.

---

## Contributors

- **Anthony** - Initial work and v2.0 features

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
