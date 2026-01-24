import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ScaleSelectionProvider } from './context/ScaleSelectionContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { SongsProvider } from './context/SongsContext';
import { AdvancedSongProvider } from './context/AdvancedSongContext';
import MainPage from './pages/MainPage';
import ScalesPage from './pages/ScalesPage';
import SongsPage from './pages/SongsPage';
import AdvancedPage from './pages/AdvancedPage';
import NavBar from './components/NavBar';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <AdvancedSongProvider>
        <SongsProvider>
          <FavoritesProvider>
            <ScaleSelectionProvider>
              <Router>
                <div className="App">
                  <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/scales/:note" element={<ScalesPage />} />
                    <Route path="/songs" element={<SongsPage />} />
                    <Route path="/advanced" element={<AdvancedPage />} />
                  </Routes>
                  <NavBar />
                </div>
              </Router>
            </ScaleSelectionProvider>
          </FavoritesProvider>
        </SongsProvider>
      </AdvancedSongProvider>
    </AuthProvider>
  );
}

export default App;