import React from 'react';

const Hero = () => {
  return (
    <div className="relative bg-gym-dark overflow-hidden border-b border-gray-800">
      {/* Background Gradient */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gym-green/10 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative z-10">
        <div className="lg:w-2/3">
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter leading-none mb-6">
            NO PAIN <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gym-green to-green-600">
              NO GAIN
            </span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl mb-8 max-w-xl">
            Bergabunglah dengan komunitas kebugaran terbaik. Fasilitas lengkap, pelatih ahli, dan lingkungan yang mendukung transformasi Anda.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-4 bg-gym-green text-black font-extrabold rounded hover:bg-white transition duration-300 shadow-[0_0_20px_rgba(57,255,20,0.4)]">
              DAFTAR SEKARANG
            </button>
            <button className="px-8 py-4 border border-gray-600 text-white font-bold rounded hover:border-white hover:bg-white hover:text-black transition duration-300">
              LIHAT JADWAL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
