import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

//  Import UI Components (Reusable)
import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';

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
      
      if (!response.ok) {
        throw new Error(data.error || 'Email atau password salah');
      }

      // Simpan token dan user data
      if (data.access_token) {
        localStorage.setItem('gym_token', data.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      // Redirect ke dashboard (atau home jika belum ada dashboard)
      navigate('/');

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gym-black flex items-center justify-center px-4 relative overflow-hidden">
      
      {/* Background Glow Effect */}
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-gym-green/5 rounded-full blur-[100px]"></div>

      {/* Login Card */}
      <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-xl p-8 shadow-[0_0_20px_rgba(57,255,20,0.1)] relative z-10">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-white italic tracking-tighter">
            LOGIN <span className="text-gym-green">HexaFit</span>
          </h2>
          <p className="text-gray-500 text-sm mt-2">Welcome back, Warrior!</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 bg-red-900/30 border border-red-500 rounded text-red-200 text-sm text-center animate-pulse">
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

        <p className="mt-6 text-center text-gray-400 text-sm">
          Belum punya akun?{' '}
          <Link to="/register" className="text-gym-green font-bold hover:underline transition">
            Daftar Member Baru
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;