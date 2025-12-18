import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

// Component untuk protect route berdasarkan authentication
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gym-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gym-green"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Component untuk protect route berdasarkan role
export const RoleProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gym-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gym-green"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user?.role)) {
    return (
      <div className="min-h-screen bg-gym-black flex items-center justify-center px-4">
        <div className="bg-red-900/20 border border-red-500 p-8 rounded-lg text-center max-w-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="text-2xl font-bold text-red-500 mb-2">AKSES DITOLAK</h2>
          <p className="text-gray-300 mb-6">Anda tidak memiliki izin untuk mengakses halaman ini.</p>
          <button 
            onClick={() => window.history.back()}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded transition"
          >
            KEMBALI
          </button>
        </div>
      </div>
    );
  }

  return children;
};