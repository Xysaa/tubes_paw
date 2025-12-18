import React, { useState } from 'react';
import { initialClasses } from './ClassesData';
import { motion, AnimatePresence } from 'framer-motion';

/* ================= FRAMER MOTION VARIANTS ================= */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const modalBackdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalContent = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.25 } },
};
/* ========================================================== */

const TrainerClasses = () => {
  const [classes, setClasses] = useState(initialClasses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentClass, setCurrentClass] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    schedule: '',
    instructor: '',
    capacity: '',
  });

  /* ================= HANDLERS ================= */
  const handleAddNew = () => {
    setCurrentClass(null);
    setFormData({
      name: '',
      description: '',
      schedule: '',
      instructor: '',
      capacity: '',
    });
    setIsModalOpen(true);
  };

  const handleEdit = (cls) => {
    setCurrentClass(cls);
    setFormData(cls);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Yakin ingin menghapus kelas ini?')) {
      setClasses(classes.filter((c) => c.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentClass) {
      setClasses(
        classes.map((c) =>
          c.id === currentClass.id ? { ...formData, id: c.id } : c
        )
      );
    } else {
      setClasses([
        ...classes,
        { ...formData, id: classes.length + 1 },
      ]);
    }

    setIsModalOpen(false);
  };
  /* ============================================ */

  return (
    <motion.div
      className="min-h-screen bg-gym-black py-8"
      initial="hidden"
      animate="visible"
      variants={fadeUp}
    >
      <div className="max-w-7xl mx-auto px-4">

        {/* HEADER */}
        <div className="flex justify-between items-end mb-8 border-b border-zinc-800 pb-6">
          <div>
            <h1 className="text-4xl font-black text-white uppercase italic">
              Management <span className="text-gym-green">Kelas</span>
            </h1>
            <p className="text-gray-400 mt-2">
              Kelola jadwal dan detail kelas latihan
            </p>
          </div>

          <motion.button
            onClick={handleAddNew}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gym-green text-black font-bold py-3 px-6 rounded shadow"
          >
            TAMBAH KELAS
          </motion.button>
        </div>

        {/* GRID */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          {classes.map((cls) => (
            <motion.div
              key={cls.id}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col"
            >
              <span className="text-gym-green text-sm font-bold mb-2">
                {cls.schedule}
              </span>

              <h3 className="text-xl font-black text-white mb-2 uppercase italic">
                {cls.name}
              </h3>

              <p className="text-gray-400 text-sm mb-2">
                Instructor: <span className="text-white">{cls.instructor}</span>
              </p>

              <p className="text-gray-500 text-sm flex-grow mb-4">
                {cls.description}
              </p>

              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-zinc-800">
                <button
                  onClick={() => handleEdit(cls)}
                  className="bg-zinc-800 text-white py-2 rounded font-bold"
                >
                  EDIT
                </button>
                <button
                  onClick={() => handleDelete(cls.id)}
                  className="border border-red-800 text-red-500 py-2 rounded font-bold"
                >
                  HAPUS
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* MODAL */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50"
              variants={modalBackdrop}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <motion.div
                variants={modalContent}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="bg-zinc-900 border border-zinc-700 rounded-xl p-8 w-full max-w-lg"
              >
                <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-gym-green pl-3">
                  {currentClass ? 'Edit Kelas' : 'Tambah Kelas'}
                </h2>

                {/* ===== FORM (STYLE EDIT PLAN) ===== */}
                <form onSubmit={handleSubmit} className="space-y-5">

                  <div>
                    <label className="text-gray-400 text-sm">Nama Kelas</label>
                    <input
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full bg-black border border-zinc-700 rounded px-4 py-3 text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-gray-400 text-sm">Deskripsi</label>
                    <textarea
                      rows="4"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                      className="w-full bg-black border border-zinc-700 rounded px-4 py-3 text-white resize-none"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-400 text-sm">Kapasitas</label>
                      <input
                        type="number"
                        value={formData.capacity}
                        onChange={(e) =>
                          setFormData({ ...formData, capacity: e.target.value })
                        }
                        className="w-full bg-black border border-zinc-700 rounded px-4 py-3 text-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-gray-400 text-sm">Jadwal</label>
                      <input
                        value={formData.schedule}
                        onChange={(e) =>
                          setFormData({ ...formData, schedule: e.target.value })
                        }
                        className="w-full bg-black border border-zinc-700 rounded px-4 py-3 text-white"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-gray-400 text-sm">Instructor</label>
                    <input
                      value={formData.instructor}
                      onChange={(e) =>
                        setFormData({ ...formData, instructor: e.target.value })
                      }
                      className="w-full bg-black border border-zinc-700 rounded px-4 py-3 text-white"
                      required
                    />
                  </div>

                  <div className="flex justify-between pt-6">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="text-gray-400 font-bold hover:text-white"
                    >
                      BATAL
                    </button>
                    <button
                      type="submit"
                      className="bg-gym-green text-black font-bold px-8 py-3 rounded"
                    >
                      SIMPAN
                    </button>
                  </div>
                </form>
                {/* ================================= */}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  );
};

export default TrainerClasses;

