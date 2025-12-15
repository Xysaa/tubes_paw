import React from 'react';

const ClassCard = ({ cls }) => {
  return (
    <div className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-gym-green transition-all duration-300 hover:shadow-[0_0_15px_rgba(57,255,20,0.15)] group flex flex-col">
      {/* Card Header (Schedule) */}
      <div className="bg-zinc-800/50 p-4 border-b border-zinc-800 flex justify-between items-center">
        <div className="flex items-center text-gym-green">
          {/* Icon Clock */}
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span className="text-sm font-bold tracking-wider uppercase">{cls.schedule}</span>
        </div>
        <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" title="Live / Available"></div>
      </div>

      {/* Card Body */}
      <div className="p-6 flex-grow">
        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-gym-green transition-colors">
          {cls.name}
        </h3>
        <p className="text-gray-500 text-sm mb-4">
          Instructor: <span className="text-gray-300">{cls.instructor}</span>
        </p>
        <p className="text-gray-400 text-sm leading-relaxed">
          {cls.description || "Deskripsi kelas belum tersedia. Hubungi admin untuk detail lebih lanjut."}
        </p>
      </div>

      {/* Card Footer (Button) */}
      <div className="p-6 pt-0 mt-auto">
        <button className="w-full py-3 bg-transparent border border-zinc-600 text-white rounded-lg font-bold hover:bg-gym-green hover:border-gym-green hover:text-black transition-all duration-300 flex justify-center items-center group-hover:bg-gym-green group-hover:text-black group-hover:border-gym-green">
          BOOKING SLOT
          {/* Icon Arrow */}
          <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ClassCard;
