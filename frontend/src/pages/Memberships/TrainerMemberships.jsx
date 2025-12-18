import React, { useState } from 'react';
import { initialPlans } from "./MembershipsData";
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

const TrainerMemberships = () => {
  const [plans, setPlans] = useState(initialPlans);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPlan, setCurrentPlan] = useState(null);

  const [formData, setFormData] = useState({
    name: '', description: '', price: '', duration_days: ''
  });

  const formatRupiah = (number) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(number);

  const handleAddNew = () => {
    setCurrentPlan(null);
    setFormData({ name: '', description: '', price: '', duration_days: '' });
    setIsModalOpen(true);
  };

  const handleEdit = (plan) => {
    setCurrentPlan(plan);
    setFormData(plan);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Hapus paket membership ini?')) {
      setPlans(plans.filter(p => p.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentPlan) {
      setPlans(plans.map(p =>
        p.id === currentPlan.id
          ? { ...formData, id: p.id, price: +formData.price, duration_days: +formData.duration_days }
          : p
      ));
    } else {
      setPlans([
        ...plans,
        { ...formData, id: Date.now(), price: +formData.price, duration_days: +formData.duration_days }
      ]);
    }
    setIsModalOpen(false);
  };

  return (
    <motion.div
      className="min-h-screen bg-gym-black py-8 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      animate="visible"
      variants={fadeUp}
    >
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col md:flex-row justify-between items-end gap-4 mb-8 border-b border-zinc-800 pb-6"
        >
          <div>
            <h1 className="text-4xl font-black text-white mb-2 uppercase italic">
              Membership <span className="text-gym-green">Plans</span>
            </h1>
            <p className="text-gray-400">
              Atur paket harga dan durasi membership.
            </p>
          </div>

          <motion.button
            onClick={handleAddNew}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gym-green hover:bg-white text-black font-bold py-3 px-6 rounded shadow-[0_0_15px_rgba(57,255,20,0.3)] transition-all flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
            </svg>
            TAMBAH PLAN
          </motion.button>
        </motion.div>

        {/* GRID */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          {plans.map(plan => (
            <motion.div
              key={plan.id}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col hover:border-gym-green transition-all duration-300"
            >
              <div className="mb-4">
                <h3 className="text-2xl font-black text-white italic uppercase">
                  {plan.name}
                </h3>
                <div className="text-gym-green text-xl font-bold mt-1">
                  {formatRupiah(plan.price)}
                  <span className="text-sm text-gray-500 font-normal">
                    {' '} / {plan.duration_days} Hari
                  </span>
                </div>
              </div>

              <p className="text-gray-400 text-sm mb-6 flex-grow">
                {plan.description}
              </p>

              <div className="grid grid-cols-2 gap-3 mt-auto pt-4 border-t border-zinc-800">
                <button
                  onClick={() => handleEdit(plan)}
                  className="py-2 bg-zinc-800 text-white hover:bg-zinc-700 rounded font-bold text-sm"
                >
                  EDIT
                </button>
                <button
                  onClick={() => handleDelete(plan.id)}
                  className="py-2 bg-transparent text-red-500 border border-red-900/50 hover:bg-red-900/20 rounded font-bold text-sm"
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
              className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
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
                className="bg-zinc-900 border border-zinc-700 rounded-xl p-8 w-full max-w-lg shadow-2xl"
              >
                <h2 className="text-2xl font-bold mb-6 text-white border-l-4 border-gym-green pl-3">
                  {currentPlan ? 'Edit Plan' : 'Buat Plan Baru'}
                </h2>

                {/* FORM TIDAK DIUBAH */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-gray-400 text-sm block mb-1">Nama Plan</label>
                    <input
                      className="w-full bg-black border border-zinc-700 rounded p-3 text-white"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="text-gray-400 text-sm block mb-1">Deskripsi</label>
                    <textarea
                      className="w-full bg-black border border-zinc-700 rounded p-3 text-white h-24 resize-none"
                      value={formData.description}
                      onChange={e => setFormData({ ...formData, description: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-400 text-sm block mb-1">Harga (IDR)</label>
                      <input
                        type="number"
                        className="w-full bg-black border border-zinc-700 rounded p-3 text-white"
                        value={formData.price}
                        onChange={e => setFormData({ ...formData, price: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <label className="text-gray-400 text-sm block mb-1">Durasi (Hari)</label>
                      <input
                        type="number"
                        className="w-full bg-black border border-zinc-700 rounded p-3 text-white"
                        value={formData.duration_days}
                        onChange={e => setFormData({ ...formData, duration_days: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 py-3 text-gray-400 font-bold hover:text-white"
                    >
                      BATAL
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 bg-gym-green text-black font-bold rounded hover:bg-white"
                    >
                      SIMPAN
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  );
};

export default TrainerMemberships;
