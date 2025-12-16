import React from 'react';
import { motion } from 'framer-motion';

const TrainerCard = ({ trainer }) => {
  return (
    <motion.div
      className="class-card"
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 260 }}
    >
      {/* Header (image + status) */}
      <div className="class-card-header">
        <div className="trainer-image-wrapper">
          <img src={trainer.image} alt={trainer.name} className="trainer-image" />
        </div>
        <div className="class-card-status" title="Available"></div>
      </div>

      {/* Body */}
      <div className="class-card-body">
        <h3 className="class-card-title">{trainer.name}</h3>
        <p className="class-card-instructor">{trainer.role}</p>
      </div>

      {/* Footer: social icons */}
      <div className="class-card-footer">
        <div className="trainer-social flex items-center gap-3">
          <a href={trainer.social?.facebook || '#'} className="trainer-social-link" aria-label="facebook"> 
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 5 3.66 9.12 8.44 9.88v-6.99H8.9v-2.89h1.54V9.41c0-1.52.9-2.36 2.28-2.36.66 0 1.35.12 1.35.12v1.49h-.76c-.75 0-.98.47-.98.95v1.14h1.67l-.27 2.89h-1.4v6.99C18.34 21.12 22 17 22 12z"/></svg>
          </a>
          <a href={trainer.social?.instagram || '#'} className="trainer-social-link" aria-label="instagram">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3h10zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z"/></svg>
          </a>
          <a href={trainer.social?.x || '#'} className="trainer-social-link" aria-label="x">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.2 4.2 0 001.85-2.33 8.3 8.3 0 01-2.64 1.01 4.15 4.15 0 00-7.07 3.78A11.8 11.8 0 013 5.15a4.15 4.15 0 001.28 5.54 4.1 4.1 0 01-1.88-.52v.05a4.16 4.16 0 003.33 4.08c-.4.11-.83.17-1.27.17-.31 0-.62-.03-.92-.09a4.17 4.17 0 003.88 2.89A8.34 8.34 0 012 19.54 11.75 11.75 0 008.29 21c7.55 0 11.68-6.26 11.68-11.68 0-.18 0-.35-.01-.53A8.36 8.36 0 0022.46 6z"/></svg>
          </a>
          <a href={trainer.social?.linkedin || '#'} className="trainer-social-link" aria-label="linkedin">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4v12h-4V8zm7 0h3.6v1.71h.05c.5-.95 1.72-1.95 3.54-1.95 3.78 0 4.48 2.49 4.48 5.74V20h-4v-5.02c0-1.2-.02-2.74-1.67-2.74-1.67 0-1.93 1.31-1.93 2.66V20H7.5V8z"/></svg>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default TrainerCard;
