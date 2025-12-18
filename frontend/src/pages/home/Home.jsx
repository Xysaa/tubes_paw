import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Hero from '../../components/Hero'; 
import ClassCard from '../../components/ClassCard'; 
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import TrainerCard from '../../components/TrainerCard';

const Home = () => {
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      const dummyClasses = [
        {
          id: 1,
          name: "BODY COMBAT",
          schedule: "Senin & Rabu 19:00",
          instructor: "Coach John",
          capacity: 20,
          description: "Kelas high-intensity yang menggabungkan gerakan bela diri dan kardio untuk membakar kalori maksimal."
        },
        {
          id: 2,
          name: "YOGA FLOW",
          schedule: "Selasa & Kamis 18:00",
          instructor: "Coach Sarah",
          capacity: 15,
          description: "Sesi yoga yang fokus pada fleksibilitas, keseimbangan, dan relaksasi pikiran."
        },
        {
          id: 3,
          name: "STRENGTH TRAINING",
          schedule: "Setiap Hari 17:00",
          instructor: "Coach Mike",
          capacity: 25,
          description: "Latihan beban untuk membangun massa otot dan meningkatkan kekuatan tubuh secara keseluruhan."
        },
        {
          id: 4,
          name: "ZUMBA PARTY",
          schedule: "Jumat 19:30",
          instructor: "Coach Maria",
          capacity: 30,
          description: "Kelas dance fitness yang energik dengan musik latin dan gerakan yang menyenangkan."
        },
        {
          id: 5,
          name: "SPINNING CLASS",
          schedule: "Sabtu & Minggu 07:00",
          instructor: "Coach Alex",
          capacity: 20,
          description: "Cycling indoor dengan intensitas tinggi untuk meningkatkan stamina dan membakar lemak."
        },
        {
          id: 6,
          name: "PILATES CORE",
          schedule: "Rabu & Jumat 06:00",
          instructor: "Coach Emma",
          capacity: 12,
          description: "Latihan fokus pada core strength, postur tubuh, dan kontrol pernapasan."
        }
      ];

      setClasses(dummyClasses);
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={() => window.location.reload()} />;

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <>
      {/* SECTION: HOME (HERO) */}
      <div id="home">
        <Hero />
      </div>

      {/* SECTION: ABOUT */}
      <motion.div
        id="about"
        className="about-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="about-container">
          
          {/* Header */}
          <motion.div
            className="about-header"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.h2 className="about-title" variants={itemVariants}>
              ABOUT <motion.span
                className="about-title-accent"
                animate={{ textShadow: ['0 0 10px rgba(57, 255, 20, 0.3)', '0 0 20px rgba(57, 255, 20, 0.6)', '0 0 10px rgba(57, 255, 20, 0.3)'] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
              >
                HexaFit
              </motion.span>
            </motion.h2>
            <motion.p className="about-subtitle" variants={itemVariants}>
              Transforming lives through fitness since 2020.
              <br/> 
              More than just a gym, we're a community.
            </motion.p>
          </motion.div>

          {/* Our Story */}
          <motion.div
            className="about-content"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div variants={itemVariants}>
              <motion.h3 className="about-story-title" variants={itemVariants}>
                OUR <span className="about-story-title-accent">STORY</span>
              </motion.h3>
              <motion.p className="about-story-text" variants={itemVariants}>
                HexaFit dimulai dari mimpi sederhana: menciptakan ruang di mana setiap orang, 
                dari pemula hingga atlet profesional, dapat mencapai potensi penuh mereka.
              </motion.p>
              <motion.p className="about-story-text" variants={itemVariants}>
                Dengan peralatan modern, trainer bersertifikat internasional, dan komunitas 
                yang suportif, kami telah membantu ribuan member mencapai transformasi fisik 
                dan mental mereka.
              </motion.p>
              <motion.p className="about-story-text" variants={itemVariants}>
                Bagi kami, fitness bukan hanya tentang angka di timbangan atau otot di cermin. 
                Ini tentang membangun kepercayaan diri, disiplin, dan gaya hidup sehat yang berkelanjutan.
              </motion.p>
            </motion.div>
            
            {/* Icon Placeholder */}
            <motion.div
              className="about-icon-container"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="about-icon-box"
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <img 
                    src="/images/1.png" 
                    alt="HexaFit Logo" 
                    className="w-full h-full object-contain"
                  />
              </motion.div>
            </motion.div>
          </motion.div>

            {/* SECTION: OUR TRAINERS */}
            <motion.div
              id="trainers"
              className="trainers-section"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="trainers-container">
                <motion.div
                  className="classes-header"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <div>
                    <motion.h2 className="classes-title" variants={itemVariants}>
                      Meet Our <motion.span
                        className="classes-title-accent"
                        animate={{ color: ['#39ff14', '#2ed612', '#39ff14'] }}
                        transition={{ repeat: Infinity, duration: 3 }}
                      >
                        Trainers
                      </motion.span>
                    </motion.h2>
                    <motion.p className="classes-subtitle" variants={itemVariants}>
                      Pilih trainer terbaik dan kenali tim kami.
                    </motion.p>
                  </div>
                </motion.div>

                <motion.div
                  className="classes-grid"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  {
                    [
                      { id: 1, name: 'Alex Carter', role: 'Strength & Conditioning Coach', image: '/images/1.png' },
                      { id: 2, name: 'Emily Turner', role: 'Yoga & Recovery Specialist', image: '/images/2.png' },
                      { id: 3, name: 'Ethan Parker', role: 'Cardio & Endurance Coach', image: '/images/gym.jpg' },
                      { id: 4, name: 'Oliver Reed', role: 'Performance Trainer', image: '/images/gym 2.jpg' },
                      { id: 5, name: 'Ryan Brooks', role: 'Muscle Building Trainer', image: '/images/1.png' },
                      { id: 6, name: 'Lucas Bennett', role: 'Mobility & Rehab Coach', image: '/images/2.png' }
                    ].map(trainer => (
                      <motion.div key={trainer.id} variants={cardVariants}>
                        <TrainerCard trainer={trainer} />
                      </motion.div>
                    ))
                  }
                </motion.div>

                <motion.div
                  className="trainers-footer text-center mt-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <motion.button
                    className="trainers-cta"
                    whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(57, 255, 20, 0.5)' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    See More Trainers
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>

        </div>
      </motion.div>

      {/* SECTION: CLASSES */}
      <motion.div
        id="classes"
        className="classes-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="classes-header"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div>
            <motion.h2 className="classes-title" variants={itemVariants}>
              Kelas <motion.span
                className="classes-title-accent"
                animate={{ color: ['#39ff14', '#2ed612', '#39ff14'] }}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                Tersedia
              </motion.span>
            </motion.h2>
            <motion.p className="classes-subtitle" variants={itemVariants}>
              Pilih kelas dan mulai latihanmu.
            </motion.p>
          </div>
        </motion.div>
        
        {classes.length > 0 ? (
          <motion.div
            className="classes-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {classes.map((cls) => (
              <motion.div key={cls.id} variants={cardVariants}>
                <ClassCard cls={cls} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="classes-empty"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p>Belum ada kelas yang tersedia saat ini.</p>
          </motion.div>
        )}
      </motion.div>

      {/* SECTION: CONTACT */}
      <motion.div
        id="contact"
        className="contact-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="contact-container">
          
          {/* Header */}
          <motion.div
            className="contact-header"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.h2 className="contact-title" variants={itemVariants}>
              GET IN <motion.span
                className="contact-title-accent"
                animate={{ textShadow: ['0 0 10px rgba(57, 255, 20, 0.3)', '0 0 20px rgba(57, 255, 20, 0.6)', '0 0 10px rgba(57, 255, 20, 0.3)'] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
              >
                TOUCH
              </motion.span>
            </motion.h2>
            <motion.p className="contact-subtitle" variants={itemVariants}>
              Ada pertanyaan? Ingin bergabung? Tim kami siap membantu Anda!
            </motion.p>
          </motion.div>

          {/* Contact Cards */}
          <motion.div
            className="contact-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            
            {/* Location Card */}
            <motion.div className="contact-card" variants={cardVariants} whileHover={{ y: -5 }}>
              <motion.div
                className="contact-card-icon"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </motion.div>
              <h3 className="contact-card-title">Location</h3>
              <p className="contact-card-text">
                Jl. Fitness Boulevard No. 88<br/>
                Jakarta Selatan 12345<br/>
                Indonesia
              </p>
            </motion.div>

            {/* Phone Card */}
            <motion.div className="contact-card" variants={cardVariants} whileHover={{ y: -5 }}>
              <motion.div
                className="contact-card-icon"
                animate={{ rotate: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
              </motion.div>
              <h3 className="contact-card-title">Phone</h3>
              <p className="contact-card-text">+62 812-3456-7890</p>
              <p className="contact-card-hours">Mon - Sun: 06:00 - 22:00</p>
            </motion.div>

            {/* Email Card */}
            <motion.div className="contact-card" variants={cardVariants} whileHover={{ y: -5 }}>
              <motion.div
                className="contact-card-icon"
                animate={{ x: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </motion.div>
              <h3 className="contact-card-title">Email</h3>
              <p className="contact-card-text">info@hexafit.com</p>
              <p className="contact-card-text">support@hexafit.com</p>
            </motion.div>

          </motion.div>

          {/* Social Media */}
          <motion.div
            className="contact-social"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="contact-social-title">Follow Us</h3>
            <motion.div
              className="contact-social-links"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                { label: 'Facebook', symbol: 'f' },
                { label: 'Instagram', symbol: '📷' },
                { label: 'Twitter', symbol: '𝕏' }
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href="#"
                  className="contact-social-link"
                  variants={itemVariants}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                  title={social.label}
                >
                  {social.symbol}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </motion.div>
    </>
  );
};

export default Home;