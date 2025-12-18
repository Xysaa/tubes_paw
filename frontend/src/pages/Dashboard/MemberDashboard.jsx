import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/authContext';
import { Link } from 'react-router-dom';
<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
=======
>>>>>>> Stashed changes
import { attendanceHistory } from './AttendanceData';
>>>>>>> Stashed changes

const MemberDashboard = () => {
  const { user } = useAuth();
  
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  // Dummy data untuk member
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
  const [myBookings] = useState([
    {
      id: 1,
      className: "BODY COMBAT",
      date: "2025-01-20",
      time: "19:00",
      trainer: "Coach John",
      status: "confirmed"
    },
    {
      id: 2,
      className: "YOGA FLOW",
      date: "2025-01-22",
      time: "18:00",
      trainer: "Coach Sarah",
      status: "confirmed"
    }
  ]);

  const [membershipInfo] = useState({
    plan: "Gold Membership",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    remainingClasses: 45
  });

<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
=======
>>>>>>> Stashed changes
  const [history] = useState(attendanceHistory);

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

<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
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
<<<<<<< Updated upstream
<<<<<<< Updated upstream
        <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 border border-zinc-700 rounded-xl p-8 mb-8">
          <h1 className="text-4xl font-black text-white mb-2">
            Welcome Back, <span className="text-gym-green">{user?.name}!</span>
          </h1>
          <p className="text-gray-400">Role: <span className="text-gym-green font-bold">Member</span></p>
        </div>

        {/* Membership Status Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Membership</h3>
              <svg className="w-8 h-8 text-gym-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
              </svg>
            </div>
            <p className="text-2xl font-bold text-gym-green mb-1">{membershipInfo.plan}</p>
            <p className="text-sm text-gray-500">Valid until {membershipInfo.endDate}</p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Classes Left</h3>
              <svg className="w-8 h-8 text-gym-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <p className="text-4xl font-black text-gym-green">{membershipInfo.remainingClasses}</p>
            <p className="text-sm text-gray-500">Classes remaining</p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Next Session</h3>
              <svg className="w-8 h-8 text-gym-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
            <p className="text-xl font-bold text-white mb-1">BODY COMBAT</p>
            <p className="text-sm text-gray-500">Mon, Jan 20 at 19:00</p>
          </div>
        </div>

        {/* My Bookings */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <svg className="w-6 h-6 mr-2 text-gym-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
            My Upcoming Classes
          </h2>

          <div className="space-y-4">
            {myBookings.map((booking) => (
              <div key={booking.id} className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-4 flex justify-between items-center hover:border-gym-green transition">
                <div>
                  <h3 className="text-lg font-bold text-white">{booking.className}</h3>
                  <p className="text-gray-400 text-sm">
                    {booking.date} at {booking.time} • Trainer: {booking.trainer}
                  </p>
                </div>
                <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded font-bold text-sm transition">
                  CANCEL
                </button>
              </div>
            ))}
          </div>

          <Link 
            to="/"
            className="mt-6 block w-full py-3 bg-gym-green text-black text-center font-bold rounded hover:bg-white transition"
          >
            BOOK NEW CLASS
          </Link>
        </div>

=======
        <motion.div
          className="bg-gradient-to-r from-zinc-900 to-zinc-800 border border-zinc-700 rounded-xl p-8 mb-8"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 className="text-4xl font-black text-white mb-2">
            Welcome Back, <motion.span
              className="text-gym-green"
              animate={{ textShadow: ['0 0 10px rgba(57, 255, 20, 0.3)', '0 0 20px rgba(57, 255, 20, 0.6)', '0 0 10px rgba(57, 255, 20, 0.3)'] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
            >
              {user?.name}!
            </motion.span>
          </motion.h1>
          <motion.p className="text-gray-400" variants={itemVariants}>
            Role: <span className="text-gym-green font-bold">Member</span>
          </motion.p>
        </motion.div>

        {/* Stats Card */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
           {/* Card Membership */}
           <motion.div
             className="bg-zinc-900 border border-zinc-800 rounded-xl p-6"
             variants={cardVariants}
             whileHover="hover"
           >
              <motion.p className="text-lg font-bold text-white mb-2" variants={itemVariants}>
                Membership
              </motion.p>
              <motion.p
                className="text-2xl font-bold text-gym-green mb-1"
                animate={{ color: ['#39ff14', '#2ed612', '#39ff14'] }}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                {membershipInfo.plan}
              </motion.p>
              <p className="text-sm text-gray-500">Valid until {membershipInfo.endDate}</p>
           </motion.div>

=======
        <motion.div
          className="bg-gradient-to-r from-zinc-900 to-zinc-800 border border-zinc-700 rounded-xl p-8 mb-8"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 className="text-4xl font-black text-white mb-2">
            Welcome Back, <motion.span
              className="text-gym-green"
              animate={{ textShadow: ['0 0 10px rgba(57, 255, 20, 0.3)', '0 0 20px rgba(57, 255, 20, 0.6)', '0 0 10px rgba(57, 255, 20, 0.3)'] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
            >
              {user?.name}!
            </motion.span>
          </motion.h1>
          <motion.p className="text-gray-400" variants={itemVariants}>
            Role: <span className="text-gym-green font-bold">Member</span>
          </motion.p>
        </motion.div>

        {/* Stats Card */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
           {/* Card Membership */}
           <motion.div
             className="bg-zinc-900 border border-zinc-800 rounded-xl p-6"
             variants={cardVariants}
             whileHover="hover"
           >
              <motion.p className="text-lg font-bold text-white mb-2" variants={itemVariants}>
                Membership
              </motion.p>
              <motion.p
                className="text-2xl font-bold text-gym-green mb-1"
                animate={{ color: ['#39ff14', '#2ed612', '#39ff14'] }}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                {membershipInfo.plan}
              </motion.p>
              <p className="text-sm text-gray-500">Valid until {membershipInfo.endDate}</p>
           </motion.div>

>>>>>>> Stashed changes
           {/* Card Classes Left */}
           <motion.div
             className="bg-zinc-900 border border-zinc-800 rounded-xl p-6"
             variants={cardVariants}
             whileHover="hover"
           >
              <motion.p className="text-lg font-bold text-white mb-2" variants={itemVariants}>
                Classes Left
              </motion.p>
              <motion.p
                className="text-4xl font-black text-gym-green"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                {membershipInfo.remainingClasses}
              </motion.p>
           </motion.div>

           {/* Card Next Session */}
           <motion.div
             className="bg-zinc-900 border border-zinc-800 rounded-xl p-6"
             variants={cardVariants}
             whileHover="hover"
           >
              <motion.p className="text-lg font-bold text-white mb-2" variants={itemVariants}>
                Next Session
              </motion.p>
              <motion.p className="text-xl font-bold text-white mb-1" variants={itemVariants}>
                BODY COMBAT
              </motion.p>
              <p className="text-sm text-gray-500">Mon, Jan 20 at 19:00</p>
           </motion.div>
        </motion.div>

        {/* Main Grid Layout */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          
          {/* Left Column: Upcoming Bookings */}
          <motion.div
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 h-fit"
            variants={cardVariants}
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </motion.svg>
              My Upcoming Classes
            </motion.h2>
            <motion.div
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {myBookings.map((booking) => (
                <motion.div
                  key={booking.id}
                  className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-4 flex justify-between items-center hover:border-gym-green transition"
                  variants={itemVariants}
                  whileHover={{ y: -3, borderColor: '#39ff14' }}
                >
                  <div>
                    <h3 className="text-lg font-bold text-white">{booking.className}</h3>
                    <p className="text-gray-400 text-sm">{booking.date} at {booking.time}</p>
                  </div>
                  <motion.button
                    className="px-3 py-1 bg-red-900/30 text-red-500 border border-red-900 rounded text-xs font-bold hover:bg-red-900/50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    CANCEL
                  </motion.button>
                </motion.div>
              ))}
              <motion.div variants={itemVariants}>
                <Link
                  to="/member/classes"
                  className="mt-4 block w-full py-3 bg-zinc-800 text-center text-gray-300 font-bold rounded hover:bg-gym-green hover:text-black transition"
                >
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    BOOK NEW CLASS
                  </motion.span>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Column: Attendance History */}
          <motion.div
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 h-fit"
            variants={cardVariants}
          >
            <motion.h2 className="text-2xl font-bold text-white mb-6 flex items-center" variants={itemVariants}>
              <motion.svg
                className="w-6 h-6 mr-2 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ rotate: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </motion.svg>
              Attendance History
            </motion.h2>
            <motion.div
              className="overflow-x-auto"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-500 text-sm border-b border-zinc-800">
                    <th className="pb-3 pl-2">Class</th>
                    <th className="pb-3">Date</th>
                    <th className="pb-3 text-right pr-2">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {history.map((item, index) => (
                    <motion.tr
                      key={item.id}
                      className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition"
                      variants={itemVariants}
                      custom={index}
                      whileHover={{ backgroundColor: 'rgba(39, 39, 42, 0.3)' }}
                    >
                      <td className="py-3 pl-2 text-white font-medium">{item.className}</td>
                      <td className="py-3 text-gray-400">{item.date}</td>
                      <td className="py-3 text-right pr-2">
                        <motion.span
                          className={`px-2 py-1 rounded text-xs font-bold ${
                            item.status === 'Hadir' ? 'text-gym-green bg-green-900/20 border border-gym-green/30' : 
                            'text-red-500 bg-red-900/20 border border-red-500/30'
                          }`}
                          animate={{
                            scale: item.status === 'Hadir' ? [1, 1.05, 1] : 1,
                          }}
                          transition={{ repeat: Infinity, duration: 2, delay: index * 0.1 }}
                        >
                          {item.status}
                        </motion.span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </motion.div>

        </motion.div>
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
      </div>
    </motion.div>
  );
};

export default MemberDashboard;