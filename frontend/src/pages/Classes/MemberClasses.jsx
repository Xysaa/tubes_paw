import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ClassCard from '../../components/ClassCard';
import { initialClasses } from "./ClassesData";
import LoadingSpinner from '../../components/LoadingSpinner';

/* ===== Variants ===== */
const pageVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
};

const headerVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const gridVariant = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 }
  }
};

const cardVariant = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0 }
};

const MemberClasses = () => {
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setClasses(initialClasses);
      setIsLoading(false);
    }, 500);
  }, []);

  if (isLoading) return <LoadingSpinner />;

  return (
    <motion.div
      className="min-h-screen bg-gym-black py-12 px-4 sm:px-6 lg:px-8 pt-24"
      variants={pageVariant}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          variants={headerVariant}
          initial="hidden"
          animate="visible"
          className="mb-10 border-b border-zinc-800 pb-6"
        >
          <h1 className="text-4xl font-black text-white mb-2 uppercase">
            Kelas <span className="text-gym-green">Tersedia</span>
          </h1>
          <p className="text-gray-400">
            Pilih kelas favoritmu dan mulai latihan hari ini.
          </p>
        </motion.div>

        {/* Classes Grid */}
        {classes.length > 0 ? (
          <motion.div
            variants={gridVariant}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {classes.map((cls) => (
              <motion.div key={cls.id} variants={cardVariant}>
                <ClassCard cls={cls} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-500 py-12"
          >
            <p>Belum ada kelas yang tersedia saat ini.</p>
          </motion.div>
        )}

      </div>
    </motion.div>
  );
};

export default MemberClasses;
