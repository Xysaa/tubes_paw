import React from 'react';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="min-h-screen bg-gym-black flex flex-col items-center justify-center px-4">
      <div className="bg-red-900/20 border border-red-500 p-8 rounded-lg text-center max-w-lg">
        {/* Icon Warning */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        
        <h2 className="text-2xl font-bold text-red-500 mb-2">TERJADI KESALAHAN</h2>
        <p className="text-gray-300 mb-6">{message}</p>
        
        <button 
          onClick={onRetry}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded transition"
        >
          COBA LAGI
        </button>
      </div>
    </div>
  );
};

export default ErrorMessage;
