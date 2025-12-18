import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const accentVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, delay: 0.3 },
    },
  };

  return (
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    <motion.section
      className="hero-section"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="hero-gradient"></div>
=======
=======
>>>>>>> Stashed changes
    <motion.div
      className="hero-section relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        backgroundImage: 'url(/images/gym.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>

      <motion.div
        className="hero-gradient"
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ repeat: Infinity, duration: 4 }}
      />
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
      
      <motion.div
        className="hero-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h1
            className="hero-title"
            variants={titleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            NO PAIN <br />
            <motion.span
              className="hero-title-accent"
              variants={accentVariants}
              initial="hidden"
              animate={{
                x: 0,
                opacity: 1,
                textShadow: ['0 0 10px rgba(57, 255, 20, 0.3)', '0 0 20px rgba(57, 255, 20, 0.6)', '0 0 10px rgba(57, 255, 20, 0.3)']
              }}
              transition={{ 
                x: { duration: 0.8, delay: 0.3 },
                opacity: { duration: 0.8, delay: 0.3 },
                textShadow: { repeat: Infinity, duration: 2.5 }
              }}
            >
              NO GAIN
            </motion.span>
          </motion.h1>

          <motion.p
            className="hero-description"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            Bergabunglah dengan komunitas kebugaran terbaik. Fasilitas lengkap, pelatih ahli, dan lingkungan yang mendukung transformasi Anda.
<<<<<<< Updated upstream
<<<<<<< Updated upstream
          </p>
          <div className="hero-buttons">
            {/*  TOMBOL DAFTAR - Navigasi ke /register */}
            <motion.button 
              onClick={() => navigate('/register')}
              className="hero-btn-primary"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              DAFTAR SEKARANG
            </motion.button>
            
            {/*  TOMBOL LIHAT JADWAL - Scroll ke #classes */}
            <motion.button 
              onClick={() => document.getElementById('classes')?.scrollIntoView({ behavior: 'smooth' })}
              className="hero-btn-secondary"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              LIHAT JADWAL
            </motion.button>
          </div>
        </div>
      </div>
    </motion.section>
=======
          </motion.p>

          <motion.div
            className="hero-buttons"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.button
              onClick={() => navigate('/register')}
              className="hero-btn-primary"
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 25px rgba(57, 255, 20, 0.7)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              DAFTAR SEKARANG
            </motion.button>

            <motion.button
              onClick={() => document.getElementById('classes')?.scrollIntoView({ behavior: 'smooth' })}
              className="hero-btn-secondary"
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                borderColor: '#39ff14',
              }}
              whileTap={{ scale: 0.95 }}
            >
              LIHAT JADWAL
            </motion.button>
=======
          </motion.p>

          <motion.div
            className="hero-buttons"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.button
              onClick={() => navigate('/register')}
              className="hero-btn-primary"
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 25px rgba(57, 255, 20, 0.7)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              DAFTAR SEKARANG
            </motion.button>

            <motion.button
              onClick={() => document.getElementById('classes')?.scrollIntoView({ behavior: 'smooth' })}
              className="hero-btn-secondary"
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                borderColor: '#39ff14',
              }}
              whileTap={{ scale: 0.95 }}
            >
              LIHAT JADWAL
            </motion.button>
>>>>>>> Stashed changes
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
  );
};

export default Hero;