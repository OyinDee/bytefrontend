// loading.tsx
import React from "react";


interface LoadingProps {
  // Add any props you need here
}

const Loading: React.FC<LoadingProps> = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div
        className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
      <p className="text-lg text-gray-600">Loading...</p>
    </div>
  );
};

export default Loading;
