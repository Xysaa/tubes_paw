import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/authContext';
import { motion } from 'framer-motion';

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

  // Framer Motion variants
  const navbarVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
      },
    }),
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.2 },
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: { duration: 0.15 },
    },
  };

  return (
    <motion.nav
      className="navbar"
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="navbar-container">
        <div className="navbar-content">
          
          {/* Logo dengan Icon */}
<<<<<<< Updated upstream
<<<<<<< Updated upstream
          <motion.button 
            onClick={() => scrollToSection('home')}
            className="navbar-logo"
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.02 }}
=======
          <motion.button
            onClick={() => scrollToSection('home')}
            className="navbar-logo"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
>>>>>>> Stashed changes
=======
          <motion.button
            onClick={() => scrollToSection('home')}
            className="navbar-logo"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
>>>>>>> Stashed changes
          >
            <motion.img
              src="/images/1.png"
              alt="HexaFit Logo"
              className="w-8 h-8 mr-2"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
            />
            Hexa<span className="navbar-logo-accent">Fit</span>
          </motion.button>

          {/* Menu Desktop */}
          <div className="navbar-menu">
            <div className="navbar-menu-list">
              {/* Home */}
              <motion.button
                onClick={() => scrollToSection('home')}
                className="navbar-link"
                custom={0}
                variants={menuItemVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ color: '#39ff14', scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                Home
<<<<<<< Updated upstream
<<<<<<< Updated upstream
              </button>
              
=======
              </motion.button>

              {/* About */}
              <motion.button
                onClick={() => scrollToSection('about')}
                className="navbar-link"
                custom={1}
                variants={menuItemVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ color: '#39ff14', scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                About
              </motion.button>

>>>>>>> Stashed changes
              {/* Dashboard - Show if logged in */}
              {isAuthenticated && (
                <motion.div
                  custom={2}
                  variants={menuItemVariants}
                  initial="hidden"
                  animate="visible"
                >
<<<<<<< Updated upstream
                  Dashboard
                </Link>
              )}
=======
              </motion.button>
>>>>>>> Stashed changes

              {/* About */}
              <motion.button
                onClick={() => scrollToSection('about')}
                className="navbar-link"
                custom={1}
                variants={menuItemVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ color: '#39ff14', scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                About
<<<<<<< Updated upstream
              </button>
              
              {/* Classes - Show if logged in */}
              {isAuthenticated && (
                <Link 
                  to={user?.role === 'trainer' ? '/trainer/classes' : '/member/classes'} 
                  className="navbar-link"
                >
                  Classes
                </Link>
              )}

=======
                  <Link
                    to={user?.role === 'trainer' ? '/trainer/dashboard' : '/member/dashboard'}
                    className="navbar-link"
                  >
                    Dashboard
=======
              </motion.button>

              {/* Dashboard - Show if logged in */}
              {isAuthenticated && (
                <motion.div
                  custom={2}
                  variants={menuItemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Link
                    to={user?.role === 'trainer' ? '/trainer/dashboard' : '/member/dashboard'}
                    className="navbar-link"
                  >
                    Dashboard
                  </Link>
                </motion.div>
              )}

              {/* Classes - Show if logged in */}
              {isAuthenticated && (
                <motion.div
                  custom={3}
                  variants={menuItemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Link
                    to={user?.role === 'trainer' ? '/trainer/classes' : '/member/classes'}
                    className="navbar-link"
                  >
                    Classes
                  </Link>
                </motion.div>
              )}

              {/* Memberships - Show if logged in */}
              {isAuthenticated && (
                <motion.div
                  custom={4}
                  variants={menuItemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Link
                    to={user?.role === 'trainer' ? '/trainer/memberships' : '/member/memberships'}
                    className="navbar-link"
                  >
                    Memberships
>>>>>>> Stashed changes
                  </Link>
                </motion.div>
              )}

              {/* Classes - Show if logged in */}
              {isAuthenticated && (
                <motion.div
                  custom={3}
                  variants={menuItemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Link
                    to={user?.role === 'trainer' ? '/trainer/classes' : '/member/classes'}
                    className="navbar-link"
                  >
                    Classes
                  </Link>
                </motion.div>
              )}

              {/* Memberships - Show if logged in */}
              {isAuthenticated && (
                <motion.div
                  custom={4}
                  variants={menuItemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Link
                    to={user?.role === 'trainer' ? '/trainer/memberships' : '/member/memberships'}
                    className="navbar-link"
                  >
                    Memberships
                  </Link>
                </motion.div>
              )}

>>>>>>> Stashed changes
              {/* Contact */}
              <motion.button
                onClick={() => scrollToSection('contact')}
                className="navbar-link"
                custom={isAuthenticated ? 5 : 2}
                variants={menuItemVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ color: '#39ff14', scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                Contact
              </motion.button>

              {/* Login / User Menu */}
              {!isAuthenticated ? (
                <motion.button
                  onClick={() => navigate('/login')}
                  className="navbar-btn-login"
                  custom={isAuthenticated ? 6 : 3}
                  variants={menuItemVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(57, 255, 20, 0.5)' }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  LOGIN
                </motion.button>
              ) : (
                <motion.div
                  className="navbar-user-menu"
                  custom={isAuthenticated ? 6 : 3}
                  variants={menuItemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="navbar-user-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="navbar-user-avatar"
                      animate={{ scale: showUserMenu ? 1.1 : 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {user?.name?.charAt(0).toUpperCase()}
                    </motion.div>
                    <span className="navbar-user-name">{user?.name}</span>
                    <motion.svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      animate={{ rotate: showUserMenu ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </motion.svg>
                  </motion.button>

                  {/* Dropdown Menu */}
                  {showUserMenu && (
<<<<<<< Updated upstream
<<<<<<< Updated upstream
                    <motion.div className="navbar-user-dropdown" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.12 }}>
=======
=======
>>>>>>> Stashed changes
                    <motion.div
                      className="navbar-user-dropdown"
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
                      <div className="navbar-dropdown-header">
                        <p className="navbar-dropdown-label">Role</p>
                        <motion.p
                          className="navbar-dropdown-role"
                          animate={{ color: '#39ff14' }}
                          transition={{ duration: 0.3 }}
                        >
                          {user?.role}
                        </motion.p>
                      </div>

                      <motion.div
                        whileHover={{ backgroundColor: 'rgba(57, 255, 20, 0.1)' }}
                        transition={{ duration: 0.2 }}
                      >
                        <Link
                          to={user?.role === 'trainer' ? '/trainer/dashboard' : '/member/dashboard'}
                          onClick={() => setShowUserMenu(false)}
                          className="navbar-dropdown-link"
                        >
                          <svg
                            className="w-4 h-4 inline mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            ></path>
                          </svg>
                          Dashboard
                        </Link>
                      </motion.div>

                      <motion.div
                        whileHover={{ backgroundColor: 'rgba(255, 59, 48, 0.1)' }}
                        transition={{ duration: 0.2 }}
                      >
<<<<<<< Updated upstream
<<<<<<< Updated upstream
                        <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                        </svg>
                        Logout
                      </button>
=======
=======
>>>>>>> Stashed changes
                        <button
                          onClick={handleLogout}
                          className="navbar-dropdown-logout"
                        >
                          <svg
                            className="w-4 h-4 inline mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            ></path>
                          </svg>
                          Logout
                        </button>
                      </motion.div>
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
                    </motion.div>
                  )}
                </motion.div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <motion.div
            className="md:hidden"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <button className="text-white">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;