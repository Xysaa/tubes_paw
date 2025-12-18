import React, { useState } from 'react';
import { useAuth } from '../../context/authContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { attendanceHistory } from './AttendanceData';

/* ===== Variants ===== */
const pageVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } }
};

const fadeDown = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 }
  }
};

const cardItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const slideLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
};

const slideRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
};

const MemberDashboard = () => {
  const { user } = useAuth();

  const [myBookings] = useState([
    { id: 1, className: "BODY COMBAT", date: "2025-01-20", time: "19:00", trainer: "Coach John", status: "confirmed" },
    { id: 2, className: "YOGA FLOW", date: "2025-01-22", time: "18:00", trainer: "Coach Sarah", status: "confirmed" }
  ]);

  const [membershipInfo] = useState({
    plan: "Gold Membership",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    remainingClasses: 45
  });

  const [history] = useState(attendanceHistory);

  return (
    <motion.div
      className="min-h-screen bg-gym-black py-8"
      variants={pageVariant}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Welcome Header */}
        <motion.div
          variants={fadeDown}
          initial="hidden"
          animate="visible"
          className="bg-gradient-to-r from-zinc-900 to-zinc-800 border border-zinc-700 rounded-xl p-8 mb-8"
        >
          <h1 className="text-4xl font-black text-white mb-2">
            Welcome Back, <span className="text-gym-green">{user?.name}!</span>
          </h1>
          <p className="text-gray-400">
            Role: <span className="text-gym-green font-bold">Member</span>
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
        >
          <motion.div variants={cardItem} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <p className="text-lg font-bold text-white mb-2">Membership</p>
            <p className="text-2xl font-bold text-gym-green">{membershipInfo.plan}</p>
            <p className="text-sm text-gray-500">Valid until {membershipInfo.endDate}</p>
          </motion.div>

          <motion.div variants={cardItem} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <p className="text-lg font-bold text-white mb-2">Classes Left</p>
            <p className="text-4xl font-black text-gym-green">{membershipInfo.remainingClasses}</p>
          </motion.div>

          <motion.div variants={cardItem} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <p className="text-lg font-bold text-white mb-2">Next Session</p>
            <p className="text-xl font-bold text-white">BODY COMBAT</p>
            <p className="text-sm text-gray-500">Mon, Jan 20 at 19:00</p>
          </motion.div>
        </motion.div>

        {/* Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Upcoming Classes */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            animate="visible"
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 h-fit"
          >
            <h2 className="text-2xl font-bold text-white mb-6">My Upcoming Classes</h2>

            <div className="space-y-4">
              {myBookings.map((booking) => (
                <motion.div
                  key={booking.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-4 flex justify-between items-center"
                >
                  <div>
                    <h3 className="text-lg font-bold text-white">{booking.className}</h3>
                    <p className="text-gray-400 text-sm">{booking.date} at {booking.time}</p>
                  </div>
                  <button className="px-3 py-1 bg-red-900/30 text-red-500 border border-red-900 rounded text-xs font-bold">
                    CANCEL
                  </button>
                </motion.div>
              ))}

              <Link
                to="/member/classes"
                className="block w-full py-3 bg-zinc-800 text-center text-gray-300 font-bold rounded hover:bg-gym-green hover:text-black transition"
              >
                BOOK NEW CLASS
              </Link>
            </div>
          </motion.div>

          {/* Attendance History */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            animate="visible"
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 h-fit"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Attendance History</h2>

            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-gray-500 border-b border-zinc-800">
                  <th className="pb-3">Class</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {history.map(item => (
                  <motion.tr
                    key={item.id}
                    whileHover={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
                    className="border-b border-zinc-800/50"
                  >
                    <td className="py-3 text-white">{item.className}</td>
                    <td className="py-3 text-gray-400">{item.date}</td>
                    <td className="py-3 text-right">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        item.status === 'Hadir'
                          ? 'text-gym-green bg-green-900/20'
                          : 'text-red-500 bg-red-900/20'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
};

export default MemberDashboard;
