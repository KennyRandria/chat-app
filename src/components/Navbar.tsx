import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import Channels from '@/components/Channels';
import Users from '@/components/Users';

const Navbar = () => {
  const router = useRouter();
  const [showChannels, setShowChannels] = useState(false);
  const [showUsers, setShowUsers] = useState(false);

  const handleLoginClick = () => {
    const token = Cookies.get('token');
    
    if (token) {
      router.push('/profile');
    } else {
      router.push('/login');
    }
  };

  const handleProfileClick = () => {
    const token = Cookies.get('token');
    
    if (token) {
      router.push('/profile');
    } else {
      router.push('/login');
    }
  };

  const handleLogout = () => {
    // Supprimer le cookie "token"
    Cookies.remove('token');
    Cookies.remove('recipient');

    // Rediriger vers la page de connexion
    router.push('/login');
  };

  const handleToggleChannels = () => {
    const token = Cookies.get('token');
    
    if (token) {
      setShowChannels(!showChannels);
    } else {
      router.push('/login');
    }
  };

  const handleToggleUsers = () => {
    const token = Cookies.get('token');
    
    if (token) {
      setShowUsers(!showUsers);
    } else {
      router.push('/login');
    }
  };
    
  const handleCreateChannel = () => {
    const token = Cookies.get('token');
    
    if (token) {
      router.push('/channel/create');
    } else {
      router.push('/login');
    }
  };

  const handleSignupClick = () => {
    const token = Cookies.get('token');
    
    if (token) {
      router.push('/profile');
    } else {
      router.push('/sign-up');
    }
  };
  
  return (
    <div className="bg-light">
      <div className="container-fluid p-3 d-flex justify-content-between align-items-center">
        <div>
          <button onClick={handleLoginClick} className="btn btn-outline-primary rounded-pill me-3">Login</button>
          <button onClick={handleSignupClick} className="btn btn-outline-primary rounded-pill me-3">Sign up</button>
          <button onClick={handleProfileClick} className="btn btn-outline-primary rounded-pill me-3">Profile</button>
          <button onClick={handleToggleChannels} className="btn btn-outline-primary rounded-pill me-3">
            {showChannels ? 'Hide Channels' : 'Show Channels'}
          </button>
          {showChannels && <Channels/>}
          <button onClick={handleCreateChannel} className="btn btn-outline-primary rounded-pill me-3">Create Channel</button>
          <button onClick={handleToggleUsers} className="btn btn-outline-primary rounded-pill me-3">
            {showUsers ? 'Hide Users' : 'Show Users'}
          </button>
          {showUsers && <Users/>}
        </div>
        <button onClick={handleLogout} className="btn btn-outline-dark rounded-pill">Déconnexion</button> {/* Bouton de déconnexion */}
      </div>
    </div>
  );
};

export default Navbar;
