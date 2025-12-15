import React from 'react';

const Button = ({ children, isLoading, variant = 'primary', className = '', ...props }) => {
  // Base styling untuk semua button
  const baseStyle = "w-full font-bold py-3 rounded transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center";
  
  // Variant styles (bisa dikembangkan)
  const variants = {
    primary: "bg-gym-green text-black hover:bg-white hover:scale-[1.02] shadow-[0_0_15px_rgba(57,255,20,0.3)]",
    outline: "bg-transparent border-2 border-gym-green text-gym-green hover:bg-gym-green hover:text-black",
    danger: "bg-red-600 text-white hover:bg-red-700"
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          {/* Loading Spinner */}
          <svg 
            className="animate-spin -ml-1 mr-3 h-5 w-5" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          MEMPROSES...
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;