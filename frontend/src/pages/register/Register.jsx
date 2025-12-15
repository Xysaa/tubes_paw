import React, { useState } from 'react';

const Register = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:6543/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Registrasi gagal');

      setSuccess('Registrasi Berhasil! Mengalihkan...');
      setTimeout(onSwitchToLogin, 2000);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gym-black flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-xl p-8 shadow-[0_0_20px_rgba(57,255,20,0.1)]">
        <h2 className="text-3xl font-bold text-white text-center mb-6">DAFTAR <span className="text-gym-green">MEMBER</span></h2>
        {error && <div className="bg-red-900/30 text-red-500 p-3 rounded mb-4 text-center text-sm border border-red-500">{error}</div>}
        {success && <div className="bg-green-900/30 text-green-500 p-3 rounded mb-4 text-center text-sm border border-green-500">{success}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <input type="text" placeholder="Nama Lengkap" value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})} className="w-full bg-black border border-zinc-700 text-white p-3 rounded focus:border-gym-green outline-none" required />
          <input type="email" placeholder="Email" value={formData.email} onChange={e=>setFormData({...formData, email: e.target.value})} className="w-full bg-black border border-zinc-700 text-white p-3 rounded focus:border-gym-green outline-none" required />
          <input type="password" placeholder="Password" value={formData.password} onChange={e=>setFormData({...formData, password: e.target.value})} className="w-full bg-black border border-zinc-700 text-white p-3 rounded focus:border-gym-green outline-none" required />
          <button disabled={loading} className="w-full bg-gym-green text-black font-bold py-3 rounded hover:bg-white transition disabled:opacity-50">
            {loading ? 'MEMPROSES...' : 'DAFTAR SEKARANG'}
          </button>
        </form>
        <p className="mt-6 text-center text-gray-400 text-sm">Sudah punya akun? <button onClick={onSwitchToLogin} className="text-gym-green font-bold hover:underline">Login disini</button></p>
      </div>
    </div>
  );
};

export default Register;