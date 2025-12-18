import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/authContext';

const TrainerDashboard = () => {
  const { user } = useAuth();
<<<<<<< Updated upstream
=======

  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [participants, setParticipants] = useState(classParticipants);
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
  
  const [myClasses] = useState([
    {
      id: 1,
      name: "BODY COMBAT",
      schedule: "Mon & Wed 19:00",
      participants: 18,
      capacity: 20
    },
    {
      id: 2,
      name: "STRENGTH TRAINING",
      schedule: "Every Day 17:00",
      participants: 22,
      capacity: 25
    }
  ]);

  const [todaySchedule] = useState([
    {
      id: 1,
      className: "BODY COMBAT",
      time: "19:00 - 20:00",
      participants: 18,
      room: "Studio A"
    }
  ]);

  const [stats] = useState({
    totalClasses: 12,
    totalMembers: 45,
    upcomingToday: 1
  });

<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
=======
>>>>>>> Stashed changes
  const handleOpenAttendance = (sessionId) => {
    setCurrentSessionId(sessionId);
    setIsAttendanceModalOpen(true);
  };

  const toggleStatus = (id) => {
    setParticipants(participants.map(p => {
      if(p.id === id) {
        const nextStatus = p.status === 'present' ? 'absent' : 'present';
        return { ...p, status: nextStatus };
      }
      return p;
    }));
  };

  const saveAttendance = () => {
    alert("Data absensi berhasil disimpan!");
    setIsAttendanceModalOpen(false);
  };
<<<<<<< Updated upstream
=======

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
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
    hover: {
      y: -5,
      boxShadow: '0 15px 30px rgba(57, 255, 20, 0.15)',
      transition: { duration: 0.3 },
    },
  };

  const modalVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  const modalContentVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.4, type: 'spring', stiffness: 300, damping: 30 },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 20,
      transition: { duration: 0.2 },
    },
  };
>>>>>>> Stashed changes

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
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
    hover: {
      y: -5,
      boxShadow: '0 15px 30px rgba(57, 255, 20, 0.15)',
      transition: { duration: 0.3 },
    },
  };

  const modalVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  const modalContentVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.4, type: 'spring', stiffness: 300, damping: 30 },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 20,
      transition: { duration: 0.2 },
    },
  };

>>>>>>> Stashed changes
  return (
    <motion.div
      className="min-h-screen bg-gym-black py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Welcome Header */}
        <motion.div
          className="bg-gradient-to-r from-zinc-900 to-zinc-800 border border-zinc-700 rounded-xl p-8 mb-8"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 className="text-4xl font-black text-white mb-2">
            Trainer Portal, <motion.span
              className="text-gym-green"
              animate={{ textShadow: ['0 0 10px rgba(57, 255, 20, 0.3)', '0 0 20px rgba(57, 255, 20, 0.6)', '0 0 10px rgba(57, 255, 20, 0.3)'] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
            >
              {user?.name}!
            </motion.span>
          </motion.h1>
          <motion.p className="text-gray-400" variants={itemVariants}>
            Role: <span className="text-gym-green font-bold">Trainer</span>
          </motion.p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-center"
            variants={cardVariants}
            whileHover="hover"
          >
            <motion.svg
              className="w-12 h-12 text-gym-green mx-auto mb-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </motion.svg>
            <motion.p
              className="text-4xl font-black text-gym-green"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              {stats.totalClasses}
            </motion.p>
            <p className="text-gray-400 text-sm mt-1">Total Classes</p>
          </motion.div>

          <motion.div
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-center"
            variants={cardVariants}
            whileHover="hover"
          >
            <motion.svg
              className="w-12 h-12 text-gym-green mx-auto mb-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ rotate: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </motion.svg>
            <motion.p
              className="text-4xl font-black text-gym-green"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2, delay: 0.2 }}
            >
              {stats.totalMembers}
            </motion.p>
            <p className="text-gray-400 text-sm mt-1">Total Members</p>
          </motion.div>

          <motion.div
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-center"
            variants={cardVariants}
            whileHover="hover"
          >
            <motion.svg
              className="w-12 h-12 text-gym-green mx-auto mb-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </motion.svg>
            <p className="text-4xl font-black text-gym-green">{stats.upcomingToday}</p>
            <p className="text-gray-400 text-sm mt-1">Classes Today</p>
          </motion.div>
        </motion.div>

        {/* Today's Schedule */}
<<<<<<< Updated upstream
<<<<<<< Updated upstream
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <svg className="w-6 h-6 mr-2 text-gym-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
=======
=======
>>>>>>> Stashed changes
        <motion.div
          className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-8"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2 className="text-2xl font-bold text-white mb-6 flex items-center" variants={itemVariants}>
            <motion.svg
              className="w-6 h-6 mr-2 text-gym-green"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </motion.svg>
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
            Today's Schedule
          </motion.h2>

          <motion.div
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {todaySchedule.map((session) => (
<<<<<<< Updated upstream
<<<<<<< Updated upstream
              <div key={session.id} className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-5 flex justify-between items-center hover:border-gym-green transition">
=======
=======
>>>>>>> Stashed changes
              <motion.div
                key={session.id}
                className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-5 flex flex-col md:flex-row justify-between items-center hover:border-gym-green transition gap-4"
                variants={itemVariants}
                whileHover={{ y: -3, borderColor: '#39ff14' }}
              >
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{session.className}</h3>
                  <div className="flex items-center text-gray-400 text-sm space-x-4">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      {session.time}
                    </span>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                      </svg>
                      {session.participants} participants
                    </span>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                      </svg>
                      {session.room}
                    </span>
                  </div>
                </div>
<<<<<<< Updated upstream
<<<<<<< Updated upstream
                <button className="px-6 py-2 bg-gym-green text-black rounded font-bold hover:bg-white transition">
                  VIEW DETAILS
                </button>
              </div>
=======
=======
>>>>>>> Stashed changes
                <motion.button
                  onClick={() => handleOpenAttendance(session.id)}
                  className="px-6 py-2 bg-gym-green text-black rounded font-bold hover:bg-white transition shadow-[0_0_10px_rgba(57,255,20,0.3)]"
                  whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(57, 255, 20, 0.7)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  MARK ATTENDANCE
                </motion.button>
              </motion.div>
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
            ))}
          </motion.div>
        </motion.div>

        {/* My Classes List */}
<<<<<<< Updated upstream
<<<<<<< Updated upstream
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <svg className="w-6 h-6 mr-2 text-gym-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
            </svg>
            My Classes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myClasses.map((cls) => (
              <div key={cls.id} className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-5 hover:border-gym-green transition">
                <h3 className="text-xl font-bold text-white mb-2">{cls.name}</h3>
                <p className="text-gray-400 text-sm mb-3 flex items-center">
                  <svg className="w-4 h-4 mr-1 text-gym-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  {cls.schedule}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">
                    Participants: <span className="text-gym-green font-bold">{cls.participants}/{cls.capacity}</span>
                  </span>
                  <button className="px-4 py-1 bg-transparent border border-gym-green text-gym-green rounded text-sm font-bold hover:bg-gym-green hover:text-black transition">
                    MANAGE
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
=======
        <motion.div
          className="bg-zinc-900 border border-zinc-800 rounded-xl p-6"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2 className="text-2xl font-bold text-white mb-6" variants={itemVariants}>
            My Classes
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {myClasses.map((cls) => (
              <motion.div
                key={cls.id}
                className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-5 hover:border-gym-green transition"
                variants={cardVariants}
                whileHover="hover"
              >
                <motion.h3 className="text-xl font-bold text-white mb-2" variants={itemVariants}>
                  {cls.name}
                </motion.h3>
                <p className="text-gray-400 text-sm mb-3">{cls.schedule}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">
=======
        <motion.div
          className="bg-zinc-900 border border-zinc-800 rounded-xl p-6"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2 className="text-2xl font-bold text-white mb-6" variants={itemVariants}>
            My Classes
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {myClasses.map((cls) => (
              <motion.div
                key={cls.id}
                className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-5 hover:border-gym-green transition"
                variants={cardVariants}
                whileHover="hover"
              >
                <motion.h3 className="text-xl font-bold text-white mb-2" variants={itemVariants}>
                  {cls.name}
                </motion.h3>
                <p className="text-gray-400 text-sm mb-3">{cls.schedule}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">
>>>>>>> Stashed changes
                    Participants: <motion.span
                      className="text-gym-green font-bold"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      {cls.participants}/{cls.capacity}
                    </motion.span>
                  </span>
                  <motion.button
                    className="px-4 py-1 bg-transparent border border-gym-green text-gym-green rounded text-sm font-bold hover:bg-gym-green hover:text-black transition"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    MANAGE
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Attendance Modal */}
        <AnimatePresence>
          {isAttendanceModalOpen && (
            <motion.div
              className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.div
                className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 w-full max-w-lg shadow-2xl flex flex-col max-h-[90vh]"
                variants={modalContentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <motion.div
                  className="flex justify-between items-center mb-6 border-b border-zinc-800 pb-4"
                  variants={itemVariants}
                >
                  <h3 className="text-xl font-bold text-white italic">
                    Mark <motion.span className="text-gym-green">Attendance</motion.span>
                  </h3>
                  <motion.button
                    onClick={() => setIsAttendanceModalOpen(false)}
                    className="text-gray-400 hover:text-white"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    ✕
                  </motion.button>
                </motion.div>
                
                <motion.div
                  className="overflow-y-auto flex-1 space-y-3 pr-2"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {participants.map((p) => (
                    <motion.div
                      key={p.id}
                      className="flex items-center justify-between bg-black/50 p-3 rounded border border-zinc-800"
                      variants={itemVariants}
                      whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
                    >
                      <span className="text-white font-medium">{p.name}</span>
                      <motion.button
                        onClick={() => toggleStatus(p.id)}
                        className={`px-4 py-1.5 rounded text-xs font-bold transition-all w-24 ${
                          p.status === 'present' ? 'bg-gym-green text-black' : 
                          p.status === 'absent' ? 'bg-red-900/50 text-red-500 border border-red-900' : 
                          'bg-zinc-700 text-gray-400'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {p.status === 'present' ? 'HADIR' : p.status === 'absent' ? 'ALPHA' : 'PENDING'}
                      </motion.button>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div
                  className="mt-6 pt-4 border-t border-zinc-800"
                  variants={itemVariants}
                >
                  <motion.button
                    onClick={saveAttendance}
                    className="w-full py-3 bg-gym-green text-black font-bold rounded hover:bg-white transition"
                    whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(57, 255, 20, 0.5)' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    SIMPAN ABSENSI
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes

      </div>
    </motion.div>
  );
};

export default TrainerDashboard;