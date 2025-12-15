import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// 1. Import Components Layout (Kerangka Website)
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// 2. Import Pages (Halaman Utama)
// Pastikan struktur foldermu sudah: src/pages/Home/Home.jsx
import Home from './pages/Home/Home';         
import Login from './pages/Login/Login';      
import Register from './pages/Register/Register'; 

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gym-black text-white flex flex-col">
        
        {/* Navbar selalu muncul di atas */}
        <Navbar />

        {/* Area Konten yang berubah-ubah sesuai URL */}
        <main className="flex-grow">
          <Routes>
            {/* Jika buka website/, tampilkan Home */}
            <Route path="/" element={<Home />} />
            
            {/* Jika buka /login, tampilkan Login */}
            <Route path="/login" element={<Login />} />
            
            {/* Jika buka /register, tampilkan Register */}
            <Route path="/register" element={<Register />} />

            {/* Jika URL ngawur, kembalikan ke Home atau Login */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Footer selalu muncul di bawah */}
        <Footer />
        
      </div>
    </Router>
  );
}

export default App;