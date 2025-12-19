import React from "react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const AboutUs = () => {
  return (
    <section className="relative bg-zinc-900/95 text-white overflow-hidden">
      {/* Background image overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: "url('/images/about-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative mx-auto max-w-6xl px-4 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="space-y-16"
        >
          {/* Title */}
          <motion.div variants={itemVariants} className="text-center">
            <h1 className="text-3xl md:text-5xl font-extrabold">
              About <span className="text-[#53B602]">HexaFit</span>
            </h1>
            <p className="mt-4 text-white/70 max-w-2xl mx-auto">
              Building strength, discipline, and a healthier lifestyle.
            </p>
          </motion.div>

          {/* Who We Are */}
          <motion.div variants={itemVariants} className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#53B602]">
              Who We Are
            </h2>
            <p className="mt-4 text-white/80 leading-relaxed">
              HexaFit is a modern fitness platform dedicated to helping people
              achieve their fitness goals through structured training programs,
              expert coaching, and a supportive environment. We believe that
              fitness is not just about working out, but about building
              discipline, consistency, and long-term healthy habits.
            </p>
          </motion.div>

          {/* Mission & Vision */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-10"
          >
            <motion.div
              variants={itemVariants}
              className="bg-black/40 rounded-2xl p-8"
            >
              <h3 className="text-xl font-bold text-[#53B602]">Our Mission</h3>
              <p className="mt-4 text-white/80 leading-relaxed">
                To empower individuals to improve their strength, health, and
                confidence through professional training and personalized
                guidance.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-black/40 rounded-2xl p-8"
            >
              <h3 className="text-xl font-bold text-[#53B602]">Our Vision</h3>
              <p className="mt-4 text-white/80 leading-relaxed">
                To become a trusted fitness platform that promotes sustainable,
                safe, and goal-oriented training for everyone.
              </p>
            </motion.div>
          </motion.div>

          {/* Training Approach */}
          <motion.div variants={itemVariants} className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-[#53B602]">
              Our Training Approach
            </h2>
            <p className="mt-4 text-center text-white/80 leading-relaxed">
              At HexaFit, we focus on structured training plans that balance
              strength, endurance, mobility, and recovery. We prioritize proper
              technique, progressive overload, and consistency to ensure safe
              and effective results for our members.
            </p>
          </motion.div>

          {/* Community */}
          <motion.div
            variants={itemVariants}
            className="bg-[#53B602] rounded-3xl p-10 text-center"
          >
            <h2 className="text-2xl md:text-3xl font-extrabold text-black">
              Our Community
            </h2>
            <p className="mt-4 text-black/80 max-w-3xl mx-auto">
              HexaFit is more than a gym. It is a supportive community where
              members motivate each other, stay accountable, and grow stronger
              together.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;