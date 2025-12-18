import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

//  Import UI Components (Reusable)
import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:6543/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Registrasi gagal');
      }

      setSuccess('Registrasi berhasil! Mengalihkan ke login...');
      
      // Reset form
      setName('');
      setEmail('');
      setPassword('');

      // Redirect ke login setelah 2 detik
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gym-black flex items-center justify-center px-4 relative overflow-hidden">
      
      {/* Background Glow Effect */}
      <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-gym-green/5 rounded-full blur-[100px]"></div>

      {/* Register Card */}
      <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-xl p-8 shadow-[0_0_20px_rgba(57,255,20,0.1)] relative z-10">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-white italic tracking-tighter">
            DAFTAR <span className="text-gym-green">MEMBER</span>
          </h2>
          <p className="text-gray-500 text-sm mt-2">Join the HexaFit family!</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 bg-red-900/30 border border-red-500 rounded text-red-200 text-sm text-center animate-pulse">
            {error}
          </div>
        )}
        
        {/* Success Alert */}
        {success && (
          <div className="mb-4 p-3 bg-green-900/30 border border-green-500 rounded text-green-200 text-sm text-center">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input 
            label="Nama Lengkap"
            type="text" 
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            minLength={3}
          />
          
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
            placeholder="Minimal 6 karakter"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />

          <Button type="submit" isLoading={isLoading} variant="primary">
            DAFTAR SEKARANG
          </Button>
        </form>

        <p className="mt-6 text-center text-gray-400 text-sm">
          Sudah punya akun?{' '}
          <Link to="/login" className="text-gym-green font-bold hover:underline transition">
            Login disini
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;