import React, { useState } from 'react';
import { initialPlans, activeMembership } from "./MembershipsData";

const MemberMemberships = () => {
  // Simulasi state: user sudah punya membership atau belum
  // Nanti diganti dengan fetch API dari 'member_my_membership'
  const [myMembership, setMyMembership] = useState(activeMembership); 
  const [availablePlans] = useState(initialPlans);

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const handleSubscribe = (planId) => {
    if(window.confirm("Langganan paket ini sekarang?")) {
        alert("Integrasi Backend: Kirim POST ke /api/memberships/" + planId + "/subscribe");
    }
  };

  return (
    <div className="min-h-screen bg-gym-black py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* SECTION 1: MY ACTIVE MEMBERSHIP */}
        <div className="mb-12">
          <h2 className="text-3xl font-black text-white mb-6 uppercase italic border-l-4 border-gym-green pl-4">
            Membership <span className="text-gym-green">Status</span>
          </h2>

          {myMembership ? (
            <div className="bg-gradient-to-r from-zinc-900 to-black border border-zinc-700 rounded-2xl p-8 relative overflow-hidden shadow-2xl">
              {/* Decorative Background */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gym-green/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <div className="inline-block px-3 py-1 bg-green-900/30 border border-green-500 text-green-400 text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
                    {myMembership.status}
                  </div>
                  <h3 className="text-4xl font-black text-white italic mb-1">{myMembership.plan.name}</h3>
                  <p className="text-gray-400">Valid until: <span className="text-white font-bold">{formatDate(myMembership.end_at)}</span></p>
                </div>

                <div className="text-right">
                    <p className="text-sm text-gray-400 mb-1">Started at</p>
                    <p className="text-xl font-bold text-white">{formatDate(myMembership.start_at)}</p>
                </div>
              </div>
            </div>
          ) : (
             <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-xl text-center">
                <p className="text-gray-400 mb-4">Anda belum memiliki membership aktif.</p>
                <p className="text-gym-green font-bold">Pilih paket di bawah untuk mulai berlatih!</p>
             </div>
          )}
        </div>

        {/* SECTION 2: AVAILABLE PLANS */}
        <div>
          <h2 className="text-3xl font-black text-white mb-6 uppercase italic border-l-4 border-white pl-4">
            Available <span className="text-gray-500">Plans</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {availablePlans.map((plan) => (
              <div key={plan.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 hover:border-gym-green hover:-translate-y-1 transition-all duration-300 flex flex-col">
                <h3 className="text-2xl font-black text-white italic uppercase mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold text-gym-green mb-4">
                  {formatRupiah(plan.price)}
                  <span className="text-sm text-gray-500 font-normal block mt-1">Durasi: {plan.duration_days} Hari</span>
                </div>
                
                <ul className="text-gray-400 text-sm mb-8 space-y-3 flex-grow border-t border-zinc-800 pt-4 mt-2">
                   {/* Split deskripsi kalo ada koma/titik, atau tampilkan raw */}
                   <li className="flex items-start gap-2">
                     <svg className="w-5 h-5 text-gym-green shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                     {plan.description}
                   </li>
                   <li className="flex items-start gap-2">
                     <svg className="w-5 h-5 text-gym-green shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                     Akses Fasilitas Gym
                   </li>
                </ul>

                <button 
                  onClick={() => handleSubscribe(plan.id)}
                  className="w-full py-4 bg-white hover:bg-gym-green text-black font-black uppercase tracking-wider rounded transition-colors"
                >
                  SUBSCRIBE NOW
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default MemberMemberships;