import React, { useState, useEffect } from 'react';

// PERHATIKAN: Path mundur 2 langkah (../../) karena file ada di dalam folder Home
import Hero from '../../components/Hero'; 
import ClassCard from '../../components/ClassCard'; 
import LoadingSpinner from '../../components/ui/LoadingSpinner'; // Sesuaikan lokasi file kamu
import ErrorMessage from '../../components/ui/ErrorMessage';     // Sesuaikan lokasi file kamu

const Home = () => {
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch('http://localhost:6543/api/classes');
        if (!response.ok) throw new Error('Gagal mengambil data kelas');
        const data = await response.json();
        setClasses(data.classes || (Array.isArray(data) ? data : []));
      } catch (err) {
        console.error(err);
        setError('Gagal memuat jadwal kelas. Pastikan backend berjalan.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchClasses();
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
              <ClassCard key={cls.id || cls.name} cls={cls} />
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