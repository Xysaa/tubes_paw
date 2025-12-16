import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="hero-section">
      <div className="hero-gradient"></div>
      
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            NO PAIN <br />
            <span className="hero-title-accent">
              NO GAIN
            </span>
          </h1>
          <p className="hero-description">
            Bergabunglah dengan komunitas kebugaran terbaik. Fasilitas lengkap, pelatih ahli, dan lingkungan yang mendukung transformasi Anda.
          </p>
          <div className="hero-buttons">
            {/*  TOMBOL DAFTAR - Navigasi ke /register */}
            <button 
              onClick={() => navigate('/register')}
              className="hero-btn-primary"
            >
              DAFTAR SEKARANG
            </button>
            
            {/*  TOMBOL LIHAT JADWAL - Scroll ke #classes */}
            <button 
              onClick={() => document.getElementById('classes')?.scrollIntoView({ behavior: 'smooth' })}
              className="hero-btn-secondary"
            >
              LIHAT JADWAL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;