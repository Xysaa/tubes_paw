import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-gym-black border-b border-gray-800 sticky top-0 z-50 shadow-lg shadow-green-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo - Klik balik ke Home */}
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <span className="text-2xl font-black italic tracking-wider text-white">
              Hexa<span className="text-gym-green">Fit</span>
            </span>
          </div>

          {/* Menu Desktop */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              <Link to="/" className="text-white hover:text-gym-green px-3 py-2 text-sm font-bold transition uppercase">
                Home
              </Link>
              <a href="#classes" className="text-gym-green px-3 py-2 text-sm font-bold transition uppercase border-b-2 border-gym-green">
                Classes
              </a>
              <Link to="#" className="text-white hover:text-gym-green px-3 py-2 text-sm font-bold transition uppercase">
                Plans
              </Link>
              
              {/*  TOMBOL LOGIN - Navigasi ke /login */}
              <button 
                onClick={() => navigate('/login')}
                className="bg-transparent border-2 border-gym-green text-gym-green hover:bg-gym-green hover:text-black px-6 py-2 rounded-full text-sm font-extrabold transition-all duration-300 transform hover:scale-105"
              >
                LOGIN
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;