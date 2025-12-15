import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-gym-black flex flex-col items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gym-green mb-4"></div>
      <h2 className="text-gym-green text-xl font-bold animate-pulse">MEMUAT DATA GYM...</h2>
    </div>
  );
};

export default LoadingSpinner;
