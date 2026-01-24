import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './AuthModal.css';

interface AuthModalProps {
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  const { signIn, signUp, resetPassword } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup' | 'reset'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      if (mode === 'signin') {
        const { error } = await signIn(email, password);
        if (error) {
          setError(error.message || 'Error al iniciar sesión');
        } else {
          onClose();
        }
      } else if (mode === 'signup') {
        const { error } = await signUp(email, password, fullName);
        if (error) {
          setError(error.message || 'Error al crear cuenta');
        } else {
          setMessage('¡Cuenta creada! Revisa tu email para confirmar.');
        }
      } else if (mode === 'reset') {
        const { error } = await resetPassword(email);
        if (error) {
          setError(error.message || 'Error al enviar email');
        } else {
          setMessage('Email enviado. Revisa tu bandeja de entrada.');
        }
      }
    } catch (err: any) {
      setError(err.message || 'Error inesperado');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-modal-backdrop" onClick={onClose}>
      <div className="auth-modal-content" onClick={e => e.stopPropagation()}>
        <button className="auth-close-btn" onClick={onClose}>
          <i className="ri-close-line"></i>
        </button>

        <div className="auth-header">
          <h2>
            {mode === 'signin' && 'Iniciar Sesión'}
            {mode === 'signup' && 'Crear Cuenta'}
            {mode === 'reset' && 'Recuperar Contraseña'}
          </h2>
          <p>Guarda tus canciones en la nube</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {mode === 'signup' && (
            <div className="form-field">
              <label>Nombre completo</label>
              <input
                type="text"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                placeholder="Tu nombre"
              />
            </div>
          )}

          <div className="form-field">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
            />
          </div>

          {mode !== 'reset' && (
            <div className="form-field">
              <label>Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>
          )}

          {error && <div className="auth-error">{error}</div>}
          {message && <div className="auth-message">{message}</div>}

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? (
              <i className="ri-loader-4-line rotating"></i>
            ) : (
              <>
                {mode === 'signin' && 'Iniciar Sesión'}
                {mode === 'signup' && 'Crear Cuenta'}
                {mode === 'reset' && 'Enviar Email'}
              </>
            )}
          </button>
        </form>

        <div className="auth-footer">
          {mode === 'signin' && (
            <>
              <button onClick={() => setMode('reset')} className="auth-link">
                ¿Olvidaste tu contraseña?
              </button>
              <button onClick={() => setMode('signup')} className="auth-link">
                ¿No tienes cuenta? <strong>Regístrate</strong>
              </button>
            </>
          )}
          {mode === 'signup' && (
            <button onClick={() => setMode('signin')} className="auth-link">
              ¿Ya tienes cuenta? <strong>Inicia sesión</strong>
            </button>
          )}
          {mode === 'reset' && (
            <button onClick={() => setMode('signin')} className="auth-link">
              Volver a <strong>Iniciar sesión</strong>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
