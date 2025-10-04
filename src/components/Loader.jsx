import React from 'react';

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
      <p className="text-gray-600 text-lg">Loading Questions...</p>
      <p className="text-gray-500 text-sm mt-2">Please wait while we prepare your quiz</p>
    </div>
  );
};

export default Loader;