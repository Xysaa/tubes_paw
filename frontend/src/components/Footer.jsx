import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    <motion.footer className="footer" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }}>
      <div className="footer-container">
        <p>&copy; 2025 HexaFit System.</p>
      </div>
=======
=======
>>>>>>> Stashed changes
    <motion.footer
      className="footer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <motion.div
        className="footer-container"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.5 } },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.p
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          &copy; 2025 <motion.span
            className="text-gym-green font-bold"
            whileHover={{ letterSpacing: '0.05em' }}
          >
            HexaFit System
          </motion.span>.
        </motion.p>
      </motion.div>
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    </motion.footer>
  );
};

export default Footer;