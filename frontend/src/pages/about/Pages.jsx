import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Gunakan ini untuk navigasi antar halaman
import Input from '../components/ui/Input';     // Import komponen yang kita buat tadi
import Button from '../components/ui/Button';

const Login = () => {
  // State Logic
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:6543/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Email atau password salah');
      }

      // Simpan Token
      if (data.token) {
        localStorage.setItem('gym_token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Redirect ke Dashboard (misalnya)
        navigate('/dashboard'); 
      }

    } catch (err) {
      console.error("Login Error:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Container Halaman (Full Screen)
    <div className="min-h-screen bg-gym-black flex items-center justify-center px-4 relative overflow-hidden">
      
      {/* Dekorasi Background (Glow Hijau Halus) */}
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-gym-green/5 rounded-full blur-[100px]"></div>

      {/* Card Login */}
      <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-xl p-8 shadow-[0_0_20px_rgba(57,255,20,0.05)] relative z-10">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-white tracking-tighter italic">
            LOGIN <span className="text-gym-green">IRONGYM</span>
          </h2>
          <p className="text-gray-500 text-sm mt-2">Welcome back, Warrior!</p>
        </div>
        
        {/* Notifikasi Error */}
        {error && (
          <div className="bg-red-900/20 border border-red-500/50 text-red-500 p-3 rounded-lg mb-6 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input 
            label="Email Address"
            type="email" 
            placeholder="nama@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <Input 
            label="Password"
            type="password" 
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button type="submit" isLoading={isLoading} variant="primary">
            MASUK SEKARANG
          </Button>
        </form>

        <p className="mt-8 text-center text-gray-400 text-sm">
          Belum punya akun?{' '}
          {/* Gunakan Link dari react-router-dom atau button navigasi */}
          <button onClick={() => navigate('/register')} className="text-gym-green font-bold hover:underline transition">
            Daftar Member Baru
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;