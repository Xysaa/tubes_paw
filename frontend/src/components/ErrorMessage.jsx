import React from 'react';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="error-container">
      <div className="error-card">
        {/* Icon Warning */}
        <svg xmlns="http://www.w3.org/2000/svg" className="error-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        
        <h2 className="error-title">TERJADI KESALAHAN</h2>
        <p className="error-message">{message}</p>
        
        <button 
          onClick={onRetry}
          className="error-button"
        >
          COBA LAGI
        </button>
      </div>
    </div>
  );
};

export default ErrorMessage;