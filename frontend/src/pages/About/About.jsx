import React from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gym-black">
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-zinc-900 to-gym-black border-b border-zinc-800 py-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg1NywyNTUsMjAsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter mb-6">
              ABOUT <span className="text-gym-green">HexaFit</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Transforming lives through fitness since 2020. 
              More than just a gym, we're a community.
            </p>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-4xl font-black text-white mb-6">
              OUR <span className="text-gym-green">STORY</span>
            </h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              HexaFit dimulai dari mimpi sederhana: menciptakan ruang di mana setiap orang, 
              dari pemula hingga atlet profesional, dapat mencapai potensi penuh mereka.
            </p>
            <p className="text-gray-400 leading-relaxed mb-4">
              Dengan peralatan modern, trainer bersertifikat internasional, dan komunitas 
              yang suportif, kami telah membantu ribuan member mencapai transformasi fisik 
              dan mental mereka.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Bagi kami, fitness bukan hanya tentang angka di timbangan atau otot di cermin. 
              Ini tentang membangun kepercayaan diri, disiplin, dan gaya hidup sehat yang berkelanjutan.
            </p>
          </div>
          
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-gym-green/20 to-transparent rounded-2xl border border-gym-green/30 flex items-center justify-center">
              <svg className="w-32 h-32 text-gym-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-20">
          <h2 className="text-4xl font-black text-center text-white mb-12">
            OUR <span className="text-gym-green">VALUES</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 hover:border-gym-green transition group">
              <div className="w-16 h-16 bg-gym-green/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-gym-green/20 transition">
                <svg className="w-8 h-8 text-gym-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Community First</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Kami membangun lingkungan yang supportif di mana setiap member merasa 
                diterima dan termotivasi untuk mencapai tujuan mereka.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 hover:border-gym-green transition group">
              <div className="w-16 h-16 bg-gym-green/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-gym-green/20 transition">
                <svg className="w-8 h-8 text-gym-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Excellence</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Dari peralatan terbaru hingga trainer tersertifikasi, kami berkomitmen 
                memberikan pengalaman fitness terbaik di kelasnya.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 hover:border-gym-green transition group">
              <div className="w-16 h-16 bg-gym-green/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-gym-green/20 transition">
                <svg className="w-8 h-8 text-gym-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Transformation</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Kami percaya setiap orang memiliki potensi luar biasa. Misi kami adalah 
                membantu Anda menemukan dan mewujudkannya.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 border border-zinc-700 rounded-2xl p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-5xl font-black text-gym-green mb-2">5+</p>
              <p className="text-gray-400 text-sm">Years Experience</p>
            </div>
            <div>
              <p className="text-5xl font-black text-gym-green mb-2">2K+</p>
              <p className="text-gray-400 text-sm">Active Members</p>
            </div>
            <div>
              <p className="text-5xl font-black text-gym-green mb-2">20+</p>
              <p className="text-gray-400 text-sm">Expert Trainers</p>
            </div>
            <div>
              <p className="text-5xl font-black text-gym-green mb-2">30+</p>
              <p className="text-gray-400 text-sm">Class Programs</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <h2 className="text-3xl font-black text-white mb-4">
            READY TO <span className="text-gym-green">TRANSFORM?</span>
          </h2>
          <p className="text-gray-400 mb-8">Join our community and start your fitness journey today.</p>
          <button 
            onClick={() => navigate('/register')}
            className="px-8 py-4 bg-gym-green text-black font-extrabold rounded hover:bg-white transition duration-300 shadow-[0_0_20px_rgba(57,255,20,0.4)]"
          >
            JOIN NOW
          </button>
        </div>

      </div>
    </div>
  );
};

export default About;