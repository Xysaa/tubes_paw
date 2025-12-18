import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

/* VARIANTS */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      {/* === BACKGROUND IMAGE === */}
      <div
        className="
          absolute inset-0
          bg-[url('/images/hero.jpg')]
          bg-cover bg-center
          opacity-[0.75]
          blur-[2px]
          scale-105
        "
      />

      {/* === DARK OVERLAY (biar teks kontras) === */}
      <div className="absolute inset-0 bg-black/60" />

      {/* === CONTENT === */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 min-h-screen flex items-center">
        <motion.div
          className="max-w-2xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-white text-5xl md:text-6xl font-extrabold leading-tight"
            variants={itemVariants}
          >
            TRANSFORM YOUR <br />
            BODY, BUILD <br />
            YOUR{" "}
            <span className="text-[#53B602]">
              STRENGTH
            </span>
          </motion.h1>

          <motion.p
            className="mt-6 text-white/80 text-base md:text-lg leading-relaxed"
            variants={itemVariants}
          >
            Achieve your fitness goals with structured training, expert coaches,
            and a supportive community.
          </motion.p>

          {/* BUTTONS */}
          <motion.div
            className="mt-8 flex flex-wrap gap-4"
            variants={itemVariants}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/register")}
              className="
                px-6 py-3 rounded-lg
                bg-[#53B602] text-black font-semibold
                hover:brightness-110 transition
              "
            >
              Join Now
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                document
                  .getElementById("classes")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="
                px-6 py-3 rounded-lg
                border border-[#53B602]
                text-white font-semibold
                hover:bg-[#53B602] hover:text-black
                transition
              "
            >
              View Classes
            </motion.button>
          </motion.div>

          {/* STATS */}
          <motion.div
            className="mt-12 flex gap-10"
            variants={itemVariants}
          >
            <Stat value="50" label="Certified Trainers" />
            <Stat value="10" label="Years of Experience" />
            <Stat value="30" label="Training Programs" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

/* === SMALL COMPONENT === */
const Stat = ({ value, label }) => (
  <div>
    <p className="text-white text-3xl font-bold">{value}</p>
    <p className="text-white/70 text-sm">{label}</p>
  </div>
);
