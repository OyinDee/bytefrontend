// loading.tsx
import React from "react";


interface LoadingProps {

}

const Loading: React.FC<LoadingProps> = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-lg text-gray-600">Loading...</p>
    </div>
  );
};

export default Loading;
