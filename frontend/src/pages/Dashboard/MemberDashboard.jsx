import React, { useState } from 'react';
import { useAuth } from '../../context/authContext';
import { Link } from 'react-router-dom';

const MemberDashboard = () => {
  const { user } = useAuth();
  
  // Dummy data untuk member
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

  return (
    <div className="min-h-screen bg-gym-black py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Welcome Header */}
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

      </div>
    </div>
  );
};

export default MemberDashboard;