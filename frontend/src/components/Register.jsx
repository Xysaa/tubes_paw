import React, { useState } from 'react';

const Register = ({ onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // 1. URL disesuaikan dengan routes.py (/api/auth/register)
      const response = await fetch('http://localhost:6543/api/auth/register', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          // Jika backend butuh header khusus (biasanya tidak untuk register public)
        },
        body: JSON.stringify({ 
          name: name, 
          email: email, 
          password: password 
        }),
      });
      
      const data = await response.json();
      
      // 2. Cek jika respon tidak OK (status code bukan 2xx)
      if (!response.ok) {
        throw new Error(data.error || data.message || 'Registrasi gagal');
      }

      // 3. Sukses
      setSuccess('Registrasi berhasil! Mengalihkan ke halaman login...');
      
      // Kosongkan form
      setName('');
      setEmail('');
      setPassword('');

      // Redirect ke halaman login setelah 2 detik
      setTimeout(() => {
        onSwitchToLogin(); 
      }, 2000);
      
    } catch (err) {
      console.error("Register Error:", err);
      // Tampilkan pesan error dari backend (misal: "Email already registered")
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gym-black flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-xl p-8 shadow-[0_0_20px_rgba(57,255,20,0.1)]">
        <h2 className="text-3xl font-bold text-white text-center mb-6">DAFTAR <span className="text-gym-green">MEMBER</span></h2>
        
        {/* Notifikasi Error */}
        {error && (
          <div className="bg-red-900/30 border border-red-500 text-red-500 p-3 rounded mb-4 text-sm text-center animate-pulse">
            {error}
          </div>
        )}
        
        {/* Notifikasi Sukses */}
        {success && (
          <div className="bg-green-900/30 border border-green-500 text-green-500 p-3 rounded mb-4 text-sm text-center">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-400 text-sm font-bold mb-2">Nama Lengkap</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-black border border-gray-700 text-white rounded p-3 focus:outline-none focus:border-gym-green transition"
              placeholder="John Doe"
              required
              minLength={3}
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm font-bold mb-2">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black border border-gray-700 text-white rounded p-3 focus:outline-none focus:border-gym-green transition"
              placeholder="nama@email.com"
              required
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm font-bold mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black border border-gray-700 text-white rounded p-3 focus:outline-none focus:border-gym-green transition"
              placeholder="Minimal 6 karakter"
              required
              minLength={6}
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-gym-green text-black font-bold py-3 rounded hover:bg-white hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                MEMPROSES...
              </span>
            ) : 'DAFTAR SEKARANG'}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400 text-sm">
          Sudah punya akun?{' '}
          <button onClick={onSwitchToLogin} className="text-gym-green font-bold hover:underline">
            Login disini
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;