import React from "react";

const SuccessCheck = () => {
return ( <div className="fixed inset-0 flex justify-center items-center z-50 animate-fadeIn"> <div className="bg-white/80 backdrop-blur-xl p-6 rounded-full shadow-xl animate-checkPop"> <svg
       xmlns="http://www.w3.org/2000/svg"
       className="w-14 h-14 text-green-600"
       fill="none"
       viewBox="0 0 24 24"
       stroke="currentColor"
       strokeWidth="2"
     > <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /> </svg> </div> </div>
);
};

export default SuccessCheck;
