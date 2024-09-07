// app/user/fund/callback/loading.tsx
const Loading = () => {
    return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4 lg:p-8">
        <div className="bg-white shadow-md rounded-lg p-6 text-center w-full max-w-md">
          <h1 className="text-2xl font-semibold mb-4 text-black">
            Verifying Payment...
          </h1>
          <div className="w-12 h-12 border-t-4 border-yellow-500 border-solid rounded-full animate-spin"></div>
        </div>
      </main>
    );
  };
  
  export default Loading;
  