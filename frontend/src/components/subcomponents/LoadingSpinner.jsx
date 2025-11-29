import React from "react";

const LoadingSpinner = () => {
return ( <div className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-50"> <div className="animate-bounceIn"> <div className="w-14 h-14 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div> </div> </div>
);
};

export default LoadingSpinner;
