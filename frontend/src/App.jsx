import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// ✅ Layout Components (Navbar + Footer selalu muncul)
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// ✅ Pages (Halaman utama yang punya route sendiri)
import Home from './pages/Home/Home';         
import Login from './pages/Login/Login';      
import Register from './pages/Register/Register'; 

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gym-black text-white flex flex-col">
        
        {/* Navbar tampil di semua halaman */}
        <Navbar />

        {/* Area konten dinamis sesuai route */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Redirect URL yang tidak valid */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Footer tampil di semua halaman */}
        <Footer />
        
      </div>
    </Router>
  );
}

export default App;