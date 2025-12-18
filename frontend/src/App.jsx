import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/authContext';
import { ProtectedRoute, RoleProtectedRoute } from './components/ProtectedRoute';
import './App.css';

// Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Public Pages
import Home from './pages/Home/Home';         
import Login from './pages/Login/Login';      
import Register from './pages/Register/Register';

// Protected Pages (Role-based)
import MemberDashboard from './pages/Dashboard/MemberDashboard';
import TrainerDashboard from './pages/Dashboard/TrainerDashboard';

import MemberClasses from './pages/Classes/MemberClasses';
import TrainerClasses from './pages/Classes/TrainerClasses';

import AdminMemberships from './pages/Memberships/TrainerMemberships';
import MemberMemberships from './pages/Memberships/MemberMemberships';

>>>>>>> Stashed changes
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          
          <Navbar />

          <main className="main-content">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Protected Routes - Member Dashboard */}
              <Route 
                path="/member/dashboard" 
                element={
                  <RoleProtectedRoute allowedRoles={['member']}>
                    <MemberDashboard />
                  </RoleProtectedRoute>
                } 
              />

              {/* Protected Routes - Trainer Dashboard */}
              <Route 
                path="/trainer/dashboard" 
                element={
                  <RoleProtectedRoute allowedRoles={['trainer']}>
                    <TrainerDashboard />
                  </RoleProtectedRoute>
                } 
              />
              
              {/* Redirect untuk /dashboard umum */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <DashboardRedirect />
                  </ProtectedRoute>
                } 
              />

              {/* Protected Routes - Trainer Classes Management */}
              <Route 
                path="/trainer/classes" 
                element={
                  <RoleProtectedRoute allowedRoles={['trainer']}>
                    <TrainerClasses />
                  </RoleProtectedRoute>
                } 
              />

              {/* Protected Routes - Member Classes Booking */}
              <Route 
                path="/member/classes" 
                element={
                  <RoleProtectedRoute allowedRoles={['member']}>
                    <MemberClasses />
                  </RoleProtectedRoute>
                } 
              />

              {/* Redirect untuk /classes umum */}
              <Route 
                path="/classes" 
                element={
                  <ProtectedRoute>
                    <ClassesRedirect />
                  </ProtectedRoute>
                } 
              />

              {/* ADMIN / TRAINER - Manage Membership Plans */}
              <Route 
                path="/trainer/memberships" 
                element={
                  // Sesuaikan role disini (misal 'admin' atau 'trainer')
                  <RoleProtectedRoute allowedRoles={['trainer']}>
                    <AdminMemberships />
                  </RoleProtectedRoute>
                } 
              />

              {/* MEMBER - View & Subscribe */}
              <Route 
                path="/member/memberships" 
                element={
                  <RoleProtectedRoute allowedRoles={['member']}>
                    <MemberMemberships />
                  </RoleProtectedRoute>
                } 
              />


              {/* Redirect URL yang tidak valid */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <Footer />
          
        </div>
      </Router>
    </AuthProvider>
  );
}

// Component untuk auto-redirect dashboard sesuai role
const DashboardRedirect = () => {
  const { user } = useAuth();
  
  if (user?.role === 'trainer') {
    return <Navigate to="/trainer/dashboard" replace />;
  }
  
  return <Navigate to="/member/dashboard" replace />;
};

// Component untuk auto-redirect classes sesuai role
const ClassesRedirect = () => {
  const { user } = useAuth();
  
  if (user?.role === 'trainer') {
    return <Navigate to="/trainer/classes" replace />;
  }
  
  return <Navigate to="/member/classes" replace />;
};

// Component untuk auto-redirect memberships sesuai role
const MembershipsRedirect = () => {
  const { user } = useAuth();
  
  if (user?.role === 'trainer') {
    return <Navigate to="/trainer/memberships" replace />;
  }
  
  return <Navigate to="/member/memberships" replace />;
};

export default App;