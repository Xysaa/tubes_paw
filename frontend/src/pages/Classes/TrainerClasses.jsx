import React, { useState } from 'react';
import { useAuth } from '../../context/authContext';
import { initialClasses } from './ClassesData'; // Import data dummy tadi

const TrainerClasses = () => {
  // --- STATE ---
  const [classes, setClasses] = useState(initialClasses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentClass, setCurrentClass] = useState(null); // Jika null = Mode Tambah, Jika isi = Mode Edit
  
  const [formData, setFormData] = useState({
    name: '', schedule: '', instructor: '', capacity: '', description: ''
  });

  // --- HANDLERS ---
  
  // Buka Modal Tambah
  const handleAddNew = () => {
    setCurrentClass(null);
    setFormData({ name: '', schedule: '', instructor: '', capacity: '', description: '' });
    setIsModalOpen(true);
  };

  // Buka Modal Edit
  const handleEdit = (cls) => {
    setCurrentClass(cls);
    setFormData(cls);
    setIsModalOpen(true);
  };

  // Hapus Kelas
  const handleDelete = (id) => {
    if (window.confirm('Yakin ingin menghapus kelas ini?')) {
      setClasses(classes.filter((c) => c.id !== id));
    }
  };

  // Simpan Data (Create / Update)
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (currentClass) {
      // Logic Update
      setClasses(classes.map((c) => 
        c.id === currentClass.id ? { ...formData, id: currentClass.id } : c
      ));
    } else {
      // Logic Create
      const newId = classes.length + 1;
      setClasses([...classes, { ...formData, id: newId }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gym-black py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER SECTION (Style mirip Dashboard) */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-4 mb-8 border-b border-zinc-800 pb-6">
          <div>
            <h1 className="text-4xl font-black text-white mb-2 uppercase italic">
              Management <span className="text-gym-green">Kelas</span>
            </h1>
            <p className="text-gray-400">Kelola jadwal, kapasitas, dan detail kelas latihan.</p>
          </div>
          
          <button 
            onClick={handleAddNew}
            className="bg-gym-green hover:bg-white text-black font-bold py-3 px-6 rounded transition-all shadow-[0_0_15px_rgba(57,255,20,0.3)] flex items-center gap-2"
          >
            {/* Icon Plus */}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
            TAMBAH KELAS
          </button>
        </div>

        {/* GRID CLASSES (Style mirip ClassCard Member) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((cls) => (
            <div key={cls.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 relative group hover:border-gym-green transition-all duration-300 flex flex-col h-full">
              
              {/* Jadwal */}
              <div className="flex items-center gap-2 text-gym-green font-bold text-sm mb-4 uppercase tracking-wide">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                {cls.schedule}
              </div>

              {/* Judul & Info */}
              <h3 className="text-2xl font-black text-white mb-2 uppercase italic">{cls.name}</h3>
              <p className="text-sm text-gray-400 mb-4">Instructor: <span className="text-white">{cls.instructor}</span></p>
              
              {/* Deskripsi */}
              <p className="text-gray-500 text-sm mb-6 flex-grow line-clamp-3">
                {cls.description}
              </p>

              {/* Action Buttons (CRUD) */}
              <div className="grid grid-cols-2 gap-3 mt-auto pt-4 border-t border-zinc-800">
                <button 
                  onClick={() => handleEdit(cls)}
                  className="py-2 rounded font-bold text-sm bg-zinc-800 text-white hover:bg-zinc-700 transition-colors border border-zinc-700"
                >
                  EDIT
                </button>
                <button 
                  onClick={() => handleDelete(cls.id)}
                  className="py-2 rounded font-bold text-sm bg-transparent text-red-500 hover:bg-red-900/20 transition-colors border border-red-900/50"
                >
                  HAPUS
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* MODAL FORM (Popup) */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-8 w-full max-w-lg shadow-2xl relative">
              <h2 className="text-2xl font-bold mb-6 text-white border-l-4 border-gym-green pl-3">
                {currentClass ? 'Edit Kelas' : 'Buat Kelas Baru'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-gray-400 text-sm block mb-1">Nama Kelas</label>
                  <input 
                    className="w-full bg-black border border-zinc-700 rounded p-3 text-white focus:border-gym-green focus:outline-none"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-400 text-sm block mb-1">Jadwal</label>
                    <input 
                      className="w-full bg-black border border-zinc-700 rounded p-3 text-white focus:border-gym-green focus:outline-none"
                      value={formData.schedule}
                      onChange={(e) => setFormData({...formData, schedule: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm block mb-1">Kapasitas</label>
                    <input 
                      type="number"
                      className="w-full bg-black border border-zinc-700 rounded p-3 text-white focus:border-gym-green focus:outline-none"
                      value={formData.capacity}
                      onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-gray-400 text-sm block mb-1">Instructor</label>
                  <input 
                    className="w-full bg-black border border-zinc-700 rounded p-3 text-white focus:border-gym-green focus:outline-none"
                    value={formData.instructor}
                    onChange={(e) => setFormData({...formData, instructor: e.target.value})}
                  />
                </div>

                <div>
                  <label className="text-gray-400 text-sm block mb-1">Deskripsi</label>
                  <textarea 
                    className="w-full bg-black border border-zinc-700 rounded p-3 text-white focus:border-gym-green focus:outline-none h-24 resize-none"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>

                <div className="flex gap-3 mt-6 pt-4">
                  <button 
                    type="button" 
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-3 text-gray-400 font-bold hover:text-white transition-colors"
                  >
                    BATAL
                  </button>
                  <button 
                    type="submit" 
                    className="flex-1 py-3 bg-gym-green text-black font-bold rounded hover:bg-white transition-colors"
                  >
                    SIMPAN
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default TrainerClasses;