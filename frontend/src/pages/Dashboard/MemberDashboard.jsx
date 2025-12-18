import React, { useState } from 'react';
import { useAuth } from '../../context/authContext';
import { Link } from 'react-router-dom';
// Import data dummy history
import { attendanceHistory } from './AttendanceData';

const MemberDashboard = () => {
  const { user } = useAuth();
  
  // Data lama
  const [myBookings] = useState([
    { id: 1, className: "BODY COMBAT", date: "2025-01-20", time: "19:00", trainer: "Coach John", status: "confirmed" },
    { id: 2, className: "YOGA FLOW", date: "2025-01-22", time: "18:00", trainer: "Coach Sarah", status: "confirmed" }
  ]);

  const [membershipInfo] = useState({
    plan: "Gold Membership", startDate: "2025-01-01", endDate: "2025-12-31", remainingClasses: 45
  });

  // Data history baru
  const [history] = useState(attendanceHistory);

  return (
    <div className="min-h-screen bg-gym-black py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Welcome Header (TIDAK BERUBAH) */}
        <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 border border-zinc-700 rounded-xl p-8 mb-8">
          <h1 className="text-4xl font-black text-white mb-2">Welcome Back, <span className="text-gym-green">{user?.name}!</span></h1>
          <p className="text-gray-400">Role: <span className="text-gym-green font-bold">Member</span></p>
        </div>

        {/* Stats Card (TIDAK BERUBAH - Disederhanakan kodenya agar muat di chat) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
           {/* Card Membership */}
           <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <p className="text-lg font-bold text-white mb-2">Membership</p>
              <p className="text-2xl font-bold text-gym-green mb-1">{membershipInfo.plan}</p>
              <p className="text-sm text-gray-500">Valid until {membershipInfo.endDate}</p>
           </div>
           {/* Card Classes Left */}
           <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <p className="text-lg font-bold text-white mb-2">Classes Left</p>
              <p className="text-4xl font-black text-gym-green">{membershipInfo.remainingClasses}</p>
           </div>
           {/* Card Next Session */}
           <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <p className="text-lg font-bold text-white mb-2">Next Session</p>
              <p className="text-xl font-bold text-white mb-1">BODY COMBAT</p>
              <p className="text-sm text-gray-500">Mon, Jan 20 at 19:00</p>
           </div>
        </div>

        {/* --- BAGIAN UTAMA (LAYOUT BARU: 2 KOLOM) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* KOLOM KIRI: UPCOMING BOOKINGS (YANG LAMA) */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 h-fit">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <svg className="w-6 h-6 mr-2 text-gym-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
              My Upcoming Classes
            </h2>
            <div className="space-y-4">
              {myBookings.map((booking) => (
                <div key={booking.id} className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-4 flex justify-between items-center hover:border-gym-green transition">
                  <div>
                    <h3 className="text-lg font-bold text-white">{booking.className}</h3>
                    <p className="text-gray-400 text-sm">{booking.date} at {booking.time}</p>
                  </div>
                  <button className="px-3 py-1 bg-red-900/30 text-red-500 border border-red-900 rounded text-xs font-bold hover:bg-red-900/50">CANCEL</button>
                </div>
              ))}
              <Link to="/member/classes" className="mt-4 block w-full py-3 bg-zinc-800 text-center text-gray-300 font-bold rounded hover:bg-gym-green hover:text-black transition">
                BOOK NEW CLASS
              </Link>
            </div>
          </div>

          {/* KOLOM KANAN: ATTENDANCE HISTORY (FITUR BARU) */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 h-fit">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <svg className="w-6 h-6 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              Attendance History
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-500 text-sm border-b border-zinc-800">
                    <th className="pb-3 pl-2">Class</th>
                    <th className="pb-3">Date</th>
                    <th className="pb-3 text-right pr-2">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {history.map((item) => (
                    <tr key={item.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition">
                      <td className="py-3 pl-2 text-white font-medium">{item.className}</td>
                      <td className="py-3 text-gray-400">{item.date}</td>
                      <td className="py-3 text-right pr-2">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                          item.status === 'Hadir' ? 'text-gym-green bg-green-900/20 border border-gym-green/30' : 
                          'text-red-500 bg-red-900/20 border border-red-500/30'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;