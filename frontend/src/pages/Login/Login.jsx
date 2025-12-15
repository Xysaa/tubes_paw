import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import LoadingSpinner from '../components/ui/LoadingSpinner'; // Pastikan ada
import ErrorMessage from '../components/ui/ErrorMessage';     // Pastikan ada

const Login = () => {
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
      
      if (!response.ok) throw new Error(data.message || 'Login Gagal. Cek email/password.');

      // Simpan token
      localStorage.setItem('gym_token', data.token);
      // Simpan data user (opsional, buat ditampilkan di dashboard)
      localStorage.setItem('user', JSON.stringify(data.user));

      navigate('/dashboard');

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Jika loading penuh (opsional, atau bisa pakai loading di tombol saja)
  // if (isLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gym-black flex items-center justify-center px-4 relative overflow-hidden">
       {/* Background Glow */}
       <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-gym-green/5 rounded-full blur-[100px]"></div>

      <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-xl p-8 shadow-lg relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-white italic tracking-tighter">
            LOGIN <span className="text-gym-green">IRONGYM</span>
          </h2>
          <p className="text-gray-500 text-sm mt-2">Welcome back, Warrior!</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-900/30 border border-red-500 rounded text-red-200 text-sm text-center">
             {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input 
            label="Email" 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
          <Input 
            label="Password" 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
          
          <Button type="submit" isLoading={isLoading}>
            MASUK SEKARANG
          </Button>
        </form>

        <p className="mt-6 text-center text-gray-400 text-sm">
          Belum punya akun?{' '}
          {/* Link ini yang menghubungkan ke halaman Register */}
          <Link to="/register" className="text-gym-green font-bold hover:underline transition">
            Daftar Member Baru
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;