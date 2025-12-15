import React, { useState, useEffect } from 'react';

import Hero from '../../components/Hero'; 
import ClassCard from '../../components/ClassCard'; 
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';

const Home = () => {
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // ✅ SIMULASI LOADING (1 detik)
    setTimeout(() => {
      // ✅ DATA DUMMY (Ganti nanti dengan API backend)
      const dummyClasses = [
        {
          id: 1,
          name: "BODY COMBAT",
          schedule: "Senin & Rabu 19:00",
          instructor: "Coach John",
          capacity: 20,
          description: "Kelas high-intensity yang menggabungkan gerakan bela diri dan kardio untuk membakar kalori maksimal."
        },
        {
          id: 2,
          name: "YOGA FLOW",
          schedule: "Selasa & Kamis 18:00",
          instructor: "Coach Sarah",
          capacity: 15,
          description: "Sesi yoga yang fokus pada fleksibilitas, keseimbangan, dan relaksasi pikiran."
        },
        {
          id: 3,
          name: "STRENGTH TRAINING",
          schedule: "Setiap Hari 17:00",
          instructor: "Coach Mike",
          capacity: 25,
          description: "Latihan beban untuk membangun massa otot dan meningkatkan kekuatan tubuh secara keseluruhan."
        },
        {
          id: 4,
          name: "ZUMBA PARTY",
          schedule: "Jumat 19:30",
          instructor: "Coach Maria",
          capacity: 30,
          description: "Kelas dance fitness yang energik dengan musik latin dan gerakan yang menyenangkan."
        },
        {
          id: 5,
          name: "SPINNING CLASS",
          schedule: "Sabtu & Minggu 07:00",
          instructor: "Coach Alex",
          capacity: 20,
          description: "Cycling indoor dengan intensitas tinggi untuk meningkatkan stamina dan membakar lemak."
        },
        {
          id: 6,
          name: "PILATES CORE",
          schedule: "Rabu & Jumat 06:00",
          instructor: "Coach Emma",
          capacity: 12,
          description: "Latihan fokus pada core strength, postur tubuh, dan kontrol pernapasan."
        }
      ];

      setClasses(dummyClasses);
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={() => window.location.reload()} />;

  return (
    <>
      <Hero />
      <div id="classes" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-gym-black">
        <div className="flex items-end justify-between mb-12 border-b border-gray-800 pb-4">
          <div>
            <h2 className="text-3xl font-bold text-white uppercase tracking-wide">
              Kelas <span className="text-gym-green">Tersedia</span>
            </h2>
            <p className="text-gray-500 mt-2">Pilih kelas dan mulai latihanmu.</p>
          </div>
        </div>
        
        {classes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {classes.map((cls) => (
              <ClassCard key={cls.id} cls={cls} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-gray-500 bg-zinc-900 rounded-lg border border-zinc-800">
            <p>Belum ada kelas yang tersedia saat ini.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;