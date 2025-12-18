import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const About = () => {
  const navigate = useNavigate();

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
    hover: {
      y: -10,
      boxShadow: '0 20px 40px rgba(57, 255, 20, 0.2)',
      transition: { duration: 0.3 },
    },
  };

  const numberVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  const countVariants = {
    hidden: { opacity: 0 },
    visible: (custom) => ({
      opacity: 1,
      transition: { delay: custom * 0.1, duration: 0.5 },
    }),
  };

  return (
    <div className="min-h-screen bg-gym-black">
      
      {/* Hero Section */}
      <motion.div
        className="relative bg-gradient-to-b from-zinc-900 to-gym-black border-b border-zinc-800 py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg1NywyNTUsMjAsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              className="text-5xl md:text-7xl font-black italic tracking-tighter mb-6"
              variants={itemVariants}
            >
              ABOUT <motion.span
                className="text-gym-green"
                animate={{ color: ['#39ff14', '#2ed612', '#39ff14'] }}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                HexaFit
              </motion.span>
            </motion.h1>
            <motion.p
              className="text-xl text-gray-400 max-w-3xl mx-auto"
              variants={itemVariants}
            >
              Transforming lives through fitness since 2020. 
              <motion.span
                className="block mt-2"
                variants={itemVariants}
              >
                More than just a gym, we're a community.
              </motion.span>
            </motion.p>
          </motion.div>
        </div>
      </motion.div>

      {/* Our Story Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div variants={itemVariants}>
            <motion.h2
              className="text-4xl font-black text-white mb-6"
              variants={itemVariants}
            >
              OUR <span className="text-gym-green">STORY</span>
            </motion.h2>
            <motion.p className="text-gray-400 leading-relaxed mb-4" variants={itemVariants}>
              HexaFit dimulai dari mimpi sederhana: menciptakan ruang di mana setiap orang, 
              dari pemula hingga atlet profesional, dapat mencapai potensi penuh mereka.
            </motion.p>
            <motion.p className="text-gray-400 leading-relaxed mb-4" variants={itemVariants}>
              Dengan peralatan modern, trainer bersertifikat internasional, dan komunitas 
              yang suportif, kami telah membantu ribuan member mencapai transformasi fisik 
              dan mental mereka.
            </motion.p>
            <motion.p className="text-gray-400 leading-relaxed" variants={itemVariants}>
              Bagi kami, fitness bukan hanya tentang angka di timbangan atau otot di cermin. 
              Ini tentang membangun kepercayaan diri, disiplin, dan gaya hidup sehat yang berkelanjutan.
            </motion.p>
          </motion.div>
          
          <motion.div
            className="relative"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              className="aspect-square bg-gradient-to-br from-gym-green/20 to-transparent rounded-2xl border border-gym-green/30 flex items-center justify-center"
              animate={{ boxShadow: ['0 0 20px rgba(57, 255, 20, 0.2)', '0 0 40px rgba(57, 255, 20, 0.4)', '0 0 20px rgba(57, 255, 20, 0.2)'] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              <motion.svg
                className="w-32 h-32 text-gym-green"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </motion.svg>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Our Values */}
        <motion.div
          className="mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.h2
            className="text-4xl font-black text-center text-white mb-12"
            variants={itemVariants}
          >
            OUR <span className="text-gym-green">VALUES</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Value 1 */}
            <motion.div
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-8"
              variants={cardVariants}
              whileHover="hover"
            >
              <motion.div
                className="w-16 h-16 bg-gym-green/10 rounded-full flex items-center justify-center mb-6"
                animate={{ backgroundColor: ['rgba(57, 255, 20, 0.1)', 'rgba(57, 255, 20, 0.2)', 'rgba(57, 255, 20, 0.1)'] }}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                <motion.svg
                  className="w-8 h-8 text-gym-green"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </motion.svg>
              </motion.div>
              <motion.h3 className="text-xl font-bold text-white mb-3" variants={itemVariants}>
                Community First
              </motion.h3>
              <motion.p className="text-gray-400 text-sm leading-relaxed" variants={itemVariants}>
                Kami membangun lingkungan yang supportif di mana setiap member merasa 
                diterima dan termotivasi untuk mencapai tujuan mereka.
              </motion.p>
            </motion.div>

            {/* Value 2 */}
            <motion.div
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-8"
              variants={cardVariants}
              whileHover="hover"
            >
              <motion.div
                className="w-16 h-16 bg-gym-green/10 rounded-full flex items-center justify-center mb-6"
                animate={{ backgroundColor: ['rgba(57, 255, 20, 0.1)', 'rgba(57, 255, 20, 0.2)', 'rgba(57, 255, 20, 0.1)'] }}
                transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}
              >
                <motion.svg
                  className="w-8 h-8 text-gym-green"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                </motion.svg>
              </motion.div>
              <motion.h3 className="text-xl font-bold text-white mb-3" variants={itemVariants}>
                Excellence
              </motion.h3>
              <motion.p className="text-gray-400 text-sm leading-relaxed" variants={itemVariants}>
                Dari peralatan terbaru hingga trainer tersertifikasi, kami berkomitmen 
                memberikan pengalaman fitness terbaik di kelasnya.
              </motion.p>
            </motion.div>

            {/* Value 3 */}
            <motion.div
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-8"
              variants={cardVariants}
              whileHover="hover"
            >
              <motion.div
                className="w-16 h-16 bg-gym-green/10 rounded-full flex items-center justify-center mb-6"
                animate={{ backgroundColor: ['rgba(57, 255, 20, 0.1)', 'rgba(57, 255, 20, 0.2)', 'rgba(57, 255, 20, 0.1)'] }}
                transition={{ repeat: Infinity, duration: 3, delay: 1 }}
              >
                <motion.svg
                  className="w-8 h-8 text-gym-green"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </motion.svg>
              </motion.div>
              <motion.h3 className="text-xl font-bold text-white mb-3" variants={itemVariants}>
                Transformation
              </motion.h3>
              <motion.p className="text-gray-400 text-sm leading-relaxed" variants={itemVariants}>
                Kami percaya setiap orang memiliki potensi luar biasa. Misi kami adalah 
                membantu Anda menemukan dan mewujudkannya.
              </motion.p>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="bg-gradient-to-r from-zinc-900 to-zinc-800 border border-zinc-700 rounded-2xl p-12"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div variants={numberVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <motion.p
                className="text-5xl font-black text-gym-green mb-2"
                custom={0}
                variants={countVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                5+
              </motion.p>
              <p className="text-gray-400 text-sm">Years Experience</p>
            </motion.div>
            <motion.div variants={numberVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <motion.p
                className="text-5xl font-black text-gym-green mb-2"
                custom={1}
                variants={countVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                2K+
              </motion.p>
              <p className="text-gray-400 text-sm">Active Members</p>
            </motion.div>
            <motion.div variants={numberVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <motion.p
                className="text-5xl font-black text-gym-green mb-2"
                custom={2}
                variants={countVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                20+
              </motion.p>
              <p className="text-gray-400 text-sm">Expert Trainers</p>
            </motion.div>
            <motion.div variants={numberVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <motion.p
                className="text-5xl font-black text-gym-green mb-2"
                custom={3}
                variants={countVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                30+
              </motion.p>
              <p className="text-gray-400 text-sm">Class Programs</p>
            </motion.div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            className="text-3xl font-black text-white mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            READY TO <span className="text-gym-green">TRANSFORM?</span>
          </motion.h2>
          <motion.p
            className="text-gray-400 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Join our community and start your fitness journey today.
          </motion.p>
          <motion.button
            onClick={() => navigate('/register')}
            className="px-8 py-4 bg-gym-green text-black font-extrabold rounded hover:bg-white transition duration-300 shadow-[0_0_20px_rgba(57,255,20,0.4)]"
            whileHover={{
              scale: 1.1,
              boxShadow: '0 0 30px rgba(57, 255, 20, 0.8)',
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            JOIN NOW
          </motion.button>
        </motion.div>

      </div>
    </div>
  );
};

export default About;