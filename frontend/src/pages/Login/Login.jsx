import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('member'); // Default role
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // SIMULASI LOGIN (Karena belum ada backend)
    setTimeout(() => {
      try {
        // Dummy validation
        if (!email || !password) {
          throw new Error('Email dan password harus diisi');
        }

        if (password.length < 6) {
          throw new Error('Password minimal 6 karakter');
        }

        // Simulasi user data berdasarkan role yang dipilih
        const userData = {
          id: Date.now(),
          name: email.split('@')[0], // Ambil nama dari email
          email: email,
          role: selectedRole // Role yang dipilih user
        };

        const fakeToken = 'fake-jwt-token-' + Date.now();

        // Save to context & localStorage
        login(userData, fakeToken);

        // Redirect sesuai role
        if (selectedRole === 'trainer') {
          navigate('/trainer/dashboard');
        } else {
          navigate('/member/dashboard');
        }

      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gym-black flex items-center justify-center px-4 relative overflow-hidden">
      
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-gym-green/5 rounded-full blur-[100px]"></div>

      <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-xl p-8 shadow-[0_0_20px_rgba(57,255,20,0.1)] relative z-10">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-white italic tracking-tighter">
            Sign In <span className="text-gym-green">HexaFit</span>
          </h2>
          <p className="text-gray-500 text-sm mt-2">Welcome back, Warrior!</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-900/30 border border-red-500 rounded text-red-200 text-sm text-center animate-pulse">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Role Selection (Sementara untuk demo) */}
          <div>
            <label className="block text-gray-400 text-sm font-bold mb-3">
              Login Sebagai
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSelectedRole('member')}
                className={`py-3 px-4 rounded-lg border-2 font-bold transition-all ${
                  selectedRole === 'member'
                    ? 'bg-gym-green text-black border-gym-green'
                    : 'bg-zinc-800 text-white border-zinc-700 hover:border-gym-green'
                }`}
              >
                <svg className="w-6 h-6 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                Member
              </button>
              
              <button
                type="button"
                onClick={() => setSelectedRole('trainer')}
                className={`py-3 px-4 rounded-lg border-2 font-bold transition-all ${
                  selectedRole === 'trainer'
                    ? 'bg-gym-green text-black border-gym-green'
                    : 'bg-zinc-800 text-white border-zinc-700 hover:border-gym-green'
                }`}
              >
                <svg className="w-6 h-6 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                Trainer
              </button>
            </div>
          </div>

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

        {/* Demo Credentials Info */}
        <div className="mt-6 p-4 bg-zinc-800/50 border border-zinc-700 rounded-lg">
          <p className="text-xs text-gray-500 text-center mb-2">💡 Demo Mode - Pilih role dan login dengan email/password apa saja</p>
          <p className="text-xs text-gray-400 text-center">Password minimal 6 karakter</p>
        </div>
      </div>
    </div>
  );
};

export default Login;