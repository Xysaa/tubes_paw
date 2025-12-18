import React, { useState, useEffect } from 'react';
import ClassCard from '../../components/ClassCard'; // Pastikan path import ini benar
import { useAuth } from '../../context/authContext';
import { initialClasses } from "./ClassesData";
import LoadingSpinner from '../../components/LoadingSpinner'; 

const MemberClasses = () => {
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulasi fetch data
    setTimeout(() => {
      setClasses(initialClasses);
      setIsLoading(false);
    }, 500);
  }, []);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gym-black py-12 px-4 sm:px-6 lg:px-8 pt-24">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-10 border-b border-zinc-800 pb-6">
          <h1 className="text-4xl font-black text-white mb-2 uppercase">
            Kelas <span className="text-gym-green">Tersedia</span>
          </h1>
          <p className="text-gray-400">Pilih kelas favoritmu dan mulai latihan hari ini.</p>
        </div>

        {/* Grid Classes */}
        {classes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map((cls) => (
              <ClassCard key={cls.id} cls={cls} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-12">
            <p>Belum ada kelas yang tersedia saat ini.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberClasses;