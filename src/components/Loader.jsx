// src/components/Loader.jsx
const Loader = () => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
        <div className="relative flex items-center justify-center">
          {/* Barsi Text */}
          <div className="text-4xl font-bold text-gray-800">
            <span className="text-white">BARSI</span>
          </div>
          {/* Running Border Animation */}
          <div className="absolute w-32 h-32 border-4 border-transparent border-t-orange-500 border-r-blue-500 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  };
  
  export default Loader;