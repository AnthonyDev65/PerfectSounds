import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';
import UserIcon from './icons/UserIcon';
import './UserProfile.css';

const UserProfile: React.FC = () => {
  const { user, signOut } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    setShowMenu(false);
  };

  if (!user) {
    return (
      <>
        <button className="user-profile-btn signin" onClick={() => setShowAuthModal(true)}>
          <UserIcon className="user-icon" />
          <span className="user-text">Iniciar Sesión</span>
        </button>
        {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
      </>
    );
  }

  const getInitials = () => {
    const name = user.user_metadata?.full_name || user.email || '';
    return name.charAt(0).toUpperCase();
  };

  return (
    <>
      <div className="user-profile">
        <button 
          className="user-avatar" 
          onClick={() => setShowMenu(!showMenu)}
        >
          {getInitials()}
        </button>

        {showMenu && (
          <>
            <div className="menu-backdrop" onClick={() => setShowMenu(false)} />
            <div className="user-menu">
              <div className="user-menu-header">
                <div className="user-avatar-large">{getInitials()}</div>
                <div className="user-info">
                  <div className="user-name">
                    {user.user_metadata?.full_name || 'Usuario'}
                  </div>
                  <div className="user-email">{user.email}</div>
                </div>
              </div>
              
              <div className="user-menu-divider" />
              
              <button className="user-menu-item" onClick={handleSignOut}>
                <i className="ri-logout-box-line"></i>
                Cerrar Sesión
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default UserProfile;
