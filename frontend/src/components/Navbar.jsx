import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  // Helper function untuk smooth scroll ke section
  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          
          {/* Logo dengan Icon */}
          <button 
            onClick={() => scrollToSection('home')}
            className="navbar-logo"
          >
            {/* OPSI 1: SVG Icon Dumbbell Inline */}
            {/* <svg 
              className="w-8 h-8 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              style={{ color: '#39ff14' }}
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M3 5h2M3 19h2m14-14h2m-2 14h2M7 5a2 2 0 012-2h6a2 2 0 012 2v14a2 2 0 01-2 2H9a2 2 0 01-2-2V5z"
              />
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M9 10h6M9 14h6"
              />
            </svg> */}

            {/* OPSI 2: Jika pakai gambar PNG/SVG dari file */}
            {<img 
              src="/images/1.png" 
              alt="HexaFit Logo" 
              className="w-8 h-8 mr-2"
            />}

            Hexa<span className="navbar-logo-accent">Fit</span>
          </button>

          {/* Menu Desktop */}
          <div className="navbar-menu">
            <div className="navbar-menu-list">
              {/* Home */}
              <button 
                onClick={() => scrollToSection('home')}
                className="navbar-link"
              >
                Home
              </button>

              {/* About */}
              <button 
                onClick={() => scrollToSection('about')}
                className="navbar-link"
              >
                About
              </button>
              
              {/* Dashboard - Show if logged in */}
              {isAuthenticated && (
                <Link 
                  to={user?.role === 'trainer' ? '/trainer/dashboard' : '/member/dashboard'} 
                  className="navbar-link"
                >
                  Dashboard
                </Link>
              )}
              
              {/* Classes - Show if logged in */}
              {isAuthenticated && (
                <Link 
                  to={user?.role === 'trainer' ? '/trainer/classes' : '/member/classes'} 
                  className="navbar-link"
                >
                  Classes
                </Link>
              )}

              {/* Classes - Show if logged in */}
              {isAuthenticated && (
                <Link 
                  to={user?.role === 'trainer' ? '/trainer/memberships' : '/member/memberships'} 
                  className="navbar-link"
                >
                  Memberships
                </Link>
              )}

              {/* Contact */}
              <button 
                onClick={() => scrollToSection('contact')}
                className="navbar-link"
              >
                Contact
              </button>
              
              {/* Login / User Menu */}
              {!isAuthenticated ? (
                <button 
                  onClick={() => navigate('/login')}
                  className="navbar-btn-login"
                >
                  LOGIN
                </button>
              ) : (
                <div className="navbar-user-menu">
                  <button 
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="navbar-user-btn"
                  >
                    <div className="navbar-user-avatar">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="navbar-user-name">{user?.name}</span>
                    <svg className={`w-4 h-4 text-gray-400 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  {showUserMenu && (
                    <div className="navbar-user-dropdown">
                      <div className="navbar-dropdown-header">
                        <p className="navbar-dropdown-label">Role</p>
                        <p className="navbar-dropdown-role">{user?.role}</p>
                      </div>
                      
                      <Link 
                        to={user?.role === 'trainer' ? '/trainer/dashboard' : '/member/dashboard'}
                        onClick={() => setShowUserMenu(false)}
                        className="navbar-dropdown-link"
                      >
                        <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                        </svg>
                        Dashboard
                      </Link>
                      
                      <button 
                        onClick={handleLogout}
                        className="navbar-dropdown-logout"
                      >
                        <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                        </svg>
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;