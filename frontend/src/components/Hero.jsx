import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

/* VARIANTS */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="hero-section">
      {/* BACKGROUND — JANGAN DIHAPUS */}
      <div className="hero-gradient"></div>

      <div className="hero-container">
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="hero-title"
            variants={itemVariants}
          >
            NO PAIN <br />
            <span className="hero-title-accent">
              NO GAIN
            </span>
          </motion.h1>

          <motion.p
            className="hero-description"
            variants={itemVariants}
          >
            Bergabunglah dengan komunitas kebugaran terbaik. Fasilitas lengkap,
            pelatih ahli, dan lingkungan yang mendukung transformasi Anda.
          </motion.p>

          <motion.div
            className="hero-buttons"
            variants={itemVariants}
          >
            {/* TOMBOL DAFTAR */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/register')}
              className="hero-btn-primary"
            >
              DAFTAR SEKARANG
            </motion.button>

            {/* TOMBOL JADWAL */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                document
                  .getElementById('classes')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
              className="hero-btn-secondary"
            >
              LIHAT JADWAL
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
