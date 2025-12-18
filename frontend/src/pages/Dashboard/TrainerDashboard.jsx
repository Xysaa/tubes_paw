import React, { useState } from 'react';
import { useAuth } from '../../context/authContext';
import { classParticipants } from './AttendanceData';
import { motion, AnimatePresence } from 'framer-motion';

/* ================== FRAMER MOTION VARIANTS ================== */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const modalBackdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalContent = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3 },
  },
};
/* ============================================================ */

const TrainerDashboard = () => {
  const { user } = useAuth();

  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [participants, setParticipants] = useState(classParticipants);

  const [myClasses] = useState([
    {
      id: 1,
      name: 'BODY COMBAT',
      schedule: 'Mon & Wed 19:00',
      participants: 18,
      capacity: 20,
    },
    {
      id: 2,
      name: 'STRENGTH TRAINING',
      schedule: 'Every Day 17:00',
      participants: 22,
      capacity: 25,
    },
  ]);

  const [todaySchedule] = useState([
    {
      id: 1,
      className: 'BODY COMBAT',
      time: '19:00 - 20:00',
      participants: 18,
      room: 'Studio A',
    },
  ]);

  const [stats] = useState({
    totalClasses: 12,
    totalMembers: 45,
    upcomingToday: 1,
  });

  const handleOpenAttendance = (sessionId) => {
    setCurrentSessionId(sessionId);
    setIsAttendanceModalOpen(true);
  };

  const toggleStatus = (id) => {
    setParticipants(
      participants.map((p) =>
        p.id === id
          ? { ...p, status: p.status === 'present' ? 'absent' : 'present' }
          : p
      )
    );
  };

  const saveAttendance = () => {
    alert('Data absensi berhasil disimpan!');
    setIsAttendanceModalOpen(false);
  };

  return (
    <motion.div
      className="min-h-screen bg-gym-black py-8"
      initial="hidden"
      animate="visible"
      variants={fadeUp}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ================= WELCOME HEADER ================= */}
        <motion.div
          variants={fadeUp}
          className="bg-gradient-to-r from-zinc-900 to-zinc-800 border border-zinc-700 rounded-xl p-8 mb-8"
        >
          <h1 className="text-4xl font-black text-white mb-2">
            Trainer Portal, <span className="text-gym-green">{user?.name}!</span>
          </h1>
          <p className="text-gray-400">
            Role: <span className="text-gym-green font-bold">Trainer</span>
          </p>
        </motion.div>

        {/* ================= STATS ================= */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {[
            { label: 'Total Classes', value: stats.totalClasses },
            { label: 'Total Members', value: stats.totalMembers },
            { label: 'Classes Today', value: stats.upcomingToday },
          ].map((stat, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-center"
            >
              <p className="text-4xl font-black text-gym-green">{stat.value}</p>
              <p className="text-gray-400 text-sm mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* ================= TODAY SCHEDULE ================= */}
        <motion.div
          variants={fadeUp}
          className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">
            Today's Schedule
          </h2>

          <div className="space-y-4">
            {todaySchedule.map((session) => (
              <motion.div
                key={session.id}
                whileHover={{ scale: 1.02 }}
                className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-5 flex flex-col md:flex-row justify-between items-center gap-4"
              >
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {session.className}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    ⏰ {session.time} • 👥 {session.participants} • 📍{' '}
                    {session.room}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleOpenAttendance(session.id)}
                  className="px-6 py-2 bg-gym-green text-black rounded font-bold"
                >
                  MARK ATTENDANCE
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ================= MY CLASSES ================= */}
        <motion.div
          variants={fadeUp}
          className="bg-zinc-900 border border-zinc-800 rounded-xl p-6"
        >
          <h2 className="text-2xl font-bold text-white mb-6">My Classes</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myClasses.map((cls) => (
              <motion.div
                key={cls.id}
                whileHover={{ y: -4 }}
                className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-5"
              >
                <h3 className="text-xl font-bold text-white">{cls.name}</h3>
                <p className="text-gray-400 text-sm mb-3">{cls.schedule}</p>
                <span className="text-sm text-gray-400">
                  Participants:{' '}
                  <span className="text-gym-green font-bold">
                    {cls.participants}/{cls.capacity}
                  </span>
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ================= MODAL ATTENDANCE ================= */}
        <AnimatePresence>
          {isAttendanceModalOpen && (
            <motion.div
              className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
              variants={modalBackdrop}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <motion.div
                variants={modalContent}
                className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 w-full max-w-lg"
              >
                <h3 className="text-xl font-bold text-white mb-4">
                  Mark <span className="text-gym-green">Attendance</span>
                </h3>

                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {participants.map((p) => (
                    <div
                      key={p.id}
                      className="flex justify-between items-center bg-black/50 p-3 rounded"
                    >
                      <span className="text-white">{p.name}</span>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleStatus(p.id)}
                        className={`px-4 py-1 rounded text-xs font-bold ${
                          p.status === 'present'
                            ? 'bg-gym-green text-black'
                            : 'bg-zinc-700 text-gray-300'
                        }`}
                      >
                        {p.status === 'present' ? 'HADIR' : 'ALPHA'}
                      </motion.button>
                    </div>
                  ))}
                </div>

                <button
                  onClick={saveAttendance}
                  className="w-full mt-6 py-3 bg-gym-green text-black font-bold rounded"
                >
                  SIMPAN ABSENSI
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  );
};

export default TrainerDashboard;
