import React from 'react';
import { motion } from 'framer-motion';

const ClassCard = ({ cls }) => {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  return (
    <motion.div
      className="class-card"
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
=======
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      className="class-card"
=======
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      className="class-card"
>>>>>>> Stashed changes
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
      transition={{ duration: 0.2 }}
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    >
      {/* Card Header (Schedule) */}
      <motion.div className="class-card-header" variants={childVariants}>
        <motion.div
          className="class-card-schedule"
          whileHover={{ scale: 1.05 }}
        >
          {/* Icon Clock */}
          <motion.svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </motion.svg>
          <span>{cls.schedule}</span>
        </motion.div>
        <motion.div
          className="class-card-status"
          title="Live / Available"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        ></motion.div>
      </motion.div>

      {/* Card Body */}
      <motion.div className="class-card-body" variants={childVariants}>
        <motion.h3 className="class-card-title" variants={childVariants}>
          {cls.name}
        </motion.h3>
        <motion.p className="class-card-instructor" variants={childVariants}>
          Instructor: <span>{cls.instructor}</span>
        </motion.p>
        <motion.p className="class-card-description" variants={childVariants}>
          {cls.description ||
            "Deskripsi kelas belum tersedia. Hubungi admin untuk detail lebih lanjut."}
        </motion.p>
      </motion.div>

      {/* Card Footer (Button) */}
<<<<<<< Updated upstream
<<<<<<< Updated upstream
      <div className="class-card-footer">
        <motion.button className="class-card-button" whileHover={{ x: 6 }} whileTap={{ scale: 0.98 }}>
          BOOKING SLOT
          {/* Icon Arrow */}
          <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
          </svg>
        </motion.button>
      </div>
=======
      <motion.div className="class-card-footer" variants={childVariants}>
        <motion.button
          className="class-card-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          BOOKING SLOT
          {/* Icon Arrow */}
=======
      <motion.div className="class-card-footer" variants={childVariants}>
        <motion.button
          className="class-card-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          BOOKING SLOT
          {/* Icon Arrow */}
>>>>>>> Stashed changes
          <motion.svg
            className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            animate={{ x: [0, 3, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            ></path>
          </motion.svg>
        </motion.button>
      </motion.div>
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    </motion.div>
  );
};

export default ClassCard;