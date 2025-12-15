import React from 'react';

const Input = ({ label, type = "text", className, ...props }) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-gray-400 text-sm font-bold mb-2">
          {label}
        </label>
      )}
      <input
        type={type}
        className={`w-full bg-black border border-gray-700 text-white rounded p-3 focus:outline-none focus:border-gym-green focus:ring-1 focus:ring-gym-green transition duration-200 ${className}`}
        {...props}
      />
    </div>
  );
};

export default Input;