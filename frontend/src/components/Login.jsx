import React, { useState } from 'react';

const Login = ({ onLogin, onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // 1. URL disesuaikan dengan routes.py (/api/auth/login)
      const response = await fetch('http://localhost:6543/api/auth/login', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ 
          email: email, 
          password: password 
        }),
      });

      const data = await response.json();

      // 2. Cek status response
      if (!response.ok) {
        throw new Error(data.error || data.message || 'Email atau password salah');
      }

      // 3. Simpan token (jika ada) ke localStorage untuk sesi persisten
      if (data.token) {
        localStorage.setItem('gym_token', data.token);
      }

      // 4. Panggil fungsi onLogin dari App.jsx dengan data user
      // Backend harus mengembalikan object user, jika tidak kita pakai fallback
      const userData = data.user || { name: 'User', email: email, role: 'member' };
      onLogin(userData);

    } catch (err) {
      console.error("Login Error:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gym-black flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-xl p-8 shadow-[0_0_20px_rgba(57,255,20,0.1)]">
        <h2 className="text-3xl font-bold text-white text-center mb-6">LOGIN <span className="text-gym-green">IRONGYM</span></h2>
        
        {/* Notifikasi Error */}
        {error && (
          <div className="bg-red-900/30 border border-red-500 text-red-500 p-3 rounded mb-4 text-sm text-center animate-pulse">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
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
              placeholder="********"
              required
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
            ) : 'MASUK SEKARANG'}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400 text-sm">
          Belum punya akun?{' '}
          <button onClick={onSwitchToRegister} className="text-gym-green font-bold hover:underline">
            Daftar disini
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;