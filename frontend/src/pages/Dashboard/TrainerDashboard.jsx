import React, { useState } from 'react';
import { useAuth } from '../../context/authContext';

const TrainerDashboard = () => {
  const { user } = useAuth();
  
  // Dummy data untuk trainer
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

  return (
    <div className="min-h-screen bg-gym-black py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 border border-zinc-700 rounded-xl p-8 mb-8">
          <h1 className="text-4xl font-black text-white mb-2">
            Trainer Portal, <span className="text-gym-green">{user?.name}!</span>
          </h1>
          <p className="text-gray-400">Role: <span className="text-gym-green font-bold">Trainer</span></p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-center">
            <svg className="w-12 h-12 text-gym-green mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
            <p className="text-4xl font-black text-gym-green">{stats.totalClasses}</p>
            <p className="text-gray-400 text-sm mt-1">Total Classes</p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-center">
            <svg className="w-12 h-12 text-gym-green mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            <p className="text-4xl font-black text-gym-green">{stats.totalMembers}</p>
            <p className="text-gray-400 text-sm mt-1">Total Members</p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-center">
            <svg className="w-12 h-12 text-gym-green mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p className="text-4xl font-black text-gym-green">{stats.upcomingToday}</p>
            <p className="text-gray-400 text-sm mt-1">Classes Today</p>
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <svg className="w-6 h-6 mr-2 text-gym-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            Today's Schedule
          </h2>

          <div className="space-y-4">
            {todaySchedule.map((session) => (
              <div key={session.id} className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-5 flex justify-between items-center hover:border-gym-green transition">
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
                <button className="px-6 py-2 bg-gym-green text-black rounded font-bold hover:bg-white transition">
                  VIEW DETAILS
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* My Classes List */}
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

      </div>
    </div>
  );
};

export default TrainerDashboard;