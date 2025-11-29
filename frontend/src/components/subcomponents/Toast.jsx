import React from "react";

const Toast = ({ toast }) => {
return (
<div
className={`fixed top-6 right-6 z-[999] px-5 py-3 rounded-2xl shadow-xl backdrop-blur-xl text-white
        animate-slideToast
        ${toast.type === "success" ? "bg-green-600/80" : "bg-red-600/80"}`}
>
{toast.message} </div>
);
};

export default Toast;
